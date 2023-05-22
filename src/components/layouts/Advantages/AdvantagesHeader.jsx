import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppearOnScroll, RawHtml, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

function AdvantagesHeader({ title, subtitle, className }) {
  return (
    <div className={classNames("advantages-header", className)}>
      <div className="advantages-header__inner row">
        <div className="advantages__title-container container_overflow-hidden col-12 col-md-4 col-xl-12">
          <SlideUpOnScroll>
            <p className="advantages__title title title_section_secondary">{title}</p>
          </SlideUpOnScroll>
        </div>

        {subtitle && (
          <div className="advantages__subtitle-container container_overflow-hidden col-12 col-md-2 col-xl-12">
            <SlideUpOnScroll>
              <p className="advantages__subtitle caption caption_secondary">{subtitle}</p>
            </SlideUpOnScroll>
          </div>
        )}
      </div>
    </div>
  );
}

AdvantagesHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default AdvantagesHeader;
