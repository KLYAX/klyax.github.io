import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import debounce from "lodash/debounce";

import Swiper from "utils/libs/swiper";

export const HOME_HERO_SLIDE_CHANGE_DURATION = 1000;

/**
 * Компонент создает слайдер для секции хиро главной страницы
 */
export class HomeHeroSlider extends Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.object),
    activeSlideIndex: PropTypes.number,
    handleSlideChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.sliderRef = createRef();

    this.slideImageSelector = ".home-hero-background-slider-slide__image";

    this.handleWindowWheel = this.handleWindowWheel.bind(this);
    this.handleWindowTouchstart = this.handleWindowTouchstart.bind(this);
    this.handleWindowTouchmove = this.handleWindowTouchmove.bind(this);

    this.lastDir = 0;
    this.animating = false;

    this.prevSlideIndex = null;
  }

  componentWillUnmount() {
    this.slider.destroy();
    this.destroy();
  }

  componentDidMount() {
    this.initSlider();
    this.initChangeSlideOnScroll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSlideIndex !== prevProps.activeSlideIndex) {
      this.slider.slideTo(this.props.activeSlideIndex);
    }
  }

  /**
   * Удаляет все обработчики событий компонента
   */
  destroy() {
    window.removeEventListener("wheel", this.handleWindowWheel);
    window.removeEventListener("touchstart", this.handleWindowTouchstart);
    window.removeEventListener("touchmove", this.handleWindowTouchmove);
  }

  /**
   * Инициализирует слайдер и все его необходимые обработчики
   */
  initSlider() {
    this.slider = new Swiper(this.sliderRef.current, {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      speed: HOME_HERO_SLIDE_CHANGE_DURATION,
      effect: "overlay",
      watchSlidesProgress: true,
      loop: false,
      resistance: true,
      resistanceRatio: 0,
      allowTouchMove: false,
      init: false,
    });

    // this.slider.on("slideChange", (swiper) => {
    //   this.props.onChange(swiper.activeIndex);
    // });

    this.slider.on("progress", (swiper) => {
      this.handleSliderProgress(swiper);
    });

    this.slider.on("setTransition", (swiper, speed) => {
      this.handleSliderSetTransition(swiper, speed);
    });

    this.slider.init();
  }

  /**
   * инициализирует изменения текущего продукта в зависимости от направления скролла
   */
  initChangeSlideOnScroll() {
    /**
     * @type {HTMLElement}
     */
    this.view = document.querySelector(".view");
    /**
     * @type {HTMLElement}
     */
    this.section = document.querySelector(".home-hero");
    this.lastTouchY = 0;

    window.addEventListener("wheel", this.handleWindowWheel);
    window.addEventListener("touchstart", this.handleWindowTouchstart);
    window.addEventListener("touchmove", this.handleWindowTouchmove);
  }

  /**
   * Изменяет активный продукт в зависимости от направления скролла dir
   *
   * @param {number} dir - Направление скролла
   */
  changeSlideIndexByScrollingDir(dir) {
    // если происходит переключение слайда и скролл находится не в начале страницы
    // тогда выходим из функции

    if (this.slider.animating || window.pageYOffset !== 0) return;

    const { activeSlideIndex, slides } = this.props;

    const lastSlideIndex = slides.length - 1;
    let nextSlideIndex = activeSlideIndex + dir;

    if (nextSlideIndex < 0) {
      nextSlideIndex = 0;
    } else if (nextSlideIndex > lastSlideIndex) {
      nextSlideIndex = lastSlideIndex;
    }

    // если текущий продукт не равен след. продукту
    // и если след. продукт существует, тогда меням активный продукт на след.

    if ((nextSlideIndex === 0 && dir === -1) || (nextSlideIndex === lastSlideIndex && dir !== -1)) {
      this.enableTouchEvents();
    } else {
      this.disableTouchEvents();
    }

    if (activeSlideIndex === lastSlideIndex) {
      // если скролл происходи наверх и текущий продукт равен последнему продукту
      // тогда отключаем скролл в противном случае возвращаем скролл
      if (dir > 0) {
        this.props.enableScroll();
      } else if (dir < 0) {
        this.props.disableScroll();
      }
    }

    if (
      nextSlideIndex !== activeSlideIndex &&
      nextSlideIndex <= lastSlideIndex &&
      nextSlideIndex >= 0
    ) {
      this.props.changeSlide(nextSlideIndex);
    }
  }

  /**
   * Отключает тач события (для того, чтобы предотвратить перезагрузку страницы на телефонах,
   * когда происходит скролл наверх и позиция скролла равна 0)
   */
  enableTouchEvents() {
    if (this.section) {
      this.section.style.touchAction = "auto";
    }
  }

  /**
   * Возвращает тач события (для того, чтобы предотвратить перезагрузку страницы на телефонах,
   * когда происходит скролл наверх и позиция скролла равна 0)
   */
  disableTouchEvents() {
    if (this.section) {
      this.section.style.touchAction = "none";
    }
  }

  /**
   * Обработчик скролла страницы
   *
   * @param {WheelEvent} e
   */
  handleWindowWheel(e) {
    if (this.slider.animating || window.pageYOffset !== 0) {
      return;
    }

    let target = e.target;

    while (target && target !== this.section) {
      target = target.parentNode;
    }

    if (target) {
      this.changeSlideIndexOnWindowWheel(e);
    }
  }

  /**
   * Меняет активный продукт при скролле
   *
   * @param {WheelEvent} e
   */
  changeSlideIndexOnWindowWheel(e) {
    const dir = Math.sign(e.deltaY);

    this.changeSlideIndexByScrollingDir(dir);
  }

  /**
   * Обработчик touchstart страницы
   *
   * @param {TouchEvent} e
   */
  handleWindowTouchstart(e) {
    this.lastTouchY = e.touches[0].clientY;
  }

  /**
   * Обработчик touchmove страницы
   *
   * @param {TouchEvent} e
   */
  handleWindowTouchmove(e) {
    const touchY = e.touches[0].clientY;
    // направления скролла
    const dir = Math.sign(-(touchY - this.lastTouchY));

    this.lastTouchY = touchY;

    this.changeSlideIndexByScrollingDir(dir);

    // e.preventDefault();
  }

  /**
   * Обработчик события progress слайдера
   *
   * @param {Swiper} swiper
   */
  handleSliderProgress(swiper) {
    // значение используется расчитывания начального размера картинки слайда
    // чем больше значение, тем больше будет картинка при заходе на слайд
    const scaleRate = 0.5;
    // начальное значения x в % картинки при при заходе на слайд
    const initialX = 40;
    // начальное значения y в % картинки при заходе на слайд
    const initialY = 10;

    // обходим каждый слайд и применяем трансформации для картинки
    // слайда с учетом прогресса слайда
    swiper.slides.forEach((slide) => {
      const image = slide.querySelector(this.slideImageSelector);

      if (image) {
        // рассчитываем трансформации картинки слайда с учётом прогресса слайда
        const scale = 1 - slide.progress * scaleRate;
        const x = -(slide.progress * initialX);
        const y = -(slide.progress * initialY);

        image.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${scale}) rotate(0.001deg)`;
      }
    });
  }

  /**
   * Обработчик события setTransition слайдера
   *
   * @param {Swiper} swiper
   */
  handleSliderSetTransition(swiper, speed) {
    // обходим каждый слайд и устанавливаем для картинки слайда продолжительность
    // анимации равную продолжительности переключения сладов
    swiper.slides.forEach((slide) => {
      const image = slide.querySelector(this.slideImageSelector);

      if (image) {
        image.style.transitionDuration = speed + "ms";
      }
    });
  }

  handleSlideChange(swiper) {}

  render() {
    const { slides, scrollbarGap } = this.props;

    return (
      <div
        ref={this.sliderRef}
        className="home-hero-background__slider home-hero-background-slider swiper-container"
      >
        <ul className="home-hero-background-slider__slides list swiper-wrapper">
          {slides.map(({ image, color }, i) => (
            <li
              key={i}
              className="home-hero-background-slider__slide home-hero-background-slider-slide swiper-slide"
            >
              <div
                style={{ backgroundColor: color }}
                className="home-hero-background-slider-slide__background background container"
              >
                <div
                  // style={{ paddingRight: scrollbarGap }}
                  className="home-hero-background-slider-slide__inner swiper-slide-inner row"
                >
                  <div className="home-hero-background-slider-slide__image-container col-12 col-sm-10 offset-sm-1 offset-lg-6 col-lg-5 offset-xl-6 col-xl-6">
                    <div className="home-hero-background-slider-slide__image-wrapper">
                      <img
                        className="home-hero-background-slider-slide__image"
                        src={image.src}
                        alt={image.alt}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomeHeroSlider;
