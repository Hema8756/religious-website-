(function () {
  "use strict";

  var AYAHS_PER_PAGE = 10;
  var MP3QURAN_API = "https://mp3quran.net/api/v3/reciters?language=ar";

  var recitersList = [];
  var filteredReciters = [];
  var surahs = null;
  var currentSurah = null;
  var currentPage = 0;
  var totalPages = 0;

  var els = {};

  function pad3(n) {
    n = String(n);
    while (n.length < 3) n = "0" + n;
    return n;
  }

  function fetchReciters() {
    els.reciterStatus.textContent = "جاري جلب قائمة القراء...";
    
    // محاولة الجلب من IndexedDB أولاً
    if (window.NoorDB) {
      window.NoorDB.get("reciters", "all").then(function (cached) {
        if (cached && cached.length) {
          recitersList = cached;
          filteredReciters = cached;
          populateReciters();
          els.reciterStatus.textContent = "تم تحميل القراء (من التخزين المحلي)";
        }
        loadFromAPI();
      }).catch(function() {
        loadFromAPI();
      });
    } else {
      loadFromAPI();
    }
  }

  function loadFromAPI() {
    fetch(MP3QURAN_API)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.reciters) {
          recitersList = data.reciters.map(function(r) {
            var moshaf = r.moshaf && r.moshaf.length ? r.moshaf[0] : {};
            return {
              id: r.id,
              name: r.name,
              server: moshaf.server || "",
              surahList: moshaf.surah_list ? moshaf.surah_list.split(",") : [],
              rewaya: moshaf.name || ""
            };
          }).filter(function(r) { return r.server !== ""; });

          // ترتيب القراء أبجدياً
          recitersList.sort(function(a, b) {
            return a.name.localeCompare(b.name, 'ar');
          });

          filteredReciters = recitersList;
          populateReciters();
          els.reciterStatus.textContent = "تم تحديث " + recitersList.length + " قارئ عبر MP3Quran";

          if (window.NoorDB) {
            window.NoorDB.set("reciters", "all", recitersList).catch(function(){});
          }
        }
      })
      .catch(function (err) {
        if (!recitersList.length) {
          els.reciterStatus.innerHTML = 'فشل الاتصال بالأوفلاين. <button id="retryReciters" class="pager-btn">إعادة المحاولة</button>';
          var btn = document.getElementById("retryReciters");
          if(btn) btn.onclick = loadFromAPI;
        }
      });
  }

  function populateReciters() {
    els.reciterSelect.innerHTML = "";
    if(!filteredReciters.length) {
      var opt = document.createElement("option");
      opt.textContent = "لم يتم العثور على قراء";
      els.reciterSelect.appendChild(opt);
      return;
    }
    filteredReciters.forEach(function (r) {
      var opt = document.createElement("option");
      opt.value = r.id;
      opt.textContent = r.name + (r.rewaya ? " (" + r.rewaya + ")" : "");
      els.reciterSelect.appendChild(opt);
    });
    updateAudioSrc();
  }

  function filterReciters(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) {
      filteredReciters = recitersList;
    } else {
      filteredReciters = recitersList.filter(function(r) {
        return r.name.toLowerCase().indexOf(q) !== -1;
      });
    }
    populateReciters();
  }

  function renderSurahList(filter) {
    var q = (filter || "").trim();
    els.list.innerHTML = "";
    surahs.forEach(function (s) {
      if (q && s.name.indexOf(q) === -1 && s.englishName.toLowerCase().indexOf(q.toLowerCase()) === -1) return;
      var item = document.createElement("div");
      item.className = "surah-dropdown-item";
      item.innerHTML = "<span>" + s.name + "</span><span class=\"num\">" + s.number + "</span>";
      item.addEventListener("click", function () {
        closeList();
        openSurah(s.number);
      });
      els.list.appendChild(item);
    });
  }

  function openList() { els.list.classList.add("open"); els.toggle.classList.add("open"); }
  function closeList() { els.list.classList.remove("open"); els.toggle.classList.remove("open"); }
  function toggleList() { if (els.list.classList.contains("open")) closeList(); else openList(); }

  function currentReciter() {
    var id = parseInt(els.reciterSelect.value, 10);
    for (var i = 0; i < recitersList.length; i++) {
      if (recitersList[i].id === id) return recitersList[i];
    }
    return recitersList[0];
  }

  function updateAudioSrc() {
    if (!currentSurah) return;
    var reciter = currentReciter();
    if (!reciter) return;

    var surahNumStr = String(currentSurah.number);
    // التحقق من توفر السورة لدى القارئ
    if (reciter.surahList.length && reciter.surahList.indexOf(surahNumStr) === -1) {
      els.reciterStatus.textContent = "عذراً: السورة غير متوفرة بصوت هذا القارئ";
      els.audio.pause();
      els.audio.removeAttribute("src");
      return;
    }

    els.reciterStatus.textContent = "جاري تشغيل: " + currentSurah.name + " - " + reciter.name;
    var src = reciter.server + pad3(currentSurah.number) + ".mp3";
    if (els.audio.getAttribute("src") !== src) {
      els.audio.pause();
      els.audio.setAttribute("src", src);
    }
  }

  function openSurah(number) {
    currentSurah = surahs[number - 1];
    currentPage = 0;
    totalPages = Math.max(1, Math.ceil(currentSurah.ayahs.length / AYAHS_PER_PAGE));

    els.surahCurrentName.textContent = currentSurah.name;
    els.surahCurrentInfo.textContent = (currentSurah.revelationType === "Meccan" ? "مكية" : "مدنية") + " — " + currentSurah.ayahs.length + " آية";
    els.surahTitle.textContent = currentSurah.name;

    els.selectCard.style.display = "none";
    els.emptyState.style.display = "none";
    els.viewCard.style.display = "";

    updateAudioSrc();
    renderAyahPage();
  }

  function renderAyahPage() {
    var start = currentPage * AYAHS_PER_PAGE;
    var end = Math.min(start + AYAHS_PER_PAGE, currentSurah.ayahs.length);
    var html = "";
    for (var i = start; i < end; i++) {
      var ayah = currentSurah.ayahs[i];
      html += ayah.text + ' <span class="ayah-num-tag">﴿' + ayah.numberInSurah + '﴾</span> ';
    }
    els.ayahPage.innerHTML = html;
    els.ayahPageInfo.textContent = (currentPage + 1) + " / " + totalPages;
    els.ayahPrevBtn.disabled = currentPage <= 0;
    els.ayahNextBtn.disabled = currentPage >= totalPages - 1;
  }

  function backToIndex() {
    els.audio.pause();
    els.viewCard.style.display = "none";
    els.selectCard.style.display = "";
    els.emptyState.style.display = "";
    currentSurah = null;
  }

  function init() {
    if (typeof quranData === "undefined" || !quranData.data || !quranData.data.surahs) return;
    surahs = quranData.data.surahs;

    els.toggle = document.getElementById("surahToggle");
    els.surahCurrentName = document.getElementById("surahCurrentName");
    els.surahCurrentInfo = document.getElementById("surahCurrentInfo");
    els.search = document.getElementById("quranSearch");
    els.list = document.getElementById("surahDropdownList");
    els.reciterSelect = document.getElementById("reciterSelect");
    els.reciterSearchInput = document.getElementById("reciterSearchInput");
    els.reciterStatus = document.getElementById("reciterStatus");
    els.audio = document.getElementById("quranAudio");
    els.selectCard = document.querySelector(".quran-select-card");
    els.viewCard = document.getElementById("surahViewCard");
    els.surahTitle = document.getElementById("surahTitle");
    els.ayahPage = document.getElementById("ayahPage");
    els.ayahPrevBtn = document.getElementById("ayahPrevBtn");
    els.ayahNextBtn = document.getElementById("ayahNextBtn");
    els.ayahPageInfo = document.getElementById("ayahPageInfo");
    els.backToIndexBtn = document.getElementById("backToIndexBtn");
    els.reloadAudioBtn = document.getElementById("reloadAudioBtn");
    els.emptyState = document.getElementById("quranEmptyState");

    renderSurahList();
    fetchReciters();

    els.toggle.addEventListener("click", function (e) { e.stopPropagation(); toggleList(); });
    els.search.addEventListener("focus", openList);
    els.search.addEventListener("input", function () { renderSurahList(els.search.value); openList(); });
    els.reciterSearchInput.addEventListener("input", function() { filterReciters(this.value); });

    document.addEventListener("click", function (e) {
      if (!els.list.contains(e.target) && e.target !== els.toggle && !els.toggle.contains(e.target)) {
        closeList();
      }
    });

    els.reciterSelect.addEventListener("change", updateAudioSrc);
    els.ayahPrevBtn.addEventListener("click", function () { if (currentPage > 0) { currentPage--; renderAyahPage(); } });
    els.ayahNextBtn.addEventListener("click", function () { if (currentPage < totalPages - 1) { currentPage++; renderAyahPage(); } });
    els.backToIndexBtn.addEventListener("click", backToIndex);
    els.reloadAudioBtn.addEventListener("click", function () { els.audio.load(); els.audio.play().catch(function () {}); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
