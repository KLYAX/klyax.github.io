import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import Swiper from "utils/libs/swiper";
import HomeReviewsReview from "./HomeReviewsReview";

class HomeReviewsSlider extends Component {
  static propTypes = {
    slides: PropTypes.array,
    activeSlideIndex: PropTypes.number,
    changeActiveSlide: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.sliderRef = createRef();
  }

  initSlider() {
    const sliderEl = this.sliderRef.current;

    this.slider = new Swiper(sliderEl, {
      // observer: true,
      // observeParents: true,
      speed: 0,
      allowTouchMove: false,
      autoplayScrollTrigger: true,
      autoplay: {
        delay: 11000,
        disableOnInteraction: false,
      },
      effect: "slide-content",
      slideContentEffect: {
        delay: 80,
        addCustomAppearAnimation(timeline, activeSlide, { duration }) {
          const slideImage = activeSlide.querySelector(
            ".reviews-review-author__avatar-inner > *"
          );

          return timeline.fromTo(
            slideImage,
            {
              yPercent: 0,
            },
            {
              yPercent: -100,
              duration: duration,
              ease: "ease-in",
            }
          );
        },
        addCustomLeaveAnimation(timeline, prevSlide, { duration }) {
          const slideImage = prevSlide.querySelector(
            ".reviews-review-author__avatar-inner > *"
          );

          return timeline.fromTo(
            slideImage,
            {
              yPercent: 20,
              xPercent: 25,
              opacity: 0,
            },
            {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              duration: duration,
            }
          );
        },
      },
      timer: {
        selector: ".reviews__slide-switch .slide-switch__timer",
      },
      navigation: {
        prevEl: ".reviews__slide-switch .slide-switch__button_prev",
        nextEl: ".reviews__slide-switch .slide-switch__button_next",
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

  changeSlide(index) {
    this.slider.slideTo(index);
    this.props.changeActiveSlide(index);
  }

  componentDidMount() {
    this.initSlider();

    this.slider.autoplay.stop();

    // console.log(this.slider.autoplay);

    // this.sectionEl = document.querySelector('reviews');

    // this.scrollTrigger = ScrollTrigger.create({
    //   trigger: this.sliderRef.current,
    //   onLeave: this.slider.autoplay.stop,
    //   onLeaveBack: this.slider.autoplay.stop,
    //   onEnter: this.slider.autoplay.start,
    //   onEnterBack: this.slider.autoplay.start,
    // });
  }

  componentWillUnmount() {
    this.slider.destroy();
    // this.scrollTrigger.kill();
  }

  render() {
    const { slides } = this.props;

    return (
      <div ref={this.sliderRef} className="reviews-slider swiper-container">
        <ul className="reviews-slider__slides list swiper-wrapper">
          {slides.map((review, i) => (
            <li key={i} className="reviews-slider__slide swiper-slide">
              <HomeReviewsReview {...review} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomeReviewsSlider;
