import React, { Component, useContext, useEffect, useMemo, useRef } from "react";

import FacilityHero from "./FacilityHero/FacilityHero";
import { Footer } from "components/layouts";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getFacilities } from "store/selectors/data";
import notFoundRoute from "routes/notFound";
import { AppPageTransitionContext } from "App";
import gsap from "gsap";

const Facility = () => {
  const facilities = useSelector(getFacilities);
  const params = useParams();
  const heroRef = useRef();
  const { enableScroll, getHeaderAppearTimeline, getOverlayDisappearTween } = useContext(
    AppPageTransitionContext
  );

  const facility = useMemo(() => {
    return facilities.find((facility) => facility.id === params.facilityId);
  }, [facilities, params]);

  useEffect(() => {
    if (!facility) {
      return;
    }

    const heroElem = heroRef.current;
    const facilityNameElem = heroElem.querySelector(".facility__name");
    const facilityLogoElem = heroElem.querySelector(".facility__logo");
    const facilityPlaceElem = heroElem.querySelector(".facility__place");
    const facilityYearElem = heroElem.querySelector(".facility__year");

    const facilityAboutTitle = heroElem.querySelector(".facility-about__title");
    const facilityPreviewImage = heroElem.querySelector(".facility-preview__image");
    const facilityMainContentElem = heroElem.querySelector(
      ".facility-about__main > .slide-up-on-scroll > .slide-up-on-scroll__target > .raw-html"
    );

    const facilityHeaderLine = heroElem.querySelector(".facility__header-line");
    const facilityAboutImage = heroElem.querySelector(".facility-about__image");

    const timeline = gsap.timeline({ defaults: { ease: "ease-out", duration: 0.6 } });

    timeline.add(getOverlayDisappearTween());
    timeline.add(getHeaderAppearTimeline());

    timeline.from(facilityHeaderLine, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
    });

    timeline.from(
      [facilityNameElem, facilityLogoElem, facilityPlaceElem, facilityYearElem],
      {
        yPercent: 100,
        stagger: 0.3,
      },
      "<"
    );

    timeline.from(
      facilityPreviewImage,
      {
        y: 50,
        opacity: 0,
      },
      "<"
    );

    timeline.from(
      [facilityAboutTitle, facilityMainContentElem],
      {
        yPercent: 100,
        stagger: 0.15,
      },
      ">"
    );

    timeline.from(
      facilityAboutImage,
      {
        y: 50,
        opacity: 0,
      },
      ">"
    );

    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [enableScroll, getOverlayDisappearTween, getHeaderAppearTimeline]);

  return facility ? (
    <>
      <FacilityHero ref={heroRef} facility={facility} />
      <Footer />
    </>
  ) : (
    <Redirect to={notFoundRoute.path} />
  );
};

export default Facility;
