import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppearOnScroll, List, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

const AdvantagesSliderSlide = ({ label, content, className }) => {
  const bodyContent = Array.isArray(content.body) ? content.body : [content.body];
  const footerContent = Array.isArray(content.footer) ? content.footer : [content.footer];

  return (
    <li
      className={classNames(
        "advantages-slider__slide advantages-slider-slide swiper-slide",
        className
      )}
    >
      <div className="advantages-slider-slide__inner">
        <div className="advantages-slider-slide__header">
          <div className="advantages-slider-slide__title-container container_overflow-hidden">
            <div className="swiper-content-slide-up-effect">
              <SlideUpOnScroll>
                <h3 className="advantages-slider-slide__title title title_uppercase">{label}</h3>
              </SlideUpOnScroll>
            </div>
          </div>
        </div>
        <div className="advantages-slider-slide__body">
          {bodyContent.map((bodyContentItem, i) => (
            <div
              key={i}
              className="advantages-slider-slide__text-container container_overflow-hidden"
            >
              {Array.isArray(bodyContentItem) ? (
                bodyContentItem.map((listItem, i) => (
                  <ul key={i} className={classNames("list", className)}>
                    <li key={i} className="list__item swiper-content-slide-up-effect">
                      <SlideUpOnScroll>
                        <div className="list__item-container container_overflow-hidden">
                          <div className="list__item-inner">{listItem}</div>
                        </div>
                      </SlideUpOnScroll>
                    </li>
                  </ul>
                ))
              ) : (
                <div className="swiper-content-slide-up-effect">
                  <SlideUpOnScroll>
                    <p className="advantages-slider-slide__text">{bodyContentItem}</p>
                  </SlideUpOnScroll>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="advantages-slider-slide__footer">
          {footerContent.map((footerContentItem, i) => (
            <div
              key={i}
              className="advantages-slider-slide__gost-container container_overflow-hidden"
            >
              <div className="swiper-content-slide-up-effect">
                <SlideUpOnScroll>
                  <p
                    className="advantages-slider-slide__gost"
                    dangerouslySetInnerHTML={{ __html: footerContentItem }}
                  />
                </SlideUpOnScroll>
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

AdvantagesSliderSlide.propTypes = {
  label: PropTypes.string,
  body: PropTypes.arrayOf(PropTypes.string),
  footer: PropTypes.arrayOf(PropTypes.string),
};

export default AdvantagesSliderSlide;
