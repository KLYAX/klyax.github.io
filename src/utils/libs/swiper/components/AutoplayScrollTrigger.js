import { bindModuleMethods } from "swiper/esm/utils/utils";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isInView } from "utils/dom";

/**
 * компонент swiper, который отвечает за анимацию при которой слайды наезжают друг на друга
 */
const component = {
  name: "autoplay-scroll-trigger",
  params: {
    autoplayScrollTrigger: false,
  },
  create() {
    const swiper = this;

    bindModuleMethods(swiper, {
      autoplayScrollTrigger: {
        scrollTrigger: null,
      },
    });
  },
  on: {
    /**
     * включаем доступ к переменной progress
     */
    init(swiper) {
      if (!swiper.params.autoplayScrollTrigger || !swiper.params.autoplay) {
        return;
      }

      if (!isInView(swiper.el)) {
        swiper.autoplay.stop();
      }

      swiper.autoplayScrollTrigger.scrollTrigger = ScrollTrigger.create({
        trigger: swiper.el,
        onLeave: swiper.autoplay.stop,
        onLeaveBack: swiper.autoplay.stop,
        onEnter: swiper.autoplay.start,
        onEnterBack: swiper.autoplay.start,
      });
    },

    destroy(swiper) {
      if (!swiper.params.autoplayScrollTrigger || !swiper.params.autoplay) {
        return;
      }

      if (swiper.autoplayScrollTrigger.scrollTrigger) {
        swiper.autoplayScrollTrigger.scrollTrigger.kill();
      }
    },
  },
};

export default component;
