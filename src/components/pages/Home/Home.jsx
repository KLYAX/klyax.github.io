import React, { Component, useCallback, useContext, useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";

import HomeHero from "./HomeHero/HomeHero";
import HomeOurFacilities from "./HomeOurFacilities/HomeOurFacilities";
import HomePartners from "./HomePartners/HomePartners";
import HomeReviews from "./HomeReviews/HomeReviews";
import HomeFooter from "./HomeFooter/HomeFooter";
import { getHeaderTheme, getHomeHeroTheme, getProducts } from "store/selectors/app";
import { changeHeaderAndHomeHeroTheme } from "store/actions/app";
import { getFacilities } from "store/selectors/data";
import { AppPageTransitionContext } from "App";
import { BodyScrollContext } from "App";
import gsap from "gsap";

const Home = (props) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const productsCategories = useSelector(getProducts);
  const facilities = useSelector(getFacilities);
  const heroRef = useRef(null);

  const { enableScroll, disableScroll } = useContext(BodyScrollContext);

  const { getHeaderAppearTimeline, getOverlayDisappearTween } = useContext(
    AppPageTransitionContext
  );

  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = (timelineRef.current = gsap.timeline());
    const heroElem = heroRef.current;
    const heroFirstBackgroundSlideImageWrapper = heroElem.querySelector(
      ".home-hero-background-slider-slide__image-container"
    );
    const heroTransitionElems = heroElem.querySelectorAll(
      `
      .home-hero-nav__link-label,
      .home-hero-title-link__inner,
      .home-hero-sub-nav__link,
      .home-hero__description,
      .pagination__inner,
      .next-to-btn__dir-container,
      .next-to-btn__button-container`
    );

    timeline.add(getOverlayDisappearTween({ to: { duration: 0 } }), "+=0.2");

    timeline.from(heroFirstBackgroundSlideImageWrapper, {
      scale: 1.3,
      xPercent: 30,
      yPercent: 5,
      duration: 0.6,
      opacity: 0,
      ease: "ease-out",
    });

    timeline.from(heroTransitionElems, {
      yPercent: 100,
      duration: 0.6,
      stagger: 0.05,
      ease: "ease-out",
    });

    return () => {
      timeline.kill();
    };
  }, [enableScroll, getOverlayDisappearTween]);

  const changeProduct = useCallback((index) => {
    setActiveProductIndex(index);
  }, []);

  return (
    <>
      <HomeHero
        ref={heroRef}
        productsCategories={productsCategories}
        changeProduct={changeProduct}
        activeProductIndex={activeProductIndex}
      />
      <HomeOurFacilities facilities={facilities} />
      <HomePartners />
      {/* <HomeReviews /> */}
      <HomeFooter />
    </>
  );
};

export default Home;
