import React, { cloneElement, createElement, forwardRef, memo, useEffect, useRef } from "react";
import classNames from "classnames";
import ScrollReveal from "scrollreveal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap/gsap-core";
import { isInView } from "utils/dom";

const RevealOnScroll = memo(
  ({
    tag: TagName = "div",
    playImmediately = false,
    isActive = true,
    animate = () => {},
    children,
    className,
  }) => {
    const triggerRef = useRef(null);
    // const timelineRef = useRef(null);

    useEffect(() => {
      if (!isActive) {
        return;
      }

      /**
       * @type HTMLElement
       */
      const triggerEl = triggerRef.current;
      let firstAppear = true;

      const handleEnterAndEnterBack = (sr) => {
        if (firstAppear) {
          if (sr.isActive) {
            if (sr.getVelocity() === 0 && !playImmediately) {
              timeline.progress(1, true);
            } else {
              if (timeline.progress() === 1) {
              } else {
                timeline.play();
              }
            }
          }

          firstAppear = false;
        } else {
          if (sr.isActive) {
            timeline.play();
          }
        }
      };

      const timeline = gsap.timeline({
        progress: 1,
        paused: true,
        scrollTrigger: {
          trigger: triggerEl,
          toggleActions: "none reset none reset",
          onEnter: handleEnterAndEnterBack,
          onEnterBack: handleEnterAndEnterBack,
        },
      });

      const clear = animate(timeline, triggerEl);

      if (!playImmediately) {
        if (isInView(triggerEl)) {
          timeline.progress(1);
        }
      }

      return () => {
        timeline.progress(1).pause();

        if (clear) {
          clear();
        }

        timeline.scrollTrigger.kill();
        timeline.kill();
      };
    }, [animate, playImmediately, isActive]);

    return (
      <TagName className={className} ref={triggerRef}>
        {children}
      </TagName>
    );
  }
);

export default RevealOnScroll;
