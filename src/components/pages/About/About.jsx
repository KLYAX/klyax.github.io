import React, { useContext, useEffect, useRef } from "react";
import AboutHero from "./AboutHero/AboutHero";
import AboutAdvantages from "./AboutAdvantages/AboutAdvantages";
import AboutCredentials from "./AboutCredentials/AboutCredentials";
import AboutPartners from "./AboutPartners/AboutPartners";
import AboutManufacture from "./AboutManufacture/AboutManufacture";
import { Advantages, Footer } from "components/layouts";

import aboutPageData from "data/pages/about";
import gsap from "gsap";
import { AppPageTransitionContext } from "App";

const About = (props) => {
  const { lead, advantages, credentials, partners, manufacture } = aboutPageData;

  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);
  const heroRef = useRef(null);
  const advantagesRef = useRef(null);

  useEffect(() => {
    const heroElem = heroRef.current;
    const advantagesElem = advantagesRef.current;

    const timeline = gsap.timeline();

    const titleElem = heroElem.querySelector(".about-hero__title");
    const descriptionElem = heroElem.querySelector(".about-hero__subtitle");
    const targets = advantagesElem.querySelectorAll(".slide-up-on-scroll__target > *");

    // const filteredTargets = [...targets].filter(isInView);

    timeline.add(getOverlayDisappearTween(), "+=0.2");

    timeline.from(
      heroElem,
      {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6,
      },
      "-=0.4"
    );

    timeline.from([titleElem, descriptionElem], {
      yPercent: 100,
      stagger: 0.05,
    });

    timeline.add(getHeaderAppearTimeline(), ">");

    timeline.from(
      targets,
      {
        yPercent: 100,
        stagger: 0.05,
      },
      "<"
    );

    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [getHeaderAppearTimeline, enableScroll, getOverlayDisappearTween]);
  return (
    <>
      <AboutHero ref={heroRef} {...lead} />
      <Advantages
        innerRef={advantagesRef}
        title={advantages.title}
        subtitle={advantages.subtitle}
        slides={advantages.slides}
        className="about-our-advantages"
      />
      <AboutCredentials {...credentials} />
      <AboutPartners {...partners} />
      <AboutManufacture {...manufacture} />
      <Footer />
    </>
  );
};

export default About;
