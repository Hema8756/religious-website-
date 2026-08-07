(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("dorarForm");
    var input = document.getElementById("hadithQueryInput");
    var overlay = document.getElementById("hadithOverlay");
    var chips = document.querySelectorAll(".quick-chip");

    // عند النقر على الاقتراحات السريعة
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var query = this.getAttribute("data-query");
        if (query && input) {
          input.value = query;
          submitSearch();
        }
      });
    });

    // عند تقديم نموذج البحث
    if (form) {
      form.addEventListener("submit", function (e) {
        var val = input ? input.value.trim() : "";
        if (!val) {
          e.preventDefault();
          alert("يرجى كتابة كلمة أو نص من الحديث أولاً للبحث.");
          return;
        }

        showLoading();
      });
    }

    function submitSearch() {
      if (form) {
        showLoading();
        form.submit();
      }
    }

    function showLoading() {
      if (overlay) {
        overlay.classList.add("show");
        // إخفاء Overlay تلقائياً بعد ثانيتين لضمان سلاسة الواجهة
        setTimeout(function () {
          overlay.classList.remove("show");
        }, 2200);
      }
    }
  });
})();
