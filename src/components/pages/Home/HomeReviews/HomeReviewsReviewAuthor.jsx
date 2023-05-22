import PropTypes from "prop-types";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import { AppearOnScroll, RawHtml } from "components/common";

/**
 * Компонент создает автора отзыва
 *
 * @param {object} props
 * @param {object|string} props.avatar - Аватар автора
 * @param {string} props.fullName - Полное имя автора
 * @param {string} props.position - Должность автора
 * @param {string} props.className - Класс
 */
function HomeReviewsReviewAuthor({ avatar, fullName, position, className, t }) {
  if (typeof avatar === "string") {
    avatar = {
      src: avatar,
      alt: fullName,
    };
  }

  return (
    <div className={classNames("reviews-review-author", className)}>
      <div className="reviews-review-author__inner row">
        <div className="reviews-review-author__avatar-container col-8 col-md-7 col-xl-6">
          <div className="reviews-review-author__avatar reviews-review-author-avatar">
            <AppearOnScroll className="reviews-review-author__avatar-inner">
              <img
                src={avatar.src}
                alt={t(avatar.alt)}
                className="reviews-review-author__avatar-image"
              />
            </AppearOnScroll>
          </div>
        </div>
        <div className="reviews-review-author__full-name-container col-12 col-md-12">
          <div className="swiper-content-slide-up-effect">
            <AppearOnScroll>
              <RawHtml tag="p" className="reviews-review-author__full-name text_accent">
                {t(fullName)}
              </RawHtml>
            </AppearOnScroll>
          </div>
        </div>
        <div className="reviews-review-author__position-container col-12 col-md-6 col-xl-7">
          <div className="swiper-content-slide-up-effect">
            <AppearOnScroll>
              <RawHtml
                tag="p"
                className="reviews-review-author__position text_caption text_primary"
              >
                {t(position)}
              </RawHtml>
            </AppearOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

HomeReviewsReviewAuthor.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      str: PropTypes.string,
      alt: PropTypes.string,
    }),
  ]),
  fullName: PropTypes.string,
  position: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation()(HomeReviewsReviewAuthor);
