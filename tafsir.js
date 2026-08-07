(function () {
  "use strict";

  var TAFASIR_LIST_API = "https://mp3quran.net/api/v3/tafasir?language=ar";
  var TAFSIR_API = "https://mp3quran.net/api/v3/tafsir";
  var CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000; // أسبوعين
  var HISTORY_LIMIT = 8;

  var tafasirList = [];
  var filteredTafasir = [];
  var surahs = null;
  var currentSurah = null;
  var currentAyahNum = 0;
  var currentResult = null; // { tafsirId, tafsirName, suraNumber, suraName, ayahNum, items }
  var memCache = {}; // ذاكرة مؤقتة لنتائج الجلسة الحالية
  var activeAudio = null;
  var activeBtn = null;

  var els = {};

  /* ---------------- أدوات مساعدة ---------------- */

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }

  function cacheKey(tafsirId, sura) { return tafsirId + "_" + sura; }

  function showFeedback(msg) {
    if (!els.feedback) return;
    els.feedback.textContent = msg;
    setTimeout(function () {
      if (els.feedback.textContent === msg) els.feedback.textContent = "";
    }, 2600);
  }

  /* ---------------- تحميل قائمة المفسرين ---------------- */

  function fetchTafasirList() {
    els.listStatus.textContent = "جاري جلب قائمة المفسرين...";

    if (window.NoorDB) {
      window.NoorDB.get("tafasirList", "all").then(function (cached) {
        if (cached && cached.length) {
          tafasirList = cached;
          filteredTafasir = cached;
          populateTafasirSelect();
          els.listStatus.textContent = "تم تحميل " + cached.length + " مفسّراً (من التخزين المحلي)";
          restoreLastState();
        }
        loadTafasirFromAPI();
      }).catch(function () { loadTafasirFromAPI(); });
    } else {
      loadTafasirFromAPI();
    }
  }

  function loadTafasirFromAPI() {
    fetch(TAFASIR_LIST_API)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.tafasir && data.tafasir.length) {
          tafasirList = data.tafasir.map(function (t) {
            return { id: t.id, name: t.name };
          });
          filteredTafasir = tafasirList;
          populateTafasirSelect();
          els.listStatus.textContent = "تم تحديث " + tafasirList.length + " مفسّراً عبر MP3Quran";

          if (window.NoorDB) window.NoorDB.set("tafasirList", "all", tafasirList).catch(function () {});

          restoreLastState();
        }
      })
      .catch(function () {
        if (!tafasirList.length) {
          els.listStatus.innerHTML = 'تعذّر الاتصال بالخادم. <button id="retryTafasir" class="tafsir-chip">إعادة المحاولة</button>';
          var btn = document.getElementById("retryTafasir");
          if (btn) btn.onclick = loadTafasirFromAPI;
        }
      });
  }

  function populateTafasirSelect() {
    var prevValue = els.tafsirSelect.value;
    els.tafsirSelect.innerHTML = "";
    if (!filteredTafasir.length) {
      var opt = document.createElement("option");
      opt.textContent = "لم يتم العثور على مفسرين";
      els.tafsirSelect.appendChild(opt);
      return;
    }
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "اختر المفسّر...";
    els.tafsirSelect.appendChild(placeholder);

    filteredTafasir.forEach(function (t) {
      var o = document.createElement("option");
      o.value = t.id;
      o.textContent = t.name;
      els.tafsirSelect.appendChild(o);
    });

    if (prevValue && filteredTafasir.some(function (t) { return String(t.id) === String(prevValue); })) {
      els.tafsirSelect.value = prevValue;
    }
  }

  function filterTafasirByQuery(q) {
    q = (q || "").trim();
    if (!q) { filteredTafasir = tafasirList; }
    else {
      filteredTafasir = tafasirList.filter(function (t) {
        return t.name.indexOf(q) !== -1;
      });
    }
    populateTafasirSelect();
  }

  /* ---------------- اختيار السورة والآية ---------------- */

  function renderSurahDropdown(filter) {
    var q = (filter || "").trim();
    els.surahDropdown.innerHTML = "";
    surahs.forEach(function (s) {
      if (q && s.name.indexOf(q) === -1 && s.englishName.toLowerCase().indexOf(q.toLowerCase()) === -1) return;
      var item = document.createElement("div");
      item.className = "surah-dropdown-item";
      item.innerHTML = "<span>" + s.name + "</span><span class=\"num\">" + s.number + "</span>";
      item.addEventListener("click", function () {
        closeSurahDropdown();
        selectSurah(s.number);
      });
      els.surahDropdown.appendChild(item);
    });
  }

  function openSurahDropdown() { els.surahDropdown.classList.add("open"); els.surahToggle.classList.add("open"); }
  function closeSurahDropdown() { els.surahDropdown.classList.remove("open"); els.surahToggle.classList.remove("open"); }
  function toggleSurahDropdown() {
    if (els.surahDropdown.classList.contains("open")) closeSurahDropdown(); else openSurahDropdown();
  }

  function selectSurah(number) {
    currentSurah = surahs[number - 1];
    currentAyahNum = 1;
    els.surahName.textContent = currentSurah.name;
    els.surahInfo.textContent = (currentSurah.revelationType === "Meccan" ? "مكية" : "مدنية") + " — " + currentSurah.ayahs.length + " آية";
    populateAyahSelect();
    updateNavButtons();
  }

  function populateAyahSelect() {
    els.ayahSelect.innerHTML = "";
    if (!currentSurah) {
      var p = document.createElement("option");
      p.value = ""; p.textContent = "اختر آية...";
      els.ayahSelect.appendChild(p);
      return;
    }
    currentSurah.ayahs.forEach(function (a) {
      var o = document.createElement("option");
      o.value = a.numberInSurah;
      o.textContent = "آية " + a.numberInSurah;
      els.ayahSelect.appendChild(o);
    });
    els.ayahSelect.value = currentAyahNum || 1;
  }

  function updateNavButtons() {
    if (!currentSurah) {
      els.prevAyahBtn.disabled = true;
      els.nextAyahBtn.disabled = true;
      return;
    }
    els.prevAyahBtn.disabled = currentAyahNum <= 1;
    els.nextAyahBtn.disabled = currentAyahNum >= currentSurah.ayahs.length;
  }

  function goPrevAyah() {
    if (!currentSurah || currentAyahNum <= 1) return;
    currentAyahNum--;
    els.ayahSelect.value = currentAyahNum;
    updateNavButtons();
    if (currentResult) updateAyahBoxOnly();
  }

  function goNextAyah() {
    if (!currentSurah || currentAyahNum >= currentSurah.ayahs.length) return;
    currentAyahNum++;
    els.ayahSelect.value = currentAyahNum;
    updateNavButtons();
    if (currentResult) updateAyahBoxOnly();
  }

  function updateAyahBoxOnly() {
    // تحديث نص الآية المعروضة دون إعادة تحميل الصوت (لأن التفسير الصوتي يغطي السورة كاملة)
    var ayah = currentSurah.ayahs[currentAyahNum - 1];
    els.ayahTxt.textContent = ayah.text;
    els.ayahRefTxt.textContent = currentSurah.name + " — آية " + currentAyahNum;
    saveState();
  }

  /* ---------------- عرض التفسير ---------------- */

  function showTafsir() {
    var tafsirId = els.tafsirSelect.value;
    if (!tafsirId) { showFeedback("يرجى اختيار المفسّر أولاً"); return; }
    if (!currentSurah) { showFeedback("يرجى اختيار السورة أولاً"); return; }
    if (!currentAyahNum) currentAyahNum = 1;

    var tafsirName = els.tafsirSelect.options[els.tafsirSelect.selectedIndex].textContent;
    var suraNumber = currentSurah.number;

    els.resultCard.style.display = "";
    els.emptyState.style.display = "none";
    els.ayahBox.style.display = "";
    els.ayahTxt.textContent = currentSurah.ayahs[currentAyahNum - 1].text;
    els.ayahRefTxt.textContent = currentSurah.name + " — آية " + currentAyahNum;

    els.loading.style.display = "";
    els.error.style.display = "none";
    els.audioList.innerHTML = "";
    els.resultActions.style.display = "none";

    var key = cacheKey(tafsirId, suraNumber);
    if (memCache[key]) {
      renderResult(tafsirId, tafsirName, suraNumber, memCache[key]);
      return;
    }

    if (window.NoorDB) {
      window.NoorDB.get("tafsirCache", key).then(function (cached) {
        if (cached && cached.data && (Date.now() - cached.ts) < CACHE_TTL_MS) {
          memCache[key] = cached.data;
          renderResult(tafsirId, tafsirName, suraNumber, cached.data);
        } else {
          fetchTafsirFromAPI(tafsirId, tafsirName, suraNumber, key);
        }
      }).catch(function () { fetchTafsirFromAPI(tafsirId, tafsirName, suraNumber, key); });
    } else {
      fetchTafsirFromAPI(tafsirId, tafsirName, suraNumber, key);
    }
  }

  function fetchTafsirFromAPI(tafsirId, tafsirName, suraNumber, key) {
    var url = TAFSIR_API + "?tafsir=" + encodeURIComponent(tafsirId) + "&sura=" + suraNumber + "&language=ar";
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var items = parseTafsirResponse(data, tafsirName, suraNumber);
        if (!items || !items.length) {
          showTafsirError("لا يتوفر تفسير صوتي لهذه السورة عند هذا المفسّر حالياً. جرّب مفسّراً آخر.");
          return;
        }
        memCache[key] = items;
        if (window.NoorDB) window.NoorDB.set("tafsirCache", null, { id: key, data: items, ts: Date.now() }).catch(function () {});
        renderResult(tafsirId, tafsirName, suraNumber, items);
      })
      .catch(function () {
        showTafsirError("تعذّر الاتصال بخادم MP3Quran. تحقق من اتصالك بالإنترنت.");
      });
  }

  function parseTafsirResponse(data, fallbackName, suraNumber) {
    try {
      var root = (data && data.tafasir) ? data.tafasir : data;
      if (!root) return null;
      var soraObj = root.sora;
      var arr = null;
      if (soraObj) {
        arr = soraObj[String(suraNumber)] || soraObj[suraNumber];
        if (!arr) {
          var keys = Object.keys(soraObj);
          if (keys.length) arr = soraObj[keys[0]];
        }
      }
      if (!arr && Array.isArray(root)) arr = root;
      if (!arr || !arr.length) return null;

      return arr.map(function (it) {
        return { name: it.name || fallbackName, url: it.url || it.audio_url || "" };
      }).filter(function (it) { return !!it.url; });
    } catch (e) {
      return null;
    }
  }

  function showTafsirError(msg) {
    els.loading.style.display = "none";
    els.error.style.display = "";
    els.error.innerHTML = "";
    var p = document.createElement("p");
    p.textContent = msg;
    els.error.appendChild(p);
    var retryBtn = document.createElement("button");
    retryBtn.className = "tafsir-btn";
    retryBtn.textContent = "إعادة المحاولة";
    retryBtn.onclick = showTafsir;
    els.error.appendChild(retryBtn);
  }

  function renderResult(tafsirId, tafsirName, suraNumber, items) {
    els.loading.style.display = "none";
    els.error.style.display = "none";

    currentResult = {
      tafsirId: tafsirId, tafsirName: tafsirName,
      suraNumber: suraNumber, suraName: currentSurah.name,
      ayahNum: currentAyahNum, items: items
    };

    renderAudioItems(items);
    els.resultActions.style.display = "";
    els.unfavBtn.style.display = "none";
    els.favBtn.style.display = "";

    checkFavoriteState();
    addHistoryEntry(currentResult);
    saveState();
  }

  function stopActiveAudio() {
    if (activeAudio) { activeAudio.pause(); }
    if (activeBtn) { activeBtn.classList.remove("is-playing"); }
    activeAudio = null; activeBtn = null;
  }

  function renderAudioItems(items) {
    els.audioList.innerHTML = "";
    items.forEach(function (item, idx) {
      var wrap = document.createElement("div");
      wrap.className = "tafsir-audio-item";

      var title = document.createElement("div");
      title.className = "tafsir-audio-title";
      title.textContent = item.name || ("مقطع " + (idx + 1));
      wrap.appendChild(title);

      var audio = document.createElement("audio");
      audio.preload = "none";
      audio.src = item.url;
      wrap.appendChild(audio);

      var controls = document.createElement("div");
      controls.className = "tafsir-audio-controls";

      var playBtn = document.createElement("button");
      playBtn.className = "tafsir-audio-btn"; playBtn.type = "button"; playBtn.title = "تشغيل"; playBtn.textContent = "▶";

      var pauseBtn = document.createElement("button");
      pauseBtn.className = "tafsir-audio-btn"; pauseBtn.type = "button"; pauseBtn.title = "إيقاف مؤقت"; pauseBtn.textContent = "⏸";

      var stopBtn = document.createElement("button");
      stopBtn.className = "tafsir-audio-btn"; stopBtn.type = "button"; stopBtn.title = "إيقاف"; stopBtn.textContent = "⏹";

      var volWrap = document.createElement("div");
      volWrap.className = "tafsir-volume-wrap";
      var volIcon = document.createElement("span"); volIcon.textContent = "🔊";
      var vol = document.createElement("input");
      vol.type = "range"; vol.min = "0"; vol.max = "1"; vol.step = "0.05"; vol.value = "1";
      vol.className = "tafsir-volume";
      volWrap.appendChild(volIcon); volWrap.appendChild(vol);

      var dl = document.createElement("a");
      dl.className = "tafsir-audio-btn"; dl.title = "تحميل"; dl.textContent = "📥";
      dl.href = item.url; dl.setAttribute("download", ""); dl.target = "_blank"; dl.rel = "noopener";

      controls.appendChild(playBtn);
      controls.appendChild(pauseBtn);
      controls.appendChild(stopBtn);
      controls.appendChild(volWrap);
      controls.appendChild(dl);
      wrap.appendChild(controls);

      var progress = document.createElement("input");
      progress.type = "range"; progress.min = "0"; progress.max = "100"; progress.value = "0";
      progress.className = "tafsir-audio-progress";
      wrap.appendChild(progress);

      var timeText = document.createElement("div");
      timeText.className = "tafsir-audio-time";
      timeText.textContent = "00:00 / 00:00";
      wrap.appendChild(timeText);

      playBtn.addEventListener("click", function () {
        if (activeAudio && activeAudio !== audio) stopActiveAudio();
        audio.play().catch(function () {});
        activeAudio = audio; activeBtn = playBtn;
        playBtn.classList.add("is-playing");
      });
      pauseBtn.addEventListener("click", function () {
        audio.pause();
        playBtn.classList.remove("is-playing");
      });
      stopBtn.addEventListener("click", function () {
        audio.pause(); audio.currentTime = 0;
        playBtn.classList.remove("is-playing");
        progress.value = 0; timeText.textContent = "00:00 / 00:00";
      });
      vol.addEventListener("input", function () { audio.volume = parseFloat(vol.value); });
      audio.addEventListener("timeupdate", function () {
        if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
        timeText.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration || 0);
      });
      audio.addEventListener("ended", function () {
        playBtn.classList.remove("is-playing");
      });
      progress.addEventListener("input", function () {
        if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
      });

      els.audioList.appendChild(wrap);
    });
  }

  /* ---------------- نسخ ومشاركة ---------------- */

  function buildResultText() {
    if (!currentResult) return "";
    var lines = [
      "تفسير " + currentResult.suraName + " — آية " + currentResult.ayahNum,
      "المفسّر: " + currentResult.tafsirName,
      ""
    ];
    currentResult.items.forEach(function (it) { lines.push(it.name + ": " + it.url); });
    return lines.join("\n");
  }

  function copyResult() {
    var text = buildResultText();
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showFeedback("تم نسخ التفسير"); })
        .catch(function () { legacyCopy(text); });
    } else {
      legacyCopy(text);
    }
  }

  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); showFeedback("تم نسخ التفسير"); } catch (e) {}
    document.body.removeChild(ta);
  }

  function shareResult() {
    if (!currentResult) return;
    var text = buildResultText();
    var firstUrl = currentResult.items[0] ? currentResult.items[0].url : "";
    if (navigator.share) {
      navigator.share({ title: "تفسير " + currentResult.suraName, text: text, url: firstUrl }).catch(function () {});
    } else {
      copyResult();
    }
  }

  /* ---------------- المفضلة ---------------- */

  function checkFavoriteState() {
    if (!window.NoorDB || !currentResult) return;
    var id = currentResult.tafsirId + "_" + currentResult.suraNumber;
    window.NoorDB.get("tafsirFavs", id).then(function (fav) {
      if (fav) { els.favBtn.style.display = "none"; els.unfavBtn.style.display = ""; }
      else { els.favBtn.style.display = ""; els.unfavBtn.style.display = "none"; }
    }).catch(function () {});
  }

  function addFavorite() {
    if (!window.NoorDB || !currentResult) return;
    var id = currentResult.tafsirId + "_" + currentResult.suraNumber;
    var entry = {
      id: id, tafsirId: currentResult.tafsirId, tafsirName: currentResult.tafsirName,
      suraNumber: currentResult.suraNumber, suraName: currentResult.suraName, ts: Date.now()
    };
    window.NoorDB.set("tafsirFavs", null, entry).then(function () {
      els.favBtn.style.display = "none"; els.unfavBtn.style.display = "";
      showFeedback("أُضيف إلى المفضلة");
      renderFavorites();
    }).catch(function () {});
  }

  function removeFavorite(id) {
    if (!window.NoorDB) return;
    window.NoorDB.del("tafsirFavs", id).then(function () {
      if (currentResult && (currentResult.tafsirId + "_" + currentResult.suraNumber) === id) {
        els.favBtn.style.display = ""; els.unfavBtn.style.display = "none";
      }
      showFeedback("أُزيل من المفضلة");
      renderFavorites();
    }).catch(function () {});
  }

  function renderFavorites() {
    if (!window.NoorDB) return;
    window.NoorDB.getAll("tafsirFavs").then(function (list) {
      els.favCard.style.display = list.length ? "" : "none";
      els.favList.innerHTML = "";
      list.sort(function (a, b) { return b.ts - a.ts; }).forEach(function (f) {
        var row = document.createElement("div");
        row.className = "tafsir-fav-item";

        var info = document.createElement("div");
        info.className = "fav-info";
        info.innerHTML = "";
        var main = document.createElement("span");
        main.textContent = f.suraName + " — " + f.tafsirName;
        var sub = document.createElement("span");
        sub.className = "fav-sub";
        sub.textContent = "اضغط للاستماع مجدداً";
        info.appendChild(main); info.appendChild(sub);
        info.addEventListener("click", function () { loadFromSaved(f.tafsirId, f.suraNumber, 1); });

        var rm = document.createElement("button");
        rm.className = "fav-remove"; rm.title = "إزالة"; rm.textContent = "✕";
        rm.addEventListener("click", function (e) { e.stopPropagation(); removeFavorite(f.id); });

        row.appendChild(info); row.appendChild(rm);
        els.favList.appendChild(row);
      });
    }).catch(function () {});
  }

  /* ---------------- آخر عمليات البحث ---------------- */

  function addHistoryEntry(result) {
    if (!window.NoorDB) return;
    var entry = {
      id: String(Date.now()) + "_" + result.tafsirId + "_" + result.suraNumber,
      tafsirId: result.tafsirId, tafsirName: result.tafsirName,
      suraNumber: result.suraNumber, suraName: result.suraName,
      ayahNum: result.ayahNum, ts: Date.now()
    };
    window.NoorDB.set("tafsirHistory", null, entry).then(function () {
      window.NoorDB.getAll("tafsirHistory").then(function (list) {
        list.sort(function (a, b) { return b.ts - a.ts; });
        var extra = list.slice(HISTORY_LIMIT);
        extra.forEach(function (e) { window.NoorDB.del("tafsirHistory", e.id).catch(function () {}); });
        renderHistoryChips();
      });
    }).catch(function () {});
  }

  function renderHistoryChips() {
    if (!window.NoorDB) return;
    window.NoorDB.getAll("tafsirHistory").then(function (list) {
      list.sort(function (a, b) { return b.ts - a.ts; });
      els.historyCard.style.display = list.length ? "" : "none";
      els.historyChips.innerHTML = "";
      list.slice(0, HISTORY_LIMIT).forEach(function (h) {
        var chip = document.createElement("button");
        chip.className = "tafsir-chip";
        chip.textContent = h.suraName + " · " + h.tafsirName;
        chip.addEventListener("click", function () { loadFromSaved(h.tafsirId, h.suraNumber, h.ayahNum || 1); });
        els.historyChips.appendChild(chip);
      });
    }).catch(function () {});
  }

  function loadFromSaved(tafsirId, suraNumber, ayahNum) {
    if (tafasirList.length) els.tafsirSelect.value = tafsirId;
    selectSurah(suraNumber);
    currentAyahNum = ayahNum || 1;
    els.ayahSelect.value = currentAyahNum;
    updateNavButtons();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showTafsir();
  }

  /* ---------------- استكمال آخر قراءة ---------------- */

  function saveState() {
    if (!window.NoorDB || !currentSurah) return;
    window.NoorDB.set("tafsirState", "last", {
      tafsirId: els.tafsirSelect.value, suraNumber: currentSurah.number, ayahNum: currentAyahNum
    }).catch(function () {});
  }

  function restoreLastState() {
    if (!window.NoorDB || !surahs) return;
    window.NoorDB.get("tafsirState", "last").then(function (state) {
      if (!state || !state.suraNumber) return;
      if (state.tafsirId) els.tafsirSelect.value = state.tafsirId;
      selectSurah(state.suraNumber);
      currentAyahNum = state.ayahNum || 1;
      els.ayahSelect.value = currentAyahNum;
      updateNavButtons();
    }).catch(function () {});
  }

  /* ---------------- تفسير اليوم ---------------- */

  function renderDailyTafsir() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / 86400000);
    var surahIdx = dayOfYear % surahs.length;
    var dailySurah = surahs[surahIdx];
    var ayahIdx = dayOfYear % dailySurah.ayahs.length;
    var ayah = dailySurah.ayahs[ayahIdx];

    els.dailyText.textContent = ayah.text;
    els.dailyRef.textContent = dailySurah.name + " — آية " + ayah.numberInSurah;

    els.dailyListenBtn.onclick = function () {
      if (!els.tafsirSelect.value && tafasirList.length) {
        els.tafsirSelect.value = tafasirList[0].id;
      }
      selectSurah(dailySurah.number);
      currentAyahNum = ayah.numberInSurah;
      els.ayahSelect.value = currentAyahNum;
      updateNavButtons();
      showTafsir();
      window.scrollTo({ top: els.resultCard.offsetTop - 20, behavior: "smooth" });
    };
  }

  /* ---------------- التهيئة ---------------- */

  function init() {
    if (typeof quranData === "undefined" || !quranData.data || !quranData.data.surahs) return;
    surahs = quranData.data.surahs;

    els.tafsirSelect = document.getElementById("tafsirSelect");
    els.listStatus = document.getElementById("tafsirListStatus");
    els.quickSearch = document.getElementById("tafsirQuickSearch");

    els.surahToggle = document.getElementById("tafsirSurahToggle");
    els.surahName = document.getElementById("tafsirSurahName");
    els.surahInfo = document.getElementById("tafsirSurahInfo");
    els.surahDropdown = document.getElementById("tafsirSurahDropdown");
    els.ayahSelect = document.getElementById("tafsirAyahSelect");

    els.showBtn = document.getElementById("showTafsirBtn");
    els.prevAyahBtn = document.getElementById("prevAyahBtn");
    els.nextAyahBtn = document.getElementById("nextAyahBtn");

    els.resultCard = document.getElementById("tafsirResultCard");
    els.ayahBox = document.getElementById("tafsirAyahBox");
    els.ayahTxt = document.getElementById("tafsirAyahTxt");
    els.ayahRefTxt = document.getElementById("tafsirAyahRefTxt");
    els.loading = document.getElementById("tafsirLoading");
    els.error = document.getElementById("tafsirError");
    els.audioList = document.getElementById("tafsirAudioList");
    els.resultActions = document.getElementById("tafsirResultActions");
    els.feedback = document.getElementById("tafsirFeedback");
    els.emptyState = document.getElementById("tafsirEmptyState");

    els.copyBtn = document.getElementById("copyTafsirBtn");
    els.shareBtn = document.getElementById("shareTafsirBtn");
    els.favBtn = document.getElementById("favTafsirBtn");
    els.unfavBtn = document.getElementById("unfavTafsirBtn");

    els.historyCard = document.getElementById("tafsirHistoryCard");
    els.historyChips = document.getElementById("tafsirHistoryChips");
    els.favCard = document.getElementById("tafsirFavCard");
    els.favList = document.getElementById("tafsirFavList");

    els.dailyText = document.getElementById("dailyAyahText");
    els.dailyRef = document.getElementById("dailyAyahRef");
    els.dailyListenBtn = document.getElementById("dailyListenBtn");

    renderSurahDropdown();
    renderDailyTafsir();
    fetchTafasirList();
    renderHistoryChips();
    renderFavorites();
    updateNavButtons();

    els.surahToggle.addEventListener("click", function (e) { e.stopPropagation(); toggleSurahDropdown(); });
    document.addEventListener("click", function (e) {
      if (!els.surahDropdown.contains(e.target) && e.target !== els.surahToggle && !els.surahToggle.contains(e.target)) {
        closeSurahDropdown();
      }
    });

    els.quickSearch.addEventListener("input", function () {
      var q = els.quickSearch.value;
      filterTafasirByQuery(q);
      renderSurahDropdown(q);
      if (q) openSurahDropdown();
    });

    els.ayahSelect.addEventListener("change", function () {
      currentAyahNum = parseInt(els.ayahSelect.value, 10) || 1;
      updateNavButtons();
      if (currentResult) updateAyahBoxOnly();
    });

    els.showBtn.addEventListener("click", showTafsir);
    els.prevAyahBtn.addEventListener("click", goPrevAyah);
    els.nextAyahBtn.addEventListener("click", goNextAyah);

    els.copyBtn.addEventListener("click", copyResult);
    els.shareBtn.addEventListener("click", shareResult);
    els.favBtn.addEventListener("click", addFavorite);
    els.unfavBtn.addEventListener("click", function () {
      if (currentResult) removeFavorite(currentResult.tafsirId + "_" + currentResult.suraNumber);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
