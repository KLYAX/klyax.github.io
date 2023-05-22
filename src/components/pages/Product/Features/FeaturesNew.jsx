import React, { Component, createRef, useEffect, useRef } from "react";
import { Pagination, NextToBtn } from "components/common";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FeaturesProduct from "./FeaturesProduct";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";
import List from "components/common/List/List";

const Features = ({ isScrollRevealActive, title, content = [] }) => {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const galleryItemsRef = useRef([]);

  useEffect(() => {
    const sectionElem = sectionRef.current;
    const galleryItemsElems = galleryItemsRef.current;
    const timeline = gsap.timeline({ duration: 0.6 });

    let prevActiveGalleryItem = null;

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionElem,
      start: "top top",
      end: "bottom bottom",

      onUpdate: (sr) => {
        const activeGalleryItemIndex = Math.floor(sr.progress * galleryItemsElems.length);
        const activeGalleryItem = galleryItemsElems[activeGalleryItemIndex];

        if (prevActiveGalleryItem !== activeGalleryItem) {
          const hidePrevTween =
            prevActiveGalleryItem &&
            gsap.fromTo(
              prevActiveGalleryItem,
              {
                opacity: 1,
                scale: 1,
              },
              {
                opacity: 0,
                scale: 0.9,
                ease: "ease-in",
                onComplete: () => {
                  timeline.seek("startShowNext");
                },
              }
            );

          const showNextTween = gsap.fromTo(
            activeGalleryItem,
            {
              opacity: 0,
              scale: 1.1,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "ease-out",
            }
          );

          if (timeline.progress() === 1) {
            timeline.clear();
          }

          if (hidePrevTween) {
            timeline.add(hidePrevTween);
          }

          timeline.addLabel("startShowNext");
          timeline.add(showNextTween);

          prevActiveGalleryItem = activeGalleryItem;
        }

        // console.log(activeGalleryItemIndex);
        // console.log(sr);
      },
    });

    return () => {
      timeline.kill();
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: 100 * content.length + "vh" }} className="features">
      <div className="features__container container">
        <div ref={innerRef} className="features__inner">
          <header className="features__header">
            <SlideUpOnScroll customTrigger={sectionRef} isActive={isScrollRevealActive}>
              <h2 className="features__title title title_section_secondary">{title}</h2>
            </SlideUpOnScroll>
          </header>

          <div className="features__body row">
            <ul className="features__gallery list col">
              {content.map(({ image }, i) => {
                return (
                  <li
                    key={i}
                    ref={(el) => (galleryItemsRef.current[i] = el)}
                    className="features__gallery-item row"
                  >
                    <div className="features__gallery-item-inner">
                      <img className="features__gallery-image" src={image.src} alt={image.alt} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
