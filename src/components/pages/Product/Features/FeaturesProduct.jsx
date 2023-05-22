import React, { Component, createRef } from "react";
import classNames from "classnames";
import { AppearOnScroll } from "components/common";

class FeaturesProduct extends Component {
  constructor(props) {
    super(props);

    this.arrowRef = createRef();
    this.imageWrapperRef = createRef();
    this.productViewRef = createRef();

    this.handleAnimationStart = this.handleAnimationStart.bind(this);
    this.windowResizeHandler = this.windowResizeHandler.bind(this);
  }

  componentDidMount() {
    this.updateArrowWidth();

    window.addEventListener("resize", this.windowResizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResizeHandler);
  }

  windowResizeHandler() {
    this.updateArrowWidth();
  }

  updateArrowWidth() {
    const arrowElem = this.arrowRef.current;
    const imageWrapperElem = this.imageWrapperRef.current;
    const productViewElem = this.productViewRef.current;

    if (arrowElem && imageWrapperElem) {
      arrowElem.style.width =
        productViewElem.offsetWidth - imageWrapperElem.offsetWidth / 2 + 30 + "px";
    }
  }

  handleAnimationStart() {
    const arrowEl = this.arrowRef.current;

    if (arrowEl) {
      arrowEl.classList.remove("features-main-product-view-arrow_appear");

      setTimeout(() => {
        arrowEl.classList.add("features-main-product-view-arrow_appear");
      }, 0);
    }
  }

  render() {
    const { className, image } = this.props;

    return (
      <div
        ref={this.productViewRef}
        className={classNames("features-main-product-view", className)}
      >
        <AppearOnScroll
          overflow={false}
          target=".features-main-product-view__image-wrapper"
          className="features-main-product-view__inner"
          vars={{
            yPercent: 0,
            opacity: 0,
            scale: 1.2,
            delay: 0,
            onStart: () => this.handleAnimationStart(),
          }}
        >
          <div
            key={image.src}
            ref={this.imageWrapperRef}
            className="features-main-product-view__image-wrapper"
          >
            <div
              ref={this.arrowRef}
              className="features-main-product-view__arrow features-main-product-view-arrow"
            >
              <span className="features-main-product-view-arrow__line features-main-product-view-arrow__line_left"></span>
              <span className="features-main-product-view-arrow__line features-main-product-view-arrow__line_top"></span>
              <span className="features-main-product-view-arrow__line features-main-product-view-arrow__line_right"></span>
            </div>
            <img
              ref={this.imageRef}
              className="features-main-product-view__image"
              src={image.src}
              alt={image.alt}
            />
          </div>
        </AppearOnScroll>
      </div>
    );
  }
}

export default FeaturesProduct;
