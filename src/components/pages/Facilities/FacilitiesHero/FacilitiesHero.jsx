import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { HeroHeader } from "components/layouts";
import { FacilityList } from "components/layouts";
import { withTranslation } from "react-i18next";
import { Loader } from "components/common";

const FacilitiesHero = forwardRef(({ facilities, t }, ref) => {
  return (
    <section ref={ref} className="facilities hero block-divider">
      <div className="facilities__inner">
        <HeroHeader
          title={t("pages:facilities.hero.title")}
          caption={t("pages:facilities.hero.description")}
          innerPadding={true}
          className="facilities__header"
        />
        <div className="facilities__body">
          <div className="facilities__body-inner">
            <div className="facilities__list-container">
              <FacilityList facilities={facilities} className="facilities__list" />
            </div>
            <div className="facilities__loader-container">
              <Loader className="facilities__loader" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FacilitiesHero.propTypes = {};

export default withTranslation()(FacilitiesHero);
