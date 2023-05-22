import React, { Component, createRef } from "react";
import { Pagination, NextToBtn } from "components/common";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FeaturesProduct from "./FeaturesProduct";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

class Features extends Component {
  constructor(props) {
    super(props);

    this.featuresRef = createRef();
    this.featuresInnerRef = createRef();

    this.imageWrapperRef = createRef();
    this.arrowRef = createRef();
    this.productViewRef = createRef();

    this.descriptionContainerRef = createRef();
    this.featuresMainRef = createRef();

    this.contentElems = [];

    this.contentDescriptions = [];
    this.contentImages = [];

    this.state = {
      activeContentIndex: 0,
      animating: false,
      isScrollRevealActive: true,
    };

    this.headerEl = document.querySelector(".header");

    this.animating = false;
    this.timeline = gsap.timeline();

    this.changeContent = this.changeContent.bind(this);
    this.toggleScrollReveal = this.toggleScrollReveal.bind(this);

    this.handleWindowScroll = this.handleWindowScroll.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeContentIndex !== this.state.activeContentIndex) {
      const prevContentImage = this.contentImages[prevState.activeContentIndex];
      const nextContentImage = this.contentImages[this.state.activeContentIndex];

      const prevContentDescription = this.contentDescriptions[prevState.activeContentIndex];
      const nextContentDescription = this.contentDescriptions[this.state.activeContentIndex];

      const prevContentDescriptionElems = prevContentDescription.querySelectorAll(
        ".features-main-product-description__list .list__item-inner, .features-main-product-description__text-wrapper > *"
      );

      const nextContentDescriptionElems = nextContentDescription.querySelectorAll(
        ".features-main-product-description__list .list__item-inner, .features-main-product-description__text-wrapper > *"
      );

      const arrowEl = this.arrowRef.current;

      // прячем весь текст
      const hidePrevDescriptionTween = gsap.fromTo(
        prevContentDescriptionElems,
        {
          yPercent: 0,
        },
        {
          stagger: 0.15,
          yPercent: -100,
          duration: 0.4,
          force3D: true,
          willChange: "transform",
        }
      );

      // прячем картинку предыдущего устройства
      const hidePrevImageTween = gsap.fromTo(
        prevContentImage,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 0.9,
          opacity: 0,
        }
      );

      const hidePrevContentDescriptionTween = gsap.set(prevContentDescription, {
        visibility: "",
      });

      const showNextContentDescriptionTween = gsap.set(nextContentDescription, {
        visibility: "visible",
      });

      const hidePrevContentImageTween = gsap.set(prevContentImage, {
        display: "none",
      });

      const showNextContentImageTween = gsap.set(nextContentImage, {
        display: "",
      });

      const showNextImageTween = gsap.fromTo(
        nextContentImage,
        {
          scale: 1.1,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          onStart: () => {
            this.updateArrow();
          },
        }
      );

      const showNextDescriptionTween = gsap.fromTo(
        nextContentDescriptionElems,
        {
          yPercent: 100,
        },
        {
          stagger: 0.15,
          yPercent: 0,
          force3D: true,
          duration: 0.4,
          willChange: "transform",

          onComplete: () => {
            this.animating = false;
          },
        }
      );

      if (this.timeline.progress() === 1) {
        this.timeline.clear();
      }

      this.timeline.add(hidePrevDescriptionTween);
      this.timeline.add(hidePrevImageTween, "<");

      this.timeline.add(() => {
        arrowEl.classList.add("features-main-product-view-arrow_disappear");
      }, "<");

      this.timeline.add(hidePrevContentImageTween);
      this.timeline.add(hidePrevContentDescriptionTween, "<");

      this.timeline.add(() => {
        arrowEl.classList.remove(
          "features-main-product-view-arrow_appear",
          "features-main-product-view-arrow_disappear"
        );
      });

      this.timeline.add(showNextContentImageTween);
      this.timeline.add(showNextContentDescriptionTween, "<");

      this.timeline.add(showNextImageTween);

      this.timeline.add(() => {
        arrowEl.classList.add("features-main-product-view-arrow_appear");
      }, "<");

