import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const AppearOnViewTransition = ({ children, from, to }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const targetElem = targetRef.current;

    const tween = gsap.fromTo(
      targetElem,
      {
        willChange: "transform",
        yPercent: 100,
        ...from,
      },
      {
        ease: "ease-out",
        duration: 0.4,
        yPercent: 0,
        ...to,
      }
    );

    return () => {
      tween.kill();
    };
  }, [from, to]);

  return (
    <div style={{ overflow: "hidden" }} className="appear-on-view-transition">
      <div ref={targetRef} className="appear-on-view-transition__target">
        {children}
      </div>
    </div>
  );
};

export default AppearOnViewTransition;
