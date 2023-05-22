import React, { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import gsap from "gsap";
import RevealOnScroll from "../RevaelOnScroll/RevealOnScroll";

const Cards = ({ children, className }) => {
  const cardsRef = useRef(null);

  // useEffect(() => {
  //   const cardsEl = cardsRef.current;
  //   const tl = gsap.timeline({
  //     scrollTrigger: { trigger: cardsEl, toggleActions: "play reset play reset" },
  //   });
  //   const cardsTargets = cardsEl.querySelectorAll(".card .container_overflow-hidden > *");

  //   tl.fromTo(
  //     cardsEl,
  //     {
  //       opacity: 0,
  //     },
  //     {
  //       ease: "ease-out",
  //       opacity: 1,
  //       delay: 0.4,
  //       duration: 0.5,
  //     }
  //   ).fromTo(
  //     cardsTargets,
  //     {
  //       yPercent: 101,
  //     },
  //     {
  //       yPercent: 0,
  //       ease: "ease-out",
  //       stagger: 0.05,
  //     }
  //   );

  //   return () => {
  //     tl.kill();
  //   };
  // }, [children]);

  // const animate = useCallback((timeline, containerElem) => {
  //   const targets = containerElem.querySelectorAll(".container_overflow-hidden > *");

  //   timeline
  //     .fromTo(
  //       containerElem,
  //       {
  //         opacity: 0,
  //       },
  //       {
  //         ease: "ease-out",
  //         opacity: 1,
  //         delay: 0.4,
  //         duration: 0.5,
  //       }
  //     )
  //     .fromTo(
  //       targets,
  //       {
  //         yPercent: 101,
  //       },
  //       {
  //         yPercent: 0,
  //         ease: "ease-out",
  //         stagger: 0.05,
  //       }
  //     );
  // }, []);

  const animateCards = useCallback((timeline, triggerElem) => {
    const cardsElem = triggerElem.querySelector(".cards");
    const cardsPartsElems = cardsElem.querySelectorAll(".container_overflow-hidden > *");

    timeline.from(cardsElem, {
      opacity: 0,
      delay: 0.2,
    });

    timeline.from(cardsPartsElems, {
      yPercent: 100,
      ease: "ease-out",
      stagger: 0.05,
    });

    return () => {
      timeline.set([cardsElem, cardsPartsElems], {
        clearProps: "all",
      });
    };
  }, []);

  return (
    // <RevealOnScroll tag="ul" animate={animate} className={classNames("cards list row", classNames)}>
    //   {children}
    // </RevealOnScroll>
    <RevealOnScroll animate={animateCards}>
      <ul ref={cardsRef} className={classNames("cards list row", classNames)}>
        {children}
      </ul>
    </RevealOnScroll>
  );
};

export default Cards;
