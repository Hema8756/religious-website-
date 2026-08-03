// ============================================================
// zikr.js — منطق صفحة الأذكار (بطاقة واحدة بتأثير السحب)
// ============================================================
(function () {
  "use strict";

  var STORAGE_PROGRESS = "azkar_progress_v1";
  var STORAGE_INDEX = "azkar_current_index_v1";
  var STORAGE_FONT = "azkar_font_scale";

  var azkarData = null;
  var currentCat = "afterPrayer";
  var currentIndex = 0;
  var fontScale = parseFloat(localStorage.getItem(STORAGE_FONT)) || 1.18;

  var slots = null;
  var activeKey = "A";
  var animating = false;

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_PROGRESS)) || {}; } catch (e) { return {}; }
  }
  function saveProgress(data) {
    try { localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(data)); } catch (e) {}
  }
  var progress = loadProgress();

  function getItemProgress(cat, idx) { return (progress[cat] && progress[cat][idx]) || 0; }
  function setItemProgress(cat, idx, val) {
    if (!progress[cat]) progress[cat] = {};
    progress[cat][idx] = val;
    saveProgress(progress);
  }

  function loadIndexMap() {
    try { return JSON.parse(localStorage.getItem(STORAGE_INDEX)) || {}; } catch (e) { return {}; }
  }
  function saveIndexMap(map) {
    try { localStorage.setItem(STORAGE_INDEX, JSON.stringify(map)); } catch (e) {}
  }

  function getUrlCat() {
    var params = new URLSearchParams(window.location.search);
    var c = params.get("cat");
    return c || "afterPrayer";
  }

  // ---------------------------------------------------------
  // جلب بيانات الأذكار
  // ---------------------------------------------------------
  function fetchAzkar() {
    return fetch("zikr.json").then(function (res) {
      if (!res.ok) throw new Error("network");
      return res.json();
    });
  }

  // ---------------------------------------------------------
  // بناء محتوى بطاقة
  // ---------------------------------------------------------
  function renderMiniBeads(total, done) {
    var shown = Math.min(total, 10);
    var html = "";
    for (var i = 0; i < shown; i++) {
      var on = total <= 10 ? i < done : (i + 1) / shown <= done / total;
      html += '<span class="mini-bead ' + (on ? "on" : "") + '"></span>';
    }
    return html;
  }

  function fillCard(el, item, idx, catData, done) {
    el.classList.toggle("done", done >= item.count);
    el.innerHTML =
      '<span class="zikr-index">' + (idx + 1) + " / " + catData.items.length + "</span>" +
      '<p class="zikr-text" style="font-size:' + fontScale + 'rem;">' + item.text + "</p>" +
      (item.fadl ? '<p class="zikr-fadl">' + item.fadl + "</p>" : "") +
      '<div class="zikr-footer">' +
        '<button class="count-btn" id="countBtn">' +
          '<span class="btn-content">عدّ الذكر <span class="count-badge" id="countBadge">' + done + " / " + item.count + "</span></span>" +
        "</button>" +
        '<div class="mini-beads" id="miniBeads">' + renderMiniBeads(item.count, done) + "</div>" +
      "</div>";
  }

  function currentItems() { return azkarData[currentCat].items; }

  function updateMeta() {
    var items = currentItems();
    document.getElementById("zikrIndexLabel").textContent = (currentIndex + 1) + " / " + items.length;
  }

  function updateProgressBar() {
    var items = currentItems();
    var totalDone = 0, totalNeeded = 0;
    items.forEach(function (item, idx) {
      totalNeeded += item.count;
      totalDone += Math.min(getItemProgress(currentCat, idx), item.count);
    });
    var pct = totalNeeded ? (totalDone / totalNeeded) * 100 : 0;
    document.getElementById("progressFill").style.width = pct + "%";
  }

  function persistIndex() {
    var map = loadIndexMap();
    map[currentCat] = currentIndex;
    saveIndexMap(map);
  }

  // ---------------------------------------------------------
  // عرض/تبديل البطاقة (بطاقتان فقط تُنشآن مرة واحدة)
  // ---------------------------------------------------------
  function bindCard(el) {
    el.addEventListener("click", function (e) {
      var btn = e.target.closest("#countBtn");
      if (btn) handleCount();
    });
  }

  function handleCount() {
    var items = currentItems();
    var item = items[currentIndex];
    var done = getItemProgress(currentCat, currentIndex);
    if (done >= item.count) return; // مكتمل بالفعل، بانتظار الانتقال
    done += 1;
    setItemProgress(currentCat, currentIndex, done);
    if (navigator.vibrate) navigator.vibrate(15);

    var activeEl = slots[activeKey];
    activeEl.classList.toggle("done", done >= item.count);
    var badge = activeEl.querySelector("#countBadge");
    if (badge) badge.textContent = done + " / " + item.count;
    var beads = activeEl.querySelector("#miniBeads");
    if (beads) beads.innerHTML = renderMiniBeads(item.count, done);
    updateProgressBar();

    if (done >= item.count) {
      setTimeout(function () {
        goToIndex((currentIndex + 1) % items.length, "next");
      }, 550);
    }
  }

  function goToIndex(newIndex, direction) {
    if (animating) return;
    currentIndex = newIndex;
    persistIndex();
    var items = currentItems();
    var item = items[currentIndex];
    var done = getItemProgress(currentCat, currentIndex);

    if (!direction) {
      // بدون حركة (تحميل أول مرة أو إعادة ضبط)
      fillCard(slots[activeKey], item, currentIndex, azkarData[currentCat], done);
      slots[activeKey].style.visibility = "visible";
      slots[activeKey].style.zIndex = 2;
      var otherKey = activeKey === "A" ? "B" : "A";
      slots[otherKey].style.visibility = "hidden";
      updateMeta();
      updateProgressBar();
      return;
    }

    animating = true;
    var nextKey = activeKey === "A" ? "B" : "A";
    var showEl = slots[nextKey];
    var hideEl = slots[activeKey];

    fillCard(showEl, item, currentIndex, azkarData[currentCat], done);
    showEl.style.visibility = "visible";
    showEl.style.zIndex = 2;
    hideEl.style.zIndex = 1;
    showEl.classList.remove("entering");
    void showEl.offsetWidth; // إعادة تشغيل الأنيميشن
    showEl.classList.add("entering");
    hideEl.classList.remove("leaving-left", "leaving-right");
    hideEl.classList.add(direction === "prev" ? "leaving-right" : "leaving-left");

    setTimeout(function () {
      hideEl.classList.remove("leaving-left", "leaving-right");
      hideEl.style.visibility = "hidden";
      showEl.classList.remove("entering");
      activeKey = nextKey;
      animating = false;
    }, 440);

    updateMeta();
    updateProgressBar();
  }

  // ---------------------------------------------------------
  // التصنيف / التبويب
  // ---------------------------------------------------------
  function renderCategory(cat, opts) {
    currentCat = cat;
    var data = azkarData[cat];
    document.getElementById("catTitle").textContent = data.title;
    document.getElementById("catDesc").textContent = data.desc;
    document.getElementById("catIcon").innerHTML = data.icon;

    document.querySelectorAll(".tab-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.cat === cat);
    });

    var map = loadIndexMap();
    var startIndex = (opts && opts.forceZero) ? 0 : Math.min(map[cat] || 0, data.items.length - 1);
    currentIndex = startIndex;
    goToIndex(startIndex, null);
  }

  // ---------------------------------------------------------
  // التهيئة
  // ---------------------------------------------------------
  function init() {
    slots = { A: document.getElementById("cardA"), B: document.getElementById("cardB") };
    bindCard(slots.A);
    bindCard(slots.B);

    fetchAzkar().then(function (data) {
      azkarData = data;
      renderCategory(getUrlCat());
    }).catch(function () {
      document.getElementById("cardA").innerHTML =
        '<p class="empty-state">تعذّر تحميل بيانات الأذكار (zikr.json). تأكد من وجود الملف بجانب الصفحة.</p>';
    });

    document.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { renderCategory(btn.dataset.cat); });
    });

    document.getElementById("resetCatBtn").addEventListener("click", function () {
      window.noorConfirm("هل تريد إعادة ضبط جميع عدّادات هذا القسم والعودة للذكر الأول؟", function () {
        delete progress[currentCat];
        saveProgress(progress);
        var map = loadIndexMap();
        map[currentCat] = 0;
        saveIndexMap(map);
        renderCategory(currentCat, { forceZero: true });
      });
    });

    document.getElementById("prevZikrBtn").addEventListener("click", function () {
      var items = currentItems();
      goToIndex((currentIndex - 1 + items.length) % items.length, "prev");
    });
    document.getElementById("nextZikrBtn").addEventListener("click", function () {
      var items = currentItems();
      goToIndex((currentIndex + 1) % items.length, "next");
    });

    document.getElementById("copyZikrBtn").addEventListener("click", function () {
      var item = currentItems()[currentIndex];
      var text = item.text + (item.fadl ? "\n\n📌 الفضل: " + item.fadl : "");
      navigator.clipboard.writeText(text).then(function () {
        var btn = document.getElementById("copyZikrBtn");
        var content = btn.querySelector(".btn-content");
        var original = content.innerHTML;
        content.innerHTML = '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> تم النسخ';
        btn.classList.add("copied");
        setTimeout(function () { content.innerHTML = original; btn.classList.remove("copied"); }, 1500);
      });
    });

    function applyFont(scale) {
      fontScale = Math.max(0.9, Math.min(2.0, scale));
      localStorage.setItem(STORAGE_FONT, fontScale);
      document.querySelectorAll(".zikr-text").forEach(function (el) { el.style.fontSize = fontScale + "rem"; });
    }
    document.getElementById("incFontBtn").addEventListener("click", function () { applyFont(fontScale + 0.1); });
    document.getElementById("decFontBtn").addEventListener("click", function () { applyFont(fontScale - 0.1); });
    document.getElementById("resetFontBtn").addEventListener("click", function () { applyFont(1.18); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
