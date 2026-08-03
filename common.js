// ============================================================
// common.js — أدوات مشتركة بين كل صفحات الموقع
// (الثيم، قاعدة IndexedDB، تخزين الخطوط للعمل بدون إنترنت، نافذة المطور)
// ============================================================
(function () {
  "use strict";

  // ---------------------------------------------------------
  // 1) الثيم (ليلي / نهاري)
  // ---------------------------------------------------------
  var themeToggleBtn = document.getElementById("themeToggleBtn");

  function updateThemeIcon(isLight) {
    if (!themeToggleBtn) return;
    var content = themeToggleBtn.querySelector(".btn-content");
    if (!content) return;
    content.innerHTML = isLight
      ? '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }

  function initTheme() {
    var saved = localStorage.getItem("site_theme") || "dark";
    var isLight = saved === "light";
    if (isLight) document.body.classList.add("light-theme");
    updateThemeIcon(isLight);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("light-theme");
      var isLight = document.body.classList.contains("light-theme");
      localStorage.setItem("site_theme", isLight ? "light" : "dark");
      updateThemeIcon(isLight);
    });
  }
  initTheme();

  // ---------------------------------------------------------
  // 2) نافذة "عن المطور" (تعمل إن وُجد الزر/النافذة في الصفحة)
  // ---------------------------------------------------------
  var developerBtn = document.getElementById("developerBtn") || document.getElementById("developerCard");
  var devModalOverlay = document.getElementById("devModalOverlay");
  var closeDevModal = document.getElementById("closeDevModal");

  if (developerBtn && devModalOverlay) {
    developerBtn.addEventListener("click", function () {
      devModalOverlay.classList.add("open");
    });
    if (closeDevModal) {
      closeDevModal.addEventListener("click", function () {
        devModalOverlay.classList.remove("open");
      });
    }
    devModalOverlay.addEventListener("click", function (e) {
      if (e.target === devModalOverlay) devModalOverlay.classList.remove("open");
    });
  }

  // ---------------------------------------------------------
  // 3) IndexedDB — قاعدة بيانات عامة للموقع
  //    مخازن: fonts (تخزين الخطوط) ، customAzkar (أذكار المستخدم في المسبحة)
  // ---------------------------------------------------------
  var DB_NAME = "noor_al_iman_db";
  var DB_VERSION = 1;
  var dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error("لا يدعم هذا المتصفح IndexedDB")); return; }
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains("fonts")) db.createObjectStore("fonts");
        if (!db.objectStoreNames.contains("customAzkar")) db.createObjectStore("customAzkar", { keyPath: "id" });
      };
      req.onsuccess = function (e) { resolve(e.target.result); };
      req.onerror = function () { reject(req.error); };
    });
    return dbPromise;
  }

  function idbGet(store, key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, "readonly");
        var req = tx.objectStore(store).get(key);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function idbSet(store, key, value) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, "readwrite");
        var req = key === null ? tx.objectStore(store).put(value) : tx.objectStore(store).put(value, key);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function idbDelete(store, key) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, "readwrite");
        var req = tx.objectStore(store).delete(key);
        req.onsuccess = function () { resolve(); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function idbGetAll(store) {
    return openDB().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(store, "readonly");
        var req = tx.objectStore(store).getAll();
        req.onsuccess = function () { resolve(req.result || []); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  // نعرضها للاستخدام في ملفات الصفحات الأخرى
  window.NoorDB = { get: idbGet, set: idbSet, del: idbDelete, getAll: idbGetAll };

  // ---------------------------------------------------------
  // 4) تخزين الخطوط داخل IndexedDB للعمل بدون إنترنت
  //    أول زيارة: تُجلب الخطوط من الشبكة وتُحفظ كملفات (Blob).
  //    الزيارات التالية: تُقرأ من IndexedDB مباشرة دون أي طلب شبكة.
  // ---------------------------------------------------------
  var FONTS_CSS_URL = "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;700&display=swap";
  var FONTS_MANIFEST_KEY = "manifest-v1";

  function injectFontFace(family, weight, blob) {
    var url = URL.createObjectURL(blob);
    var style = document.createElement("style");
    style.textContent =
      "@font-face{font-family:'" + family + "';font-weight:" + weight +
      ";font-display:swap;src:url('" + url + "') format('woff2');}";
    document.head.appendChild(style);
  }

  // يحمّل الخطوط من IndexedDB إن كانت محفوظة مسبقًا؛ وإلا يجلبها من الشبكة مرة واحدة فقط ويخزّنها
  function loadFontsWithCache() {
    idbGet("fonts", FONTS_MANIFEST_KEY).then(function (manifest) {
      if (manifest && manifest.faces && manifest.faces.length) {
        // مُخزّنة مسبقًا: اقرأ كل ملف خط من IndexedDB مباشرة (بدون أي طلب شبكة)
        return Promise.all(manifest.faces.map(function (face) {
          return idbGet("fonts", face.blobKey).then(function (blob) {
            if (blob) injectFontFace(face.family, face.weight, blob);
          });
        }));
      }
      return fetchAndCacheFonts();
    }).catch(function () {
      // تجاهل بصمت: ستبقى خطوط <link> العادية في head تعمل عند توفر الإنترنت
    });
  }

  function fetchAndCacheFonts() {
    return fetch(FONTS_CSS_URL).then(function (res) { return res.text(); }).then(function (cssText) {
      var regex = /font-family:\s*'([^']+)';\s*font-style:\s*normal;\s*font-weight:\s*(\d+);[\s\S]*?src:\s*url\(([^)]+)\)\s*format\('woff2'\);/g;
      var match, idx = 0, jobs = [], faces = [];
      while ((match = regex.exec(cssText)) !== null) {
        (function (family, weight, url, blobKey) {
          jobs.push(
            fetch(url).then(function (r) { return r.blob(); }).then(function (blob) {
              injectFontFace(family, weight, blob);
              faces.push({ family: family, weight: weight, blobKey: blobKey });
              return idbSet("fonts", blobKey, blob);
            }).catch(function () {})
          );
        })(match[1], match[2], match[3], match[1] + "-" + match[2] + "-" + (idx++));
      }
      return Promise.all(jobs).then(function () {
        if (faces.length) idbSet("fonts", FONTS_MANIFEST_KEY, { faces: faces });
      });
    });
  }

  loadFontsWithCache();

  // ---------------------------------------------------------
  // 5) تأكيد بديل لـ window.confirm داخل تطبيقات WebView
  // ---------------------------------------------------------
  window.noorConfirm = function (message, onYes) {
    if (window.Android) {
      // في حال توفر جسر أندرويد مخصص لاحقًا
    }
    if (confirm(message)) onYes();
  };
})();