      this.timeline.add(showNextDescriptionTween, "<");
    }
  }

  toggleScrollReveal() {
    this.setState((state) => ({
      scrollRevealActive: !state.scrollRevealActive,
    }));
  }

  changeContent() {
    if (!this.animating) {
      this.setState((state, props) => {
        let nextContentIndex = state.activeContentIndex + 1;

        if (nextContentIndex >= props.content.length) {
          nextContentIndex = 0;
        }

        return {
          activeContentIndex: nextContentIndex,
        };
      });
    }
  }

  getContentIndex() {
    const featuresEl = this.featuresRef.current;
    const contentIndex = Math.floor(
      ((window.pageYOffset - featuresEl.offsetTop) / featuresEl.offsetHeight) *
        (this.props.content.length + 1)
    );

    const lastContentIndex = this.props.content.length - 1;

    if (contentIndex < 0) {
      return 0;
    } else if (contentIndex > lastContentIndex) {
      return lastContentIndex;
    }

    return contentIndex;
  }

  handleWindowScroll(e) {
    const contentIndex = this.getContentIndex();

    if (this.state.activeContentIndex !== contentIndex) {
      this.setState({
        activeContentIndex: contentIndex,
      });
    }
  }

  handleWindowResize(e) {
    this.updateArrow();
    this.updateHeight();
    this.updateScrollReveal();
  }

  updateScrollReveal() {
    const { isScrollRevealActive } = this.state;

    if (window.innerWidth >= 576) {
      if (isScrollRevealActive) {
        this.setState({
          isScrollRevealActive: false,
        });
      }
    } else {
      if (!isScrollRevealActive) {
        this.setState({
          isScrollRevealActive: true,
        });
      }
    }
  }

  initEventListeners() {
    window.addEventListener("scroll", this.handleWindowScroll);
    window.addEventListener("resize", this.handleWindowResize);
  }

  removeEventListeners() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  initContentElems() {
    if (this.props.content.length > 1) {
      for (let i = 0; i < this.props.content.length; ++i) {
        if (i !== this.state.activeContentIndex) {
          this.contentImages[i].style.display = "none";
        } else {
          this.contentDescriptions[i].style.visibility = "visible";
        }
      }

      this.updateHeight();
    }
  }

  updateHeight() {
    const featuresEl = this.featuresRef.current;
    const featuresInnerEl = this.featuresInnerRef.current;
    const featureMainEl = this.featuresMainRef.current;

    if (featureMainEl.offsetHeight + featureMainEl.offsetTop > window.innerHeight) {
      featuresEl.classList.add("features--all");

      ScrollTrigger.update();
    } else {
      if (featuresEl.classList.contains("features--all")) {
        featuresEl.classList.remove("features--all");
      }

      const descriptionWithMaxHeight = this.contentDescriptions.reduce((prev, curr) =>
        prev.offsetHeight > curr.offsetHeight ? prev : curr
      );

      gsap.set(this.contentDescriptions, {
        position: "",
      });

      gsap.set(descriptionWithMaxHeight, {
        position: "relative",
      });

      featuresEl.style.height =
        featuresInnerEl.offsetHeight * (this.props.content.length + 1) + "px";
    }
  }

  updateArrow() {
    const arrowElem = this.arrowRef.current;
    const imageWrapperElem = this.imageWrapperRef.current;
    const productViewElem = this.productViewRef.current;

    if (arrowElem && imageWrapperElem) {
      arrowElem.style.width =
        productViewElem.offsetWidth - imageWrapperElem.offsetWidth / 2 + 30 + "px";
    }
  }

  componentDidMount() {
    this.initEventListeners();
    this.initContentElems();

    this.updateScrollReveal();
    this.updateArrow();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  scrollToContent(contentIndex) {
    const featuresElem = this.featuresRef.current;

    const y =
      featuresElem.offsetTop +
      (contentIndex > 0
        ? featuresElem.offsetHeight / (this.props.content.length - contentIndex + 1)
        : 0);

    window.scrollTo(0, y);
  }

  render() {
    const { activeContentIndex, isScrollRevealActive } = this.state;
    const { title, label, about = [], content } = this.props;

    return (
      <section ref={this.featuresRef} className="features">
        <div ref={this.featuresInnerRef} className="features__inner container row">
          <div className="features__aside features-aside col-12 col-sm-4 col-md-2">
            {/* <div className="features-aside__header features-aside-header">
              <SlideUpOnScroll customTrigger={this.featuresRef} isActive={isScrollRevealActive}>
                <p className="features-aside-header__text text_tertiary">{label}</p>
              </SlideUpOnScroll>
            </div>
            <div className="features-aside__body features-aside-body">
              <SlideUpOnScroll customTrigger={this.featuresRef} isActive={isScrollRevealActive}>
                <p className="text_mono">{about[0]}</p>
              </SlideUpOnScroll>
              <br />
              <SlideUpOnScroll customTrigger={this.featuresRef} isActive={isScrollRevealActive}>
                <p className="text_mono">{about[1]}</p>
              </SlideUpOnScroll>
            </div> */}

            <div className="features-aside__bottom">
              <SlideUpOnScroll
                className="features-aside__pagination"
                customTrigger={this.featuresRef}
              >
                <Pagination total={content.length} current={this.state.activeContentIndex + 1} />
              </SlideUpOnScroll>
              <SlideUpOnScroll
                customTrigger={this.featuresRef}
                className="features-aside__next-to-btn"
              >
                <NextToBtn
                  labels={content.map((contentItem) => contentItem.name)}
                  activeIndex={activeContentIndex}
                  onChange={(index) => this.scrollToContent(index)}
                />
              </SlideUpOnScroll>
            </div>
          </div>

          <div
            ref={this.featuresMainRef}
            className="features__main features-main col-12 col-sm-8 col-md-9 offset-md-1"
          >
            <header className="features-main__header">
              <SlideUpOnScroll customTrigger={this.featuresRef} isActive={isScrollRevealActive}>
                <h2 className="features-main__title title title_section_secondary">{title}</h2>
              </SlideUpOnScroll>
            </header>

            <div className="features-main__body">
              <div className="features-main__product features-main-product row">
                <div
                  ref={this.productViewRef}
                  className="features-main-product-view features-main-product__view col-12 col-lg-5 col-xl-4"
                >
                  <div
                    ref={this.imageWrapperRef}
                    className="features-main-product-view__image-wrapper"
                  >
                    <div
                      ref={this.arrowRef}
                      className="features-main-product-view__arrow features-main-product-view-arrow features-main-product-view-arrow_appear"
                    >
                      <span className="features-main-product-view-arrow__line features-main-product-view-arrow__line_left"></span>
                      <span className="features-main-product-view-arrow__line features-main-product-view-arrow__line_top"></span>
                      <span className="features-main-product-view-arrow__line features-main-product-view-arrow__line_right"></span>
                    </div>
                    {content.map((contentItem, i) => (
                      <img
                        key={i}
                        ref={(el) => (this.contentImages[i] = el)}
                        className="features-main-product-view__image"
                        src={contentItem.image.src}
                        alt={contentItem.image.alt}
                      />
                    ))}
                  </div>
                </div>
                <div
                  ref={this.descriptionContainerRef}
                  className="features-main-product-content col-12 col-lg-7 col-xl-8"
                >
                  {content.map((contentItem, i) => (
                    <div
                      key={i}
                      ref={(el) => (this.contentDescriptions[i] = el)}
                      className="features-main-product__description features-main-product-description"
                    >
                      <ul className="features-main-product-description__list list">
                        {contentItem.features.map((item, i) => (
                          <div key={i} className="list__item-container container_overflow-hidden">
                            <SlideUpOnScroll customTrigger={this.featuresRef}>
                              <div className="list__item-inner">{item}</div>
                            </SlideUpOnScroll>
                          </div>
                        ))}
                      </ul>

                      <div className="features-main-product-description__text-wrapper container_overflow-hidden">
                        <SlideUpOnScroll customTrigger={this.featuresRef}>
                          <p className="features-main-product-description__text text_tertiary text_sm">
                            {contentItem.about}
                          </p>
                        </SlideUpOnScroll>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="features-main__body features-main__body--mobile">
              <ul className="features-main__product-list list">
                {content.map((contentItem, i) => (
                  <li key={i} className="features-main__product features-main-product row">
                    <div className="features-main-product-view features-main-product__view col-12 col-lg-5 col-xl-4">
                      <FeaturesProduct image={contentItem.image} />
                    </div>

                    <div className="features-main-product__description features-main-product-description col-12 col-lg-7 col-xl-8">
                      <ul className="features-main-product-description__list list">
                        {contentItem.features.map((item, i) => (
                          <div key={i} className="list__item-container container_overflow-hidden">
                            <SlideUpOnScroll>
                              <div className="list__item-inner">{item}</div>
                            </SlideUpOnScroll>
                          </div>
                        ))}
                      </ul>

                      <SlideUpOnScroll>
                        <p className="features-main-product-description__text text_tertiary text_sm">
                          {contentItem.about}
                        </p>
                      </SlideUpOnScroll>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Features;
