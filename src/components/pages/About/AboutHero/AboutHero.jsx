import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AppearOnScroll, ViewTransitionItem } from "components/common";
import gsap from "gsap";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

/**
 * Создает секцию хиро страницы "О компании"
 *
 * @param {Object} props
 */
const AboutHero = forwardRef(({ title, description }, ref) => {
  return (
    <section ref={ref} className="about-hero block-divider hero">
      <div className="about-hero__container container">
        <div className="about-hero__inner">
          <header className="about-hero__header">
            <div className="about-hero__header-inner row">
              <div className="about-hero__title-container container_overflow-hidden col-12 col-md-4 col-xl-3">
                <SlideUpOnScroll>
                  <h1 className="about-hero__title title title_shrink">{title}</h1>
                </SlideUpOnScroll>
              </div>
              <div className="about-hero__subtitle-container container_overflow-hidden col-12 col-md-8 col-xl-9">
                <SlideUpOnScroll>
                  <p className="about-hero__subtitle title title_uppercase title_shrink">
                    {description}
                  </p>
                </SlideUpOnScroll>
              </div>
            </div>
          </header>
        </div>
      </div>
    </section>
  );
});

AboutHero.propTypes = {
  t: PropTypes.func,
};

export default AboutHero;
