import { Footer, HeroHeader } from "components/layouts";
import React, { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { AppPageTransitionContext } from "App";

const PrivacyPolicy = () => {
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);

  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);

  useEffect(() => {
    const titleElem = heroTitleRef.current;
    const timeline = gsap.timeline({ defaults: { ease: "ease-out" } });

    timeline.add(getOverlayDisappearTween(), "+=0.2");

    timeline.from(titleElem, {
      yPercent: 100,
    });

    timeline.add(getHeaderAppearTimeline(), "<");

    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [getHeaderAppearTimeline, getOverlayDisappearTween, enableScroll]);

  return (
    <>
      <section ref={heroRef} className="privacy-policy hero">
        <div className="privacy-policy__container container">
          <div className="privacy-policy__inner">
            <header className="privacy-policy__header section-hero-header">
              <div className="privacy-policy__header-container container_overflow-hidden section-hero-header__container">
                <h1 ref={heroTitleRef} className="section-hero-header__title title title_hero">
                  Политика
                  <br />
                  конфиденциальности
                </h1>
              </div>
            </header>
            <div className="privacy-policy__body">
              <p>Nothing here yet</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
