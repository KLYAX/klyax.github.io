import $ from "jquery";

/**
 * компонент swiper, который отвечает за анимацию при которой слайды наезжают друг на друга
 */
const component = {
  name: "effect-overlay",
  params: {
    overlayEffect: {
      offset: 1,
      slideInner: ".swiper-slide-inner",
    },
  },
  on: {
    /**
     * включаем доступ к переменной progress
     */
    beforeInit(swiper) {
      if (swiper.params.effect !== "overlay") return;

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },

    /**
     * анимируем изменения слайдов при наступлении события progress
     */
    progress(swiper) {
      if (swiper.params.effect !== "overlay") return;

      const innerOffset = swiper.width * swiper.params.overlayEffect.offset;

      swiper.slides.forEach((slide) => {
        const innerTranslate = slide.progress * innerOffset;

        const $inner = $(slide).find(swiper.params.overlayEffect.slideInner);

        if ($inner.length) {
          $inner.css("transform", `translate3d(${innerTranslate}px, 0, 0)`);
        }
      });
    },

    /**
     * убираем transition при начале тач события
     */
    touchStart(swiper) {
      if (swiper.params.effect !== "overlay") return;

      swiper.slides.forEach((slide) => {
        slide.style.transition = "";
      });
    },

    /**
     * Устанавливаем скорость смены слайдов при наступлении события setTransition
     */
    setTransition(swiper, speed) {
      if (swiper.params.effect !== "overlay") return;

      const speedWidthMs = speed + "ms";

      swiper.slides.forEach((slide) => {
        slide.style.transition = speedWidthMs;

        const $inner = $(slide).find(swiper.params.overlayEffect.slideInner);

        if ($inner.length) {
          $inner.css("transition", speedWidthMs);
        }
      });
    },
  },
};

export default component;
