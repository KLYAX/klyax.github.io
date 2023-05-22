import $ from "jquery";
import gsap from "gsap";
import { bindModuleMethods } from "swiper/esm/utils/utils";

/**
 * компонент swiper, который отвечает за анимацию при которой элементы слайда, при его появлении, выезжают снизу, а при исчезании уезжают наверх
 */
const component = {
  name: "effect-slide-content",
  params: {
    slideContentEffect: {
      duration: 0.5,
      interval: 0.04,
      contentSelector: ".swiper-content-slide-up-effect",
    },
  },
  create() {
    const swiper = this;

    bindModuleMethods(swiper, {
      slideContent: {
        timeline: gsap.timeline(),
      },
    });
  },
  on: {
    beforeInit(swiper) {
      if (swiper.params.effect !== "slide-content") return;

      swiper.params.speed = swiper.originalParams.speed = 0;
    },

    /**
     * Метод swiper который вызывается для инициализации swiper
     */
    init(swiper) {
      if (swiper.params.effect !== "slide-content") return;

      gsap.set(swiper.wrapperEl, {
        transitionDelay: swiper.params.slideContentEffect.duration + "s",
      });
    },

    destroy(swiper) {
      if (swiper.params.effect !== "slide-content") return;
    },

    setTranslate(swiper, translate) {
      if (swiper.params.effect !== "slide-content") return;

      const { slideContentEffect } = swiper.params;
      const { timeline } = swiper.slideContent;

      const activeIndex = -(translate / swiper.width);
      const prevIndex = swiper.activeIndex;

      if (activeIndex === prevIndex) return;

      const $prevSlide = $(swiper.slides[prevIndex]);
      const $activeSlide = $(swiper.slides[activeIndex]);

      const $prevSlideContentItems = $prevSlide.find(
        `${slideContentEffect.contentSelector} > *`
      );
      const $activeSlideContentItems = $activeSlide.find(
        `${slideContentEffect.contentSelector} > *`
      );

      const hidePrevSlideContentTween = gsap.fromTo(
        $prevSlideContentItems.toArray(),
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          duration: slideContentEffect.duration,
          stagger: slideContentEffect.interval,
          ease: "ease-in",
          onComplete() {
            timeline.seek("changeSlideStart");
          },
        }
      );

      const showActiveSlideContentTween = gsap.fromTo(
        $activeSlideContentItems.toArray(),
        {
          yPercent: 100,
        },
        {
          ease: "ease-out",
          yPercent: 0,
          stagger: slideContentEffect.interval,
          duration: slideContentEffect.duration,
        }
      );

      if (timeline.progress() === 1) {
        timeline.clear();
      }

      timeline.addLabel("startHide");

      if (typeof slideContentEffect.addCustomAppearAnimation === "function") {
        timeline.add(
          slideContentEffect.addCustomAppearAnimation(timeline, $prevSlide[0], {
            duration: slideContentEffect.duration,
            stagger: slideContentEffect.interval,
          }),
          "startHide"
        );
      }

      timeline.add(hidePrevSlideContentTween, "startHide");

      timeline.addLabel("changeSlideStart");

      timeline.addLabel("startShow");

      if (typeof slideContentEffect.addCustomLeaveAnimation === "function") {
        timeline.add(
          slideContentEffect.addCustomLeaveAnimation(
            timeline,
            $activeSlide[0],
            {
              duration: slideContentEffect.duration,
              stagger: slideContentEffect.interval,
            }
          ),
          "startShow"
        );
      }

      timeline.add(showActiveSlideContentTween, "startShow");
    },
  },
};

export default component;
