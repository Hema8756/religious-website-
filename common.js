(function () {
  "use strict";

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

  // IndexedDB — تحديث الإصدار والمخازن
  var DB_NAME = "noor_al_iman_db";
  var DB_VERSION = 3;
  var dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error("IndexedDB Not Supported")); return; }
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains("fonts")) db.createObjectStore("fonts");
        if (!db.objectStoreNames.contains("customAzkar")) db.createObjectStore("customAzkar", { keyPath: "id" });
        if (!db.objectStoreNames.contains("reciters")) db.createObjectStore("reciters");
        if (!db.objectStoreNames.contains("hadithFavs")) db.createObjectStore("hadithFavs", { keyPath: "id" });
        if (!db.objectStoreNames.contains("hadithHistory")) db.createObjectStore("hadithHistory", { keyPath: "query" });
        // مخازن قسم التفسير
        if (!db.objectStoreNames.contains("tafasirList")) db.createObjectStore("tafasirList");
        if (!db.objectStoreNames.contains("tafsirFavs")) db.createObjectStore("tafsirFavs", { keyPath: "id" });
        if (!db.objectStoreNames.contains("tafsirHistory")) db.createObjectStore("tafsirHistory", { keyPath: "id" });
        if (!db.objectStoreNames.contains("tafsirState")) db.createObjectStore("tafsirState");
        if (!db.objectStoreNames.contains("tafsirCache")) db.createObjectStore("tafsirCache", { keyPath: "id" });
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

  window.NoorDB = { get: idbGet, set: idbSet, del: idbDelete, getAll: idbGetAll };

  window.noorConfirm = function (message, onYes) {
    if (confirm(message)) onYes();
  };
})();
