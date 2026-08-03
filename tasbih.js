// ============================================================
// tasbih.js — منطق صفحة المسبحة الإلكترونية
// ============================================================
(function () {
  "use strict";

  var dragBead = document.getElementById("dragBead");
  var beadsTrack = document.getElementById("beadsTrack");
  var counterNumber = document.getElementById("counterNumber");
  var counterRound = document.getElementById("counterRound");
  var ringFg = document.getElementById("ringFg");
  var dhikrCards = document.getElementById("dhikrCards");
  var currentDhikrText = document.getElementById("currentDhikrText");

  var tasbihCount = 0;
  var tasbihRound = 1;
  var RING_LENGTH = 326.7;

  function updateTasbihDisplay() {
    counterNumber.textContent = tasbihCount;
    counterRound.textContent = "الدورة: " + tasbihRound;
    var offset = RING_LENGTH - ((tasbihCount % 33) / 33) * RING_LENGTH;
    ringFg.style.strokeDasharray = RING_LENGTH;
    ringFg.style.strokeDashoffset = tasbihCount > 0 && tasbihCount % 33 === 0 ? 0 : offset;
  }

  function incrementTasbih() {
    tasbihCount++;
    if (tasbihCount % 33 === 0) tasbihRound++;
    if (navigator.vibrate) navigator.vibrate(12);
    updateTasbihDisplay();
  }

  document.getElementById("counterMinus").addEventListener("click", function () {
    if (tasbihCount > 0) tasbihCount--;
    updateTasbihDisplay();
  });
  document.getElementById("counterReset").addEventListener("click", function () {
    tasbihCount = 0; tasbihRound = 1; updateTasbihDisplay();
  });

  // ---------------------------------------------------------
  // اختيار الذكر (البطاقات الجاهزة + المخصّصة)
  // ---------------------------------------------------------
  function setActiveChip(chip) {
    dhikrCards.querySelectorAll(".dhikr-chip").forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    currentDhikrText.textContent = chip.dataset.text;
  }

  dhikrCards.addEventListener("click", function (e) {
    var delBtn = e.target.closest(".del-custom");
    if (delBtn) {
      e.stopPropagation();
      var chip = delBtn.closest(".dhikr-chip");
      var id = chip.dataset.id;
      if (window.NoorDB && id) window.NoorDB.del("customAzkar", id).catch(function () {});
      chip.remove();
      return;
    }
    var chip = e.target.closest(".dhikr-chip");
    if (chip) setActiveChip(chip);
  });

  function buildCustomChip(entry) {
    var chip = document.createElement("button");
    chip.className = "dhikr-chip";
    chip.dataset.text = entry.text;
    chip.dataset.id = entry.id;
    chip.innerHTML = "<span>" + entry.text + "</span><button class=\"del-custom\" title=\"حذف\">×</button>";
    return chip;
  }

  function loadCustomAzkar() {
    if (!window.NoorDB) return;
    window.NoorDB.getAll("customAzkar").then(function (list) {
      list.forEach(function (entry) { dhikrCards.appendChild(buildCustomChip(entry)); });
    }).catch(function () {});
  }
  loadCustomAzkar();

  document.getElementById("customDhikrForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("customDhikrInput");
    var text = input.value.trim();
    if (!text) return;
    var entry = { id: "custom-" + Date.now(), text: text };
    if (window.NoorDB) {
      window.NoorDB.set("customAzkar", null, entry).catch(function () {});
    }
    var chip = buildCustomChip(entry);
    dhikrCards.appendChild(chip);
    setActiveChip(chip);
    input.value = "";
  });

  // ---------------------------------------------------------
  // سحب الخرزة (فأرة + لمس)
  // ---------------------------------------------------------
  var dragging = false, startY = 0, trackTop = 16;

  function onDragStart(y) { dragging = true; startY = y; dragBead.classList.remove("snap-back"); }
  function onDragMove(y) {
    if (!dragging) return;
    var delta = Math.max(0, Math.min(y - startY, beadsTrack.clientHeight - 60));
    dragBead.style.top = (trackTop + delta) + "px";
  }
  function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    if (parseFloat(dragBead.style.top || trackTop) > beadsTrack.clientHeight * 0.5) incrementTasbih();
    dragBead.classList.add("snap-back");
    dragBead.style.top = trackTop + "px";
  }

  dragBead.addEventListener("mousedown", function (e) { onDragStart(e.clientY); });
  document.addEventListener("mousemove", function (e) { onDragMove(e.clientY); });
  document.addEventListener("mouseup", onDragEnd);

  dragBead.addEventListener("touchstart", function (e) { onDragStart(e.touches[0].clientY); }, { passive: true });
  document.addEventListener("touchmove", function (e) { onDragMove(e.touches[0].clientY); }, { passive: true });
  document.addEventListener("touchend", onDragEnd);

  dragBead.addEventListener("click", function () { incrementTasbih(); });

  updateTasbihDisplay();
})();
