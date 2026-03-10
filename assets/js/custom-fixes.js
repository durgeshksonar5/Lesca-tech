jQuery(function ($) {
  console.log("Custom Fixes Loaded");

  // --- UI TOGGLES ---

  // Search Toggle
  $(".search_btn_toggle").on("click", function (e) {
    e.preventDefault();
    $(".txa-search-box").addClass("active");
  });
  $(".search_box_close").on("click", function (e) {
    e.preventDefault();
    $(".txa-search-box").removeClass("active");
  });

  // Offcanvas Toggle
  $(".offcanvas_toggle").on("click", function (e) {
    e.preventDefault();
    $(".txa-offcanvas-box").addClass("active");
  });
  $(".offcanvas_box_close, .txa-offcanvas-box .overlay").on(
    "click",
    function (e) {
      e.preventDefault();
      $(".txa-offcanvas-box").removeClass("active");
    },
  );

  // --- PLUGIN INITIALIZATIONS ---

  // Initialize WOW.js
  if (typeof WOW !== "undefined") {
    new WOW().init();
    console.log("WOW initialized manually");
  }

  // Initialize Swiper Sliders
  if (typeof Swiper !== "undefined") {
    // Hero Slider
    if ($(".fx-hero-1-active").length > 0) {
      new Swiper(".fx-hero-1-active", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: "fade",
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".fx-hero-1-next",
          prevEl: ".fx-hero-1-prev",
        },
        pagination: {
          el: ".fx-hero-1-pagination",
          clickable: true,
        },
      });
    }

    // Serve Slider
    if ($(".fx-serve-1-active").length > 0) {
      new Swiper(".fx-serve-1-active", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        },
        navigation: {
          nextEl: ".fx-serve-1-slider-next",
          prevEl: ".fx-serve-1-slider-prev",
        },
      });
    }

    // Services Slider
    if ($(".fx-services-1-active").length > 0) {
      new Swiper(".fx-services-1-active", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: ".fx-services-1-slider-next",
          prevEl: ".fx-services-1-slider-prev",
        },
      });
    }

    // Testimonial Slider
    if ($(".fx-testimonial-1-active-1").length > 0) {
      new Swiper(".fx-testimonial-1-active-1", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".fx-testimonial-1-pagination",
          clickable: true,
        },
      });
    }

    console.log("Swiper initialized manually");
  }

  // Initialize CounterUp
  if ($.fn.counterUp) {
    $(".counter").counterUp({
      delay: 10,
      time: 1000,
    });
    console.log("Counters initialized manually");
  }

  // Magnific Popup (for video and images)
  if ($.fn.magnificPopup) {
    $(".video-link, .popup-video").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
    $(".popup-image").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
    console.log("Magnific Popup initialized manually");
  }

  // Nice Select
  if ($.fn.niceSelect) {
    $("select").niceSelect();
    console.log("Nice Select initialized manually");
  }
});
