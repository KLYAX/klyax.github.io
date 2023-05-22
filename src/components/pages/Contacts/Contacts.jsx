import React, { Component, useContext, useEffect, useRef } from "react";
import ContactsHero from "./ContactsHero/ContactsHero";
import ContactsMaps from "./ContactsMaps/ContactsMaps";
import { Copyright } from "components/layouts";
import { AppPageTransitionContext } from "App";
import gsap from "gsap";
import { isInView } from "utils/dom";

const Contacts = () => {
  const heroRef = useRef(null);
  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "ease-out", duration: 0.6 } });
    const heroElem = heroRef.current;

    const header = heroElem.querySelector(".tabs__header");

    const titleElem = heroElem.querySelector(".section-hero-header__title");
    const contactsElems = heroElem.querySelectorAll(".contacts-main .slide-up-on-scroll__target");
    const requisitesElems = heroElem.querySelectorAll(
      ".contacts-requisites .slide-up-on-scroll__target"
    );

    const cardsContainerElem = heroElem.querySelector(".cards");
    const cardsContainerTargetsElems = cardsContainerElem.querySelectorAll(
      ".container_overflow-hidden > *"
    );

    /* tabs header */
    const tabsHeaderElem = heroElem.querySelector(".tabs__header");
    const tabsHeaderControlsContainerElems = tabsHeaderElem.querySelectorAll(
      ".tabs__control-container"
    );
    const tabsHeaderSlidingLineElem = tabsHeaderElem.querySelector(".tabs__sliding-line");

    timeline.add(getOverlayDisappearTween(), "+=0.2");

    timeline.from(titleElem, {
      yPercent: 100,
    });

    if (isInView(tabsHeaderElem)) {
      timeline.from(tabsHeaderElem, {
        transformOrigin: "left",
        scaleX: 0,
      });

      timeline.from(tabsHeaderControlsContainerElems, {
        stagger: 0.15,
        yPercent: 100,
        ease: "ease-out",
      });

      timeline.from(tabsHeaderSlidingLineElem, {
        yPercent: 100,
        ease: "ease-out",
      });
    }

    timeline.from(
      contactsElems,
      {
        yPercent: 100,
      },
      "<"
    );

    timeline.from(
      cardsContainerElem,
      {
        opacity: 0,
      },
      "-=0.4"
    );

    timeline.from(
      cardsContainerTargetsElems,
      {
        yPercent: 100,
        stagger: 0.05,
      },
      "-=0.4"
    );

    timeline.from(
      requisitesElems,
      {
        yPercent: 100,
        stagger: 0.05,
      },
      "<"
    );

    timeline.add(getHeaderAppearTimeline(), "<");
    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [enableScroll, getOverlayDisappearTween, getHeaderAppearTimeline]);

  return (
    <>
      <ContactsHero ref={heroRef} />
      <ContactsMaps />
      <Copyright as="footer" innerPadding={true} />
    </>
  );
};

export default Contacts;
