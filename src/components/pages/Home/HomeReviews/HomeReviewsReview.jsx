import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import HomeReviewsReviewAuthor from "./HomeReviewsReviewAuthor";
import { AppearOnScroll, RawHtml } from "components/common";

/**
 * Компонент рендерит отзыв
 *
 * @param {object} props
 * @param {object} props.author - Автор отзыва
 * @param {string} props.review - Отзыв
 */
function HomeReviewsReview({ author, review, t }) {
  return (
    <div className="home-reviews-review">
      <div className="home-reviews-review__inner row">
        <HomeReviewsReviewAuthor {...author} className="col-9 col-md-4 col-xl-3" />
        <div className="reviews-review__content-container col-12 col-md-8 col-xl-9">
          <div className="swiper-content-slide-up-effect">
            <AppearOnScroll>
              <RawHtml tag="p" className="reviews-review__content">
                {t(review)}
              </RawHtml>
            </AppearOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

HomeReviewsReview.propTypes = {
  author: PropTypes.object,
  review: PropTypes.string,
};

export default withTranslation()(HomeReviewsReview);
