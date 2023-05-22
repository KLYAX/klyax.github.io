import React, { forwardRef, useMemo } from "react";
import FacilityHeroAbout from "./FacilityHeroAbout";
import { useTranslation, withTranslation } from "react-i18next";
import { RawHtml, ViewTransitionItem } from "components/common";
import { buildSpecificImageSrc, buildFacilityImageSrc } from "utils/path";
import { FACILITIES_IMAGES_PATH } from "config/path";
import isString from "lodash/isString";
import Text from "components/common/Text/Text";
import AppearOnViewTransition from "components/common/AppearOnViewTransition/AppearOnViewTransition";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

const FacilityHero = forwardRef(({ facility = {} }, ref) => {
  const { t } = useTranslation();

  const image = useMemo(() => {
    const logo = facility.image?.logo || {
      src: "",
      alt: "",
    };

    if (!logo.src) {
      logo.src = buildFacilityImageSrc({
        path: facility.id,
        file: isString(logo.file)
          ? logo.file
          : {
              name: "logo",
              ext: "png",
              ...logo.file,
            },
      });
    }

    if (!logo.alt) {
      logo.alt = facility.name;
    }

    const main = facility.image?.main || {
      src: "",
      alt: "",
    };

    if (!main.src) {
      main.src = buildFacilityImageSrc({
        path: facility.id,
        file: isString(main.file)
          ? main.file
          : {
              name: "main",
              ext: "jpg",
              ...main.file,
            },
      });
    }

    return {
      logo,
      main,
    };
  }, [facility]);

  return (
    <section ref={ref} className="facility block-divider">
      <div className="facility__inner row">
        <header className="facility__header col-12 col-xl-4">
          <div className="facility__header-line" />
          <div className="facility__header-inner container row sticky">
            <div className="facility__name-container container_overflow-hidden col-12 col-md-6 col-xl-12 order-xl-0">
              <h1 className="facility__name title title_hero title_uppercase">
                <Text>{facility.name}</Text>
              </h1>
            </div>
            <div className="facility__place-and-year-container col-12 col-md-6 col-xl-12 order-xl-2">
              <div className="facility__place-container container_overflow-hidden">
                <p className="facility__place text text_accent">
                  <Text>{facility.location}</Text>
                </p>
              </div>
              <div className="facility__year-container container_overflow-hidden">
                <p className="facility__year caption caption_primary">{facility.year} г.</p>
              </div>
            </div>
            <div className="facility__logo-container container_overflow-hidden col-12 col-md-6 col-xl-12 order-xl-1">
              <img src={image.logo.src} alt={t(image.logo.alt)} className="facility__logo" />
            </div>
          </div>
        </header>
        <div className="facility__body col-12 col-xl-8">
          <div className="facility__body-inner">
            <div className="facility__preview facility-preview container_overflow-hidden">
              <SlideUpOnScroll>
                <img
                  src={image.main.src}
                  alt={image.main.alt}
                  className="facility-preview__image image facility__image"
                />
              </SlideUpOnScroll>
            </div>
          </div>
          <FacilityHeroAbout facility={facility} />
        </div>
      </div>
    </section>
  );
});

export default FacilityHero;
