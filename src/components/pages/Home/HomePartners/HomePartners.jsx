import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { AppearOnScroll, Cards, LogoCard } from "components/common";
import partners from "data/partners";
import { buildLogoImageSrc } from "utils/path";
import { isString } from "lodash";

class HomePartners extends Component {
  static propTypes = {};

  render() {
    const { t } = this.props;

    return (
      <section className="partners block-divider">
        <div className="partners__inner container row">
          <header className="partners__header partners-header col-12 col-md-4 col-xl-12">
            <div className="partners__title-container container_overflow-hidden">
              <AppearOnScroll>
                <h2
                  className="partners__title title title_section_primary"
                  dangerouslySetInnerHTML={{
                    __html: t("pages:home.partners.title"),
                  }}
                />
              </AppearOnScroll>
            </div>
          </header>
          <div className="partners__subheader col-9 col-md-4 col-lg-3 col-xl-2">
            <AppearOnScroll>
              <p
                className="partners__description text_description"
                dangerouslySetInnerHTML={{
                  __html: t("pages:home.partners.description"),
                }}
              />
            </AppearOnScroll>
          </div>
          <div className="partners__body col-12 col-xl-9 offset-xl-1">
            <Cards className="partners-cards__list">
              {partners.map((partner, i) => {
                const logo = partner.logo || { src: "", alt: "" };

                if (!logo.src) {
                  logo.src = buildLogoImageSrc({
                    file: isString(logo.file)
                      ? logo.file
                      : {
                          name: partner.id,
                          ext: "png",
                          ...partner.file,
                        },
                  });
                }

                return <LogoCard key={i} {...logo} className="col-6 col-md-4" />;
              })}
            </Cards>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(HomePartners);
