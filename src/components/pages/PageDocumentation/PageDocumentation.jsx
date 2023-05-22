import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "components/layouts";
import { HeroHeader } from "components/layouts";
import { Tabs, Tab, Cards, DocCard } from "components/common";
import DocumentationCardGroup from "./PageDocumentationCardGroup";
import notFoundRoute from "routes/notFound";

import isObject from "lodash/isObject";
import isArray from "lodash/isArray";

import gsap from "gsap";

import documentationPageData from "data/pages/documentation";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";
import { AppPageTransitionContext } from "App";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  generatePath,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { isInView } from "utils/dom";

const PageDocumentation = (props) => {
  const { title, description, tabs } = documentationPageData;
  const { documentationId } = useParams();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const activeDocumentation = useMemo(() => {
    if (documentationId) {
      return tabs.find((tab) => tab.id === documentationId);
    }

    return tabs[0];
  }, [documentationId, tabs]);

  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);
  const timelineRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const captionRef = useRef(null);
  const tabsRef = useRef(null);
  const tabRef = useRef(null);

  const tabsLabels = tabs.map((tab) => tab.label);

  useEffect(() => {
    if (!activeDocumentation) {
      return;
    }

    const tabsElem = tabsRef.current;
    const tabElem = tabRef.current;
    const titleElem = titleRef.current;
    const captionElem = captionRef.current;

    const timeline = (timelineRef.current = gsap.timeline({
      defaults: { ease: "ease-out", duration: 0.5 },
    }));

    timeline.add(getOverlayDisappearTween(), "+=0.2");

    timeline.addLabel("startAppear", "-=0.6");

    timeline.from([titleElem, captionElem], {
      yPercent: 100,
      stagger: 0.2,
    });

    // show header line
    timeline.from(
      tabsElem.querySelector(".tabs__header"),
      {
        transformOrigin: "left",
        scaleX: 0,
        duration: 0.2,
      },
      "<"
    );

    timeline.from(
      tabsElem.querySelectorAll(".tabs__control-container, .documentation__group-caption"),
      {
        yPercent: 100,
        stagger: 0.2,
      },
      ">"
    );

    const cardsElem = tabElem.querySelector(".cards");

    timeline.from(
      cardsElem,
      {
        opacity: 0,
        duration: 0.5,
      },
      "<"
    );

    timeline.from(tabsElem.querySelector(".tabs__sliding-line"), {
      y: (_, target) => target.offsetHeight,
    });

    timeline.from(
      [...cardsElem.querySelectorAll(".container_overflow-hidden > * > *")].filter(isInView),
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.4,
      },
      "<"
    );

    timeline.add(getHeaderAppearTimeline(), "<");

    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [enableScroll, getHeaderAppearTimeline, getOverlayDisappearTween]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const handleDocumentationChange = useCallback(
    (documentationId) => {
      if (activeDocumentation.id === documentationId) {
        return;
      }

      const path = generatePath(match.path, {
        documentationId,
      });

      history.replace(path);
    },
    [activeDocumentation, history, match]
  );

  return activeDocumentation ? (
    <>
      <section className="documentation block-divider hero">
        <div className="documentation__inner">
          <header ref={headerRef} className="section-hero-header">
            <div className="section-hero-header__container container">
              <div className="section-hero-header__inner row">
                <div className="section-hero-header__title-container col-12 col-sm-6 col-xl-4">
                  <SlideUpOnScroll>
                    <h1 ref={titleRef} className="section-hero-header__title title title_hero">
                      {title}
                    </h1>
                  </SlideUpOnScroll>
                </div>
              </div>
            </div>
          </header>

          <div className="documentation__body">
            <div className="documentation__body-inner">
              <Tabs
                ref={tabsRef}
                tabRef={tabRef}
                onChange={handleDocumentationChange}
                activeTabId={activeDocumentation.id}
                innerPadding={true}
                headerScroll={{ md: true }}
                controls={tabsLabels}
                className="documentation__tabs"
              >
                {tabs.map(({ content, id, label }, i) => (
                  <Tab id={id} label={label} key={content}>
                    <div className="documentation__tech-docs documentation-tech-docs">
                      <div className="documentation-tech-docs__inner">
                        {isArray(content) ? (
                          <ul className="documentation-tech-docs__list list">
                            {content.map((data, l) => {
                              let cards = data.cards;

                              // заполняем карточки дефолтными значениями если они есть
                              if (isObject(data.cards) && isArray(data.cards.data)) {
                                if (data.cards.default) {
                                  cards = data.cards.data.map((card) => ({
                                    ...data.cards.default,
                                    ...card,
                                  }));
                                } else {
                                  cards = data.cards.data;
                                }
                              }

                              return (
                                <DocumentationCardGroup key={l} label={data.label} cards={cards} />
                              );
                            })}
                          </ul>
                        ) : (
                          <Cards className="documentation-tech-docs-item__cards ">
                            {content.cards.map((card, i) => (
                              <DocCard
                                key={i}
                                title={card.title}
                                caption={card.caption}
                                subtitle={card.subtitle}
                                preview={card.preview}
                                file={card.file}
                                className="documentation-tech-docs-item__card col-12 col-md-6 col-lg-4 col-xl-3"
                              />
                            ))}
                          </Cards>
                        )}
                      </div>
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  ) : (
    <Redirect to={notFoundRoute.path} />
  );
};

export default PageDocumentation;
