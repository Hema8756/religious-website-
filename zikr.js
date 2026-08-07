(function () {
  "use strict";

  var currentCat = "morning";
  var items = [];
  var currentIndex = 0;
  var fontSize = 1.3;

  function getQueryCat() {
    var params = new URLSearchParams(window.location.search);
    return params.get("cat") || "morning";
  }

  function init() {
    currentCat = getQueryCat();
    setupTabs();
    loadCategory(currentCat);

    document.getElementById("prevZikrBtn").addEventListener("click", prevZikr);
    document.getElementById("nextZikrBtn").addEventListener("click", nextZikr);
    document.getElementById("copyZikrBtn").addEventListener("click", copyZikr);
    document.getElementById("resetCatBtn").addEventListener("click", resetCategory);

    document.getElementById("incFontBtn").addEventListener("click", function () { changeFont(0.1); });
    document.getElementById("decFontBtn").addEventListener("click", function () { changeFont(-0.1); });
    document.getElementById("resetFontBtn").addEventListener("click", function () { fontSize = 1.3; applyFont(); });
  }

  function setupTabs() {
    document.querySelectorAll(".tab-btn").forEach(function (btn) {
      if (btn.dataset.cat === currentCat) btn.classList.add("active");
      btn.addEventListener("click", function () {
        document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        currentCat = btn.dataset.cat;
        loadCategory(currentCat);
      });
    });
  }

  function loadCategory(catKey) {
    var data = window.azkarStaticData ? window.azkarStaticData[catKey] : null;
    if (!data) return;

    document.getElementById("catTitle").textContent = data.title;
    document.getElementById("catDesc").textContent = data.desc;
    document.getElementById("catIcon").innerHTML = data.icon;

    items = data.items.map(function (item, idx) {
      var saved = localStorage.getItem("zikr_" + catKey + "_" + idx);
      return {
        text: item.text,
        maxCount: item.count,
        currentCount: saved !== null ? parseInt(saved, 10) : item.count,
        fadl: item.fadl || ""
      };
    });

    currentIndex = 0;
    renderCurrentZikr();
  }

  function renderCurrentZikr() {
    if (!items.length) return;
    var item = items[currentIndex];
    var card = document.getElementById("cardA");

    card.innerHTML =
      '<div class="zikr-index">الذكر ' + (currentIndex + 1) + ' من ' + items.length + '</div>' +
      '<div class="zikr-text" style="font-size:' + fontSize + 'rem;">' + item.text + '</div>' +
      (item.fadl ? '<div class="zikr-fadl">' + item.fadl + '</div>' : '') +
      '<div class="zikr-footer">' +
        '<button class="count-btn" id="activeCountBtn">التكرار: ' + item.currentCount + ' / ' + item.maxCount + '</button>' +
      '</div>';

    document.getElementById("zikrIndexLabel").textContent = (currentIndex + 1) + " / " + items.length;
    updateProgress();

    var countBtn = document.getElementById("activeCountBtn");
    if (countBtn) {
      countBtn.onclick = function () {
        if (item.currentCount > 0) {
          item.currentCount--;
          localStorage.setItem("zikr_" + currentCat + "_" + currentIndex, item.currentCount);
          renderCurrentZikr();
          if (navigator.vibrate) navigator.vibrate(15);
        }
      };
    }
  }

  function updateProgress() {
    var done = items.filter(function (i) { return i.currentCount === 0; }).length;
    var pct = (done / items.length) * 100;
    document.getElementById("progressFill").style.width = pct + "%";
  }

  function prevZikr() { if (currentIndex > 0) { currentIndex--; renderCurrentZikr(); } }
  function nextZikr() { if (currentIndex < items.length - 1) { currentIndex++; renderCurrentZikr(); } }

  function copyZikr() {
    var item = items[currentIndex];
    if (item) {
      navigator.clipboard.writeText(item.text);
      var btn = document.getElementById("copyZikrBtn");
      btn.textContent = "تم النسخ!";
      setTimeout(function () { btn.textContent = "نسخ"; }, 1500);
    }
  }

  function resetCategory() {
    items.forEach(function (item, idx) {
      item.currentCount = item.maxCount;
      localStorage.removeItem("zikr_" + currentCat + "_" + idx);
    });
    renderCurrentZikr();
  }

  function changeFont(delta) {
    fontSize = Math.max(0.9, Math.min(2.2, fontSize + delta));
    applyFont();
  }

  function applyFont() {
    var txt = document.querySelector("#cardA .zikr-text");
    if (txt) txt.style.fontSize = fontSize + "rem";
  }

  document.addEventListener("DOMContentLoaded", init);
})();
