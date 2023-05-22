import React from "react";
import PropTypes from "prop-types";
import { AppearOnScroll, RawHtml, ViewTransitionItem } from "components/common";
import Text from "components/common/Text/Text";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

function FacilityHeroAboutGroup({ title, children }) {
  return (
    <div className="facility-about__group">
      <div className="facility-about__group-inner row container">
        <div className="facility-about__header col-9 col-md-3">
          <SlideUpOnScroll>
            <h3 className="facility-about__title">
              <Text>{title}</Text>
            </h3>
          </SlideUpOnScroll>
        </div>
        <div className="facility-about__body col-12 col-md-8 offset-md-1">{children}</div>
      </div>
    </div>
  );
}

FacilityHeroAboutGroup.propTypes = {};

export default FacilityHeroAboutGroup;
