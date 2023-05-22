import React, { Component, createRef } from "react";
import classNames from "classnames";
import Swiper from "utils/libs/swiper";

class ProductHeroSlider extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = createRef();
  }

  initSlider() {
    const sliderEl = this.sliderRef.current;

    this.slider = new Swiper(sliderEl, {
      observer: true,
      observeParents: true,
      slidesPerColumn: 1,
      speed: 800,
      init: false,
      grabCursor: true,
      parallax: true,
      initialSlide: this.props.activeSlideIndex,
    });

    this.slider.on("slideChange", (swiper) => {
      const activeSlide = this.props.slides[swiper.activeIndex];

      this.props.onChange(activeSlide);
    });

    this.slider.init();
  }

  componentDidMount() {
    this.initSlider();
  }

  componentWillUnmount() {
    this.slider.destroy();
  }

  componentDidUpdate() {
    if (this.props.activeSlideIndex !== this.slider.activeIndex) {
      this.slider.slideTo(this.props.activeSlideIndex);
    }
  }

  render() {
    const { slides, className } = this.props;

    return (
      <div
        ref={this.sliderRef}
        className={classNames("control-cabinets-slider sticky swiper-container", className)}
      >
        <ul className="control-cabinets-slider__slides list swiper-wrapper">
          {slides.map(({ slide }, i) => {
            return (
              <li
                key={i}
                style={{ backgroundColor: slide.color }}
                className="control-cabinets-slider-slide swiper-slide"
              >
                <div className="control-cabinets-slider-slide__image-wrapper">
                  <img
                    src={slide.image.src}
                    alt={slide.image.alt}
                    className="control-cabinets-slider-slide__image"
                    data-swiper-parallax="-300"
                    data-swiper-parallax-duration="800"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ProductHeroSlider;
