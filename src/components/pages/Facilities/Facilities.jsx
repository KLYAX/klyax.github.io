import React, { useContext, useEffect, useRef, useState } from "react";
import FacilitiesHero from "./FacilitiesHero/FacilitiesHero";
import { FacilityList, Footer, HeroHeader } from "components/layouts";
import { connect } from "react-redux";
import { getFacilities } from "store/selectors/data";
import { AppPageTransitionContext } from "App";
import gsap from "gsap";
import { isInView } from "utils/dom";
import { Loader } from "components/common";
import { useTranslation } from "react-i18next";

const Facilities = ({ facilities }) => {
  const [isRevealOnScrollActive, setIsRevealOnScrollActive] = useState(false);
  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);
  const heroRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const heroElem = heroRef.current;
    const timeline = gsap.timeline({ defaults: { ease: "ease-out", duration: 0.6 } });
    const titleElem = heroElem.querySelector(".section-hero-header__title");
    const descriptionElem = heroElem.querySelector(".section-hero-header__caption");

    const facilitiesElems = heroElem.querySelectorAll(".facility-list-item");
    const facilitiesInViewElems = Array.from(facilitiesElems).filter(isInView);

    const targets = heroElem.querySelectorAll(".facility-list .container_overflow-hidden > *");
    const filteredTargets = [...targets].filter(isInView);
    const linesElems = heroElem.querySelectorAll(".facility-list .facility-list-item__line");

    timeline.add(getOverlayDisappearTween(), "+=0.2");
    timeline.from([titleElem, descriptionElem], {
      yPercent: 100,
      stagger: 0.05,
    });

    timeline.add(getHeaderAppearTimeline());

    facilitiesInViewElems.forEach((facility, i) => {
      const facilityTimeline = gsap.timeline({ defaults: { ease: "ease-out" } });

      const facilityHeader = facility.querySelector(".facility-list-item__header > *");
      const facilityName = facility.querySelector(".facility-list-item__name-container > *");
      const facilityPlace = facility.querySelector(".facility-list-item__place-container > *");
      const facilityLogo = facility.querySelector(".facility-list-item__logo-container > *");
      const facilityLink = facility.querySelector(".facility-list-item__link-container > *");

      const facilityLineElem = facility.querySelector(".facility-list-item__line");

      const facilityElems = [
        facilityHeader,
        facilityName,
        facilityPlace,
        facilityLogo,
        facilityLink,
      ];

      facilityTimeline.from(facilityLineElem, {
        delay: 0.3 * i,
        transformOrigin: "left",
        scaleX: 0,
        duration: facilityElems.length * 0.15 - 0.15 + 0.6,
      });

      facilityTimeline.from(
        facilityElems,
        {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.15,
        },
        "<"
      );

      timeline.add(facilityTimeline, "<");
    });

    // timeline.fromTo(
    //   linesElems,
    //   {
    //     scaleX: 0,
    //   },
    //   {
    //     scaleX: 1,
    //     transformOrigin: "left",
    //     duration: 0.8,
    //     stagger: 0.3,
    //   },
    //   "<"
    // );

    // timeline.from(
    //   filteredTargets,
    //   {
    //     yPercent: 100,
    //     stagger: 0.05,
    //   },
    //   "<"
    // );

    timeline.add(() => setIsRevealOnScrollActive(true));

    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [getHeaderAppearTimeline, enableScroll, getOverlayDisappearTween]);

  return (
    <>
      <section ref={heroRef} className="facilities hero block-divider">
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
                <FacilityList
                  isRevealOnScrollActive={isRevealOnScrollActive}
                  facilities={facilities}
                  className="facilities__list"
                />
              </div>
              <div className="facilities__loader-container">
                <Loader className="facilities__loader" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  facilities: getFacilities(state),
});

export default connect(mapStateToProps)(Facilities);
