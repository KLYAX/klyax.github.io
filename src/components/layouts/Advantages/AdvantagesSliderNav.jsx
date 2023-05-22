import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppearOnScroll, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

function AdvantagesSliderNav({ nav, className, activeSlideIndex, changeActiveSlide }) {
  return (
    <nav className={classNames("advantages__nav advantages-nav nav", className)}>
      <ul className="nav__list nav__list_vertical list">
        {nav.map((label, i) => (
          <li key={i} className="nav__item">
            <SlideUpOnScroll>
              <button
                className={classNames("button nav__link", {
                  active: activeSlideIndex === i,
                })}
                onClick={() => {
                  changeActiveSlide(i);
                }}
              >
                <span className="nav__link-label">{label}</span>
              </button>
            </SlideUpOnScroll>
          </li>
        ))}
      </ul>
    </nav>
  );
}

AdvantagesSliderNav.propTypes = {
  nav: PropTypes.arrayOf(PropTypes.string),
};

export default AdvantagesSliderNav;
