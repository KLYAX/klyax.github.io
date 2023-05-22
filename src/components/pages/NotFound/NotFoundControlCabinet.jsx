import React, { useEffect, useRef } from "react";
import { ReactComponent as ControlCabinet } from "./control-cabinet.svg";
import gsap from "gsap";

const NotFoundControlCabinet = () => {
  const weldingEffectRef = useRef(null);
  const controlCabinetRef = useRef(null);

  useEffect(() => {
    const weldingEffectElem = weldingEffectRef.current;
    const timeline = gsap.timeline();

    const playWeldingEffect = () => {
      weldingEffectElem.play().catch(() => {});
    };

    const getControlCabinetErrorCodeBlinkingTimeline = () => {
      return gsap
        .timeline()
        .fromTo(
          ".control-cabinet-drawing__error-code",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.15,
            delay: 0.3,
            onStart: () => {
              playWeldingEffect();
            },
          }
        )
        .to(".control-cabinet-drawing__error-code", {
          keyframes: [
            {
              opacity: 0,
              duration: 0.05,
            },
            {
              opacity: 1,
              duration: 0.2,
              delay: 0.25,

              onStart: playWeldingEffect,
            },
            {
              opacity: 0,
              duration: 0.2,
            },
            {
              opacity: 1,
              duration: 0.15,
              delay: 0.05,

              onStart: playWeldingEffect,
            },
          ],
        });
    };

    const getControlCabinetAssemblyTimeline = (partsDurationIncrement = 0) => {
      const pillarMiddleTween = gsap.from(".control-cabinet-drawing__pillar-middle", {
        x: "210vw",
        y: "-50vh",
        duration: 1.5 + partsDurationIncrement,
      });

      const pillarLeftTween = gsap.from(".control-cabinet-drawing__pillar-left", {
        x: "-210vw",
        y: "-50vh",
        duration: 1.4 + partsDurationIncrement,
      });

      const controlBoxTween = gsap.from(".control-cabinet-drawing__control-box", {
        x: "-210vw",
        y: "-25vh",
        duration: 1.3 + partsDurationIncrement,
      });

      const pillarRightTween = gsap.from(".control-cabinet-drawing__pillar-right", {
        x: "210vw",
        y: "-50vh",
        duration: 1.3 + partsDurationIncrement,
      });

      const topMiddleCornerTween = gsap.from(".control-cabinet-drawing__top-middle-corner", {
        x: "210vw",
        duration: 1.1 + partsDurationIncrement,
      });

      const supportLeftTween = gsap.from(".control-cabinet-drawing__support-left", {
        x: "-210vw",
        y: "-35vh",
        duration: 1.1 + partsDurationIncrement,
      });

      const tubeBackTween = gsap.from(".control-cabinet-drawing__tube-back", {
        x: "210vw",
        y: "-35vh",
        duration: 1 + partsDurationIncrement,
      });

      const topMiddleWithoutCornerTween = gsap.from(
        ".control-cabinet-drawing__top-middle-without-corner",
        {
          x: "210vw",
          y: "-50vh",
          duration: 0.95 + partsDurationIncrement,
        }
      );

      const tubeBackLeftWheelTween = gsap.from(".control-cabinet-drawing__tube-back-left-wheel", {
        x: "-210vw",
        y: "-35vh",
        duration: 0.9 + partsDurationIncrement,
      });

      const topLeftTween = gsap.from(".control-cabinet-drawing__top-left", {
        x: "-210vw",
        y: "-50vh",
        duration: 0.9 + partsDurationIncrement,
      });

      const tubeFrontTween = gsap.from(".control-cabinet-drawing__tube-front", {
        x: "-210vw",
        duration: 0.9 + partsDurationIncrement,
      });

      const indicatorTween = gsap.from(".control-cabinet-drawing__indicator", {
        x: "-210vw",
        y: "-20vh",
        duration: 0.9 + partsDurationIncrement,
      });

      const topRightTween = gsap.from(".control-cabinet-drawing__top-right", {
        x: "210vw",
        y: "-50vh",
        ease: "circ.out",
        duration: 0.85 + partsDurationIncrement,
      });

      const platformTween = gsap.from(".control-cabinet-drawing__platform", {
        y: "100vh",
        duration: 0.85 + partsDurationIncrement,
      });

      const supportTween = gsap.from(".control-cabinet-drawing__support-right", {
        x: "210vw",
        y: "-20vh",
        duration: 0.85 + partsDurationIncrement,
      });

      const tubeFrontRightWheelTween = gsap.from(
        ".control-cabinet-drawing__tube-front-right-wheel",
        {
          y: "100vh",
          duration: 0.7 + partsDurationIncrement,
        }
      );

      const tubeFrontLeftWheelTween = gsap.from(".control-cabinet-drawing__tube-front-left-wheel", {
        x: "-210vw",
        y: "-20vh",
        duration: 0.5 + partsDurationIncrement,
      });

      const tubeBackRightWheel = gsap.from(".control-cabinet-drawing__tube-back-right-wheel", {
        x: "100vw",
        duration: 0.5 + partsDurationIncrement,
      });

      return gsap
        .timeline({
          defaults: {
            ease: "ease-out",
          },
        })
        .add(pillarMiddleTween, 0.2)
        .add(pillarLeftTween, 0.3)
        .add(controlBoxTween, 0.4)
        .add(pillarRightTween, 0.4)
        .add(topMiddleCornerTween, 0.6)
        .add(supportLeftTween, 0.6)
        .add(tubeBackTween, 0.7)
        .add(topMiddleWithoutCornerTween, 0.75)
        .add(tubeBackLeftWheelTween, 0.8)
        .add(topLeftTween, 0.8)
        .add(tubeFrontTween, 0.8)
        .add(indicatorTween, 0.8)
        .add(topRightTween, 0.85)
        .add(platformTween, 0.85)
        .add(supportTween, 0.85)
        .add(tubeFrontRightWheelTween, 1)
        .add(tubeFrontLeftWheelTween, 1.2)
        .add(tubeBackRightWheel, 1.2);
    };

    const partsDurationIncrement = window.innerWidth > 768 ? window.innerWidth / 768 / 2 : 0;

    timeline.add(getControlCabinetAssemblyTimeline(partsDurationIncrement));
    timeline.add(getControlCabinetErrorCodeBlinkingTimeline());

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="not-found-hero__body col-12 col-md-11 offset-md-1 col-lg-8 offset-lg-0">
      <audio
        ref={weldingEffectRef}
        src="/audio/welding-effect.mp3"
        className="not-found-hero__sound-effect"
      />
      <ControlCabinet ref={controlCabinetRef} className="not-found-hero__control-cabinet-drawing" />
    </div>
  );
};

export default NotFoundControlCabinet;
