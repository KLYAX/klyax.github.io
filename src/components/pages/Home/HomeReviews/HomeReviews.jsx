import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { SlideSwitch, Pagination, AppearOnScroll, RawHtml } from "components/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeReviewsSlider from "./HomeReviewsSlider";
import { IMAGES_PATH } from "config/path";

const reviews = [
  {
    author: {
      avatar: `${IMAGES_PATH}/avatars/1.png`,
      fullName: "pages:home.reviews.review.author.full-name",
      position: "pages:home.reviews.review.author.position",
    },
    review: "pages:home.reviews.review.text",
  },
  {
    author: {
      avatar: `${IMAGES_PATH}/facilities-previews/1.png`,
      fullName: "pages:home.reviews.review.author.full-name",
      position: "pages:home.reviews.review.author.position",
    },
    review: "pages:home.reviews.review.text",
  },
  {
    author: {
      avatar: `${IMAGES_PATH}/avatars/1.png`,
      fullName: "pages:home.reviews.review.author.full-name",
      position: "pages:home.reviews.review.author.position",
    },
    review: "pages:home.reviews.review.text",
  },
];

class HomeReviews extends Component {
  static propTypes = {
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSlideIndex: 0,
    };

    this.changeActiveSlide = this.changeActiveSlide.bind(this);
    this.sectionRef = createRef();
  }

  changeActiveSlide(index) {
    this.setState({
      activeSlideIndex: index,
    });
  }

  componentDidMount() {
    // gsap.set(this.sliderRef.current, {
    //   scrollTrigger: this.sliderRef.current,
    // });
  }

  render() {
    const { t } = this.props;
    const { activeSlideIndex } = this.state;

    return (
      <section ref={this.sectionRef} className="reviews block-divider">
        <div className="reviews__inner container">
          <header className="reviews__header">
            <div className="reviews__header-inner row">
              <div className="reviews__title-container col-6 col-md-4 col-xl-9 offset-xl-1 order-xl-1">
                <AppearOnScroll>
                  <RawHtml tag="h2" className="reviews__title title title_section_primary">
                    {t("pages:home.reviews.title")}
                  </RawHtml>
                </AppearOnScroll>
              </div>
              <div className="reviews__description-container col-6 col-md-4 col-xl-2 order-xl-0">
                <AppearOnScroll>
                  <RawHtml tag="p" className="reviews__description text_description">
                    {t("pages:home.reviews.description")}
                  </RawHtml>
                </AppearOnScroll>
              </div>
            </div>
          </header>
          <div className="reviews__body">
            <div className="reviews__body-inner row">
              <div className="reviews__controls col-3 col-md-12">
                <div className="reviews__controls-inner row">
                  <SlideSwitch
                    className="reviews__slide-switch col-12 col-md-4 col-xl-3"
                    verticalButtons={{ md: true }}
                    hideTimer={{ md: true }}
                  />
                  <div className="reviews__slider-pagination-container col-12 col-md-8 col-xl-9">
                    <AppearOnScroll>
                      <Pagination
                        current={activeSlideIndex + 1}
                        total={reviews.length}
                        className="reviews__slider-pagination"
                      />
                    </AppearOnScroll>
                  </div>
                </div>
              </div>
              <HomeReviewsSlider
                slides={reviews}
                activeSlideIndex={activeSlideIndex}
                changeActiveSlide={this.changeActiveSlide}
                className="reviews__slider col-12"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(HomeReviews);
