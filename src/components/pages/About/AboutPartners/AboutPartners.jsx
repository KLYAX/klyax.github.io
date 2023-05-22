import React from "react";
import PropTypes from "prop-types";
import { LogoCard, Cards, AppearOnScroll } from "components/common";
import { buildLogoImageSrc, buildSpecificImageSrc } from "utils/path";
import { isString } from "lodash";

const AboutPartners = ({ title, description, logos }) => {
  return (
    <section className="our-partners">
      <div className="our-partners__container container">
        <div className="our-partners__inner row">
          <header className="our-partners__header col-6 col-md-3 col-xl-12">
            <div className="our-partners__title-container">
              <AppearOnScroll>
                <h2 className="our-partners__title title title_section_secondary">{title}</h2>
              </AppearOnScroll>
            </div>
          </header>
          <div className="our-partners__subheader col-6 col-sm-4 offset-md-1 col-lg-3 col-xl-2 offset-xl-0">
            <div className="our-partners__caption-container">
              <AppearOnScroll>
                <p className="our-partners__caption text_description">{description}</p>
              </AppearOnScroll>
            </div>
          </div>
          <div className="our-partners__body col-12 col-xl-9 offset-xl-1">
            <Cards>
              {logos.map((logo, i) => {
                const image = logo || {
                  src: "",
                  alt: "",
                };

                if (!image.src) {
                  image.src = buildLogoImageSrc({
                    file: isString(image.file)
                      ? image.file
                      : {
                          ext: "png",
                          ...image.file,
                        },
                  });
                }

                return (
                  <LogoCard key={i} src={image.src} alt={image.alt} className="col-6 col-md-4" />
                );
              })}
            </Cards>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPartners.propTypes = {
  t: PropTypes.func,
};

export default AboutPartners;
