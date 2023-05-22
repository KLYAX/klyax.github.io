import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { AppearOnScroll, Icon } from "components/common";
import { FacilityList } from "components/layouts";
import { connect } from "react-redux";

import facilitiesRoute from "routes/facilities";
import { getFacilities } from "store/selectors/data";

const MAX_FACILITIES = 5;

class HomeOurFacilities extends Component {
  static propTypes = {};

  render() {
    const { t, facilities } = this.props;

    const fixedFacilities = facilities.slice(0, MAX_FACILITIES);

    return (
      <section className="our-facilities block-divider">
        <div className="our-facilities__inner">
          <header className="our-facilities__header">
            <div className="our-facilities__header-container container">
              <div className="our-facilities__header-inner row">
                <div className="our-facilities__title-container col-6 col-md-12 col-lg-5 offset-lg-4 order-0">
                  <AppearOnScroll>
                    <h2
                      className="our-facilities-header__title title title_section_primary"
                      dangerouslySetInnerHTML={{
                        __html: t("pages:home.our-facilities.title"),
                      }}
                    />
                  </AppearOnScroll>
                </div>
                <div className="our-facilities__view-all-container col-6 col-md-3 order-md-3 order-lg-1">
                  <AppearOnScroll>
                    <Link
                      to={facilitiesRoute.path}
                      className="our-facilities__view-all link link_normal link_with-arrow-icon link_primary link_accent"
                    >
                      {t("View all")}
                      <Icon
                        name="link-arrow-up"
                        className="our-facilities__view-all-icon link__arrow-icon"
                      />
                    </Link>
                  </AppearOnScroll>
                </div>
                <div className="our-facilities__description-container col-12 col-md-4 col-lg-3 col-lg-2 order-md-1 order-lg-2">
                  <AppearOnScroll>
                    <p
                      className="our-facilities__description text_description"
                      dangerouslySetInnerHTML={{
                        __html: t("pages:home.our-facilities.description"),
                      }}
                    />
                  </AppearOnScroll>
                </div>
                <div className="our-facilities__favorite-counter-container col-12 col-md-3 col-lg-8 offset-md-2 offset-lg-1 offset-xl-1 order-md-2 order-lg-3">
                  <AppearOnScroll>
                    <p className="our-facilities-header__favorite-works-counter text_accent">
                      {t("Selected works")} ({fixedFacilities.length}/250)
                    </p>
                  </AppearOnScroll>
                </div>
              </div>
            </div>
          </header>
          <div className="our-facilities__body">
            <FacilityList className="our-facilities__list" facilities={fixedFacilities} />

            <div className="our-facilities__container-with-all-facilities-link row container">
              <AppearOnScroll className="col-12 offset-xl-4 col-xl-auto">
                <Link
                  to={facilitiesRoute.path}
                  className=" link link_normal link_primary link_accent link_with-arrow-icon"
                >
                  {t("All facilities")}
                  <Icon name="link-arrow-up" className="link__arrow-icon" />
                </Link>
              </AppearOnScroll>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  facilities: getFacilities(state),
});

export default connect(mapStateToProps)(withTranslation()(HomeOurFacilities));
