import React, { Component, createRef } from "react";
import Swiper from "utils/libs/swiper";
import PropTypes from "prop-types";
import AdvantagesSliderSlide from "./AdvantagesSliderSlide";

class AdvantagesSlider extends Component {
  static propTypes = {
    changeActiveSlide: PropTypes.func,
    activeSlideIndex: PropTypes.number,
    slideSwitch: PropTypes.element,
  };

  constructor(props) {
    super(props);

    this.sliderRef = createRef();
  }

  /**
   * Инициализирует слайдер
   */
  initSlider() {
    const sliderEl = this.sliderRef.current;

    this.slider = new Swiper(sliderEl, {
      observer: true,
      observeParents: true,
      speed: 400,
      slideContentEffect: {
        delay: 80,
      },
      allowTouchMove: false,
      slideActiveClass: "advantages-slider-slide_active",
      slidePrevClass: "advantages-slider-slide_prev",
      slideNextClass: "advantages-slider-slide_next",
      effect: "slide-content",
      autoplay: {
        delay: 11000,
        disableOnInteraction: false,
      },
      autoplayScrollTrigger: true,
      timer: {
        selector: ".advantages__slide-switcher .slide-switch__timer",
      },
      navigation: {
        prevEl: ".advantages__slide-switcher .slide-switch__button_prev",
        nextEl: ".advantages__slide-switcher .slide-switch__button_next",
        disabledClass: "slide-switch__button_disabled",
      },
      init: false,
    });

    // Если слайд изменился с помощью автоплея или кнопок навигации (назад, вперед),
    // тогда обновляем пропс activeSlideIndex на и индекс текущего слайда
    this.slider.on("slideChange", (swiper) => {
      if (this.props.activeSlideIndex !== swiper.activeIndex) {
        this.props.changeActiveSlide(swiper.activeIndex);
      }
    });

    this.slider.init();
  }

  componentDidUpdate(prevProps) {
    // Обновляем слайд если индекс активного слайда изменился
    if (this.props.activeSlideIndex !== prevProps.activeSlideIndex) {
      this.slider.slideTo(this.props.activeSlideIndex);
    }
  }

  componentDidMount() {
    this.initSlider();
  }

  componentWillUnmount() {
    this.slider.destroy();
  }

  render() {
    const { slides } = this.props;

    return (
      <div ref={this.sliderRef} className="advantages-slider swiper-container">
        <ul className="advantages-slider__slides swiper-wrapper list">
          {slides.map((slide, i) => (
            <AdvantagesSliderSlide key={i} {...slide} />
          ))}
        </ul>
      </div>
    );
  }
}

export default AdvantagesSlider;
