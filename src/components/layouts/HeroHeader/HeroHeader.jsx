import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppearOnScroll, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

const HeroHeader = forwardRef(({ titleRef, captionRef, title, caption, innerPadding }, ref) => {
  return (
    <header ref={ref} className="section-hero-header">
      <div
        className={classNames("section-hero-header__container", {
          container: innerPadding,
        })}
      >
        <div className="section-hero-header__inner row">
          <div className="section-hero-header__title-container container_overflow-hidden col-12 col-sm-6 col-xl-4">
            <SlideUpOnScroll>
              <h1
                ref={titleRef}
                className="section-hero-header__title title title_hero"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </SlideUpOnScroll>
          </div>

          {caption && (
            <div className="section-hero-header__caption-container container_overflow-hidden col-9 col-sm-6 col-md-4 col-xl-2">
              <SlideUpOnScroll>
                <p
                  ref={captionRef}
                  className="section-hero-header__caption caption"
                  dangerouslySetInnerHTML={{ __html: caption }}
                />
              </SlideUpOnScroll>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

HeroHeader.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  innerPadding: PropTypes.bool,
  t: PropTypes.func,
};

export default HeroHeader;
