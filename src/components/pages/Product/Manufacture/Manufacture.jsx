import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { AppearOnScroll, Gallery, List, RawHtml, SlideSwitch } from "components/common";
import Swiper from "utils/libs/swiper";
import { withTranslation } from "react-i18next";
import { buildSpecificImageSrc } from "utils/path";
import { PRODUCT_IMAGES_PATH } from "config/path";
import FancyboxImg from "components/common/Fancybox/FancyboxImg";
import Fancybox from "components/common/Fancybox/Fancybox";

class Manufacture extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = createRef();
  }

  initSlider() {
    const sliderEl = this.sliderRef.current;

    this._slider = new Swiper(sliderEl, {
      observeParents: true,
      observer: true,
      slidesPerView: 1,
      speed: 800,
      autoplayScrollTrigger: true,
      autoplay: {
        delay: 11000,
        disableOnInteraction: false,
      },
      grabCursor: true,
      timer: {
        selector: ".manufacture__slide-switcher .slide-switch__timer",
      },
      navigation: {
        prevEl: ".manufacture__slide-switcher .slide-switch__button_prev",
        nextEl: ".manufacture__slide-switcher  .slide-switch__button_next",
        disabledClass: "slide-switch__button_disabled",
      },
      breakpoints: {
        576: {
          slidesPerView: "auto",
          spaceBetween: 12,
        },
      },
      on: {
        beforeResize: (swiper) => {
          // Фиксит ширину слайдов при переходе с ширины экрана 576px
          if (window.innerWidth >= 576) {
            swiper.slides.css("width", "");
          }
        },
      },
    });
  }

  componentDidMount() {
    this.initSlider();
  }

  render() {
    const { category, t } = this.props;

    const categoryGallery = category.pageContent?.product?.gallery || [];

    const slides = categoryGallery.map((galleryItem, i) => {
      const slide = {
        alt: galleryItem.alt,
        src:
          galleryItem.src ||
          buildSpecificImageSrc(
            `${category.id}/gallery`,
            {
              ...galleryItem,
              name: i + 1,
            },
            {
              ext: "jpg",
              path: PRODUCT_IMAGES_PATH,
            }
          ),
      };

      return slide;
    });

    return (
      <section className="manufacture block-divider">
        <div className="manufacture__inner">
          <div className="manufacture__main manufacture-main container">
            <div className="manufacture-main__header ">
              <AppearOnScroll>
                <RawHtml tag="h2" className="title title title_section_secondary">
                  {t("pages:product.manufacture.title")}
                </RawHtml>
              </AppearOnScroll>
            </div>
            <div className="manufacture-main__body manufacture-main-body row">
              <SlideSwitch
                hideTimer={{ sm: true }}
                className="manufacture__slide-switcher order-1 order-sm-0 col-12 col-sm-4 col-md-4 col-lg-4"
              />
              {/* <div className="manufacture__description manufacture-description container_overflow-hidden order-0 order-sm-1 col-9 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <AppearOnScroll>
                  <RawHtml tag="p" className="manufacture-description__text text_tertiary">
                    {t("pages:product.manufacture.description")}
                  </RawHtml>
                </AppearOnScroll>
              </div> */}
            </div>
          </div>
          <Fancybox className="manufacture__view manufacture-view">
            <AppearOnScroll
              overflow={false}
              group={true}
              vars={{ stagger: 0.15, duration: 0.6 }}
              target=".manufacture-view-slider__image"
            >
              <div
                ref={this.sliderRef}
                className="manufacture-view__slider manufacture-view-slider swiper-container"
              >
                <List
                  className="manufacture-view-slider__slides swiper-wrapper"
                  itemClassName="manufacture-view-slider__slide swiper-slide"
                  items={slides}
                >
                  {(slide, i) => (
                    <FancyboxImg
                      src={slide.src}
                      alt={slide.alt}
                      group="product-manufacture-gallery"
                      thumbnailClassName="manufacture-view-slider__image"
                    />
                  )}
                </List>
              </div>
            </AppearOnScroll>
          </Fancybox>
        </div>
      </section>
    );
  }
}

Manufacture.propTypes = {};

export default withTranslation()(Manufacture);
