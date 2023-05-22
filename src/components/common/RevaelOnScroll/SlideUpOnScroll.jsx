import React, { memo, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import classNames from "classnames";

const SlideUpOnScroll = memo(
  ({
    tag: TagName = "div",
    isActive = true,
    autoHidden = false,
    config,
    children,
    className,
    from,
    overflow = true,
    customTrigger,
    playImmediately,
    ...otherProps
  }) => {
    const triggerRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
      /**
       * @type HTMLElement
       */
      // let isFirstAppear = true;

      const triggerEl = customTrigger ? customTrigger.current : triggerRef.current;
      const targetEl = targetRef.current;
      let firstAppear = true;

      const handleEnterAndEnterBack = (sr) => {
        if (firstAppear) {
          if (sr.isActive) {
            if (sr.getVelocity() === 0 && !playImmediately) {
              timeline.progress(1);
            } else {
              timeline.play();
            }
          }

          firstAppear = false;
        } else {
          if (sr.isActive) {
            timeline.play();
          }
        }
      };

      /*
      const handleEnterAndEnterBack = (sr) => {
        if (sr.getVelocity() === 0 && !playImmediately) {
          // console.log(sr);
          timeline.progress(1);
        } else {
          timeline.play();
        }
      }; */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          toggleActions: "none reset none reset",

          onEnter: handleEnterAndEnterBack,
          onEnterBack: handleEnterAndEnterBack,

          onToggle({ isActive }) {
            if (autoHidden && !isActive) {
              gsap.set(triggerEl, {
                overflow: "hidden",
              });
            }
          },
        },
      });

      // timeline.progress(1).pause();

      if (autoHidden) {
        gsap.set(triggerEl, { overflow: "hidden" });
      }

      /**
       * @type gsap.core.Timeline
       */
      timeline.from(targetEl, {
        onComplete() {
          if (autoHidden) {
            gsap.set(triggerEl, {
              overflow: "",
            });
          }
        },
        willChange: "transform",
        delay: 0.2,
        ease: "ease-out",
        duration: 0.4,
        yPercent: 100,
        ...from,
      });

      return () => {
        timeline.pause(1).kill();
        gsap.set(targetEl, { clearProps: true });
      };
    }, [autoHidden, playImmediately]);

    useLayoutEffect(() => {}, []);

    // useEffect(() => {
    //   const timeline = timelineRef.current;

    //   if (timeline) {
    //     const { scrollTrigger } = timeline;

    //     if (scrollTrigger) {
    //       if (isActive) {
    //         scrollTrigger.enable();
    //       } else {
    //         timeline.pause(1);
    //         scrollTrigger.disable(false);
    //       }
    //     }
    //   }
    // }, [isActive]);

    return (
      <TagName
        {...otherProps}
        style={{ overflow: overflow ? "hidden" : "" }}
        className={classNames("slide-up-on-scroll", className)}
        ref={triggerRef}
      >
        <div className="slide-up-on-scroll__target" ref={targetRef}>
          {children}
        </div>
      </TagName>
    );
  }
);

export default SlideUpOnScroll;
