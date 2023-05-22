import gsap from "gsap";

/**
 * возвращает анимацию поворота
 */

function getRotateRectsTween(vars = {}) {
  return gsap.to(".preloader-logo__icon-rect", {
    rotate: "-=90",
    duration: 1,
    ...vars,
  });
}

/**
 * возвращает анимацию, которая устанавливает элементы прелоадера
 * в начальные положение, перед основной анимацией для зацикливания
 */
export function getMoveRectsToInitialPositionTimeline() {
  const tl = gsap
    .timeline({ paused: true, defaults: { ease: "none" } })
    .add(getRotateRectsTween(), "+=0.3")
    .from(
      ".preloader-logo__icon-rect-inner",
      {
        opacity: 0,
        duration: 1,
      },
      "<"
    )
    .to(
      ".preloader-logo__icon-rect-inner",
      {
        keyframes: [
          {
            xPercent: 50,
            yPercent: 35,
          },
          {
            xPercent: 30,
          },
        ],
        duration: 1,
      },
      "<"
    );

  return tl.tweenFromTo(0, tl.duration(), { ease: "linear" });
}

/**
 * возвращает анимацию сближения квадратов
 */
export function getRectsConvergenceTimeline() {
  const tl = gsap
    .timeline({ paused: true, defaults: { ease: "none" } })
    .add(getRotateRectsTween())
    .to(
      ".preloader-logo__icon-rect-inner",
      {
        keyframes: [
          {
            xPercent: 70,
            yPercent: 55,
          },
          {
            x: "-=1",
            y: "-=1",
            xPercent: 50,
          },
        ],
        duration: 1,
      },
      "<"
    );

  return tl.tweenFromTo(0, tl.duration(), { ease: "linear" });
}

/**
 * возвращает анимацию расхождения квадратов
 */
export function getRectsDivergenceTimeline() {
  const tl = gsap
    .timeline({ paused: true, defaults: { ease: "none" } })
    .add(getRotateRectsTween())
    .to(
      ".preloader-logo__icon-rect-inner",
      {
        keyframes: [
          {
            yPercent: 55,
            xPercent: 70,
          },
          {
            yPercent: 30,
            xPercent: 30,
          },
        ],

        duration: 1,
      },
      "<"
    );

  return tl.tweenFromTo(0, tl.duration(), { ease: "linear" });
}

/**
 * возвращает анимацию превращения прелоадер в лого
 */
export function getTransformToLogoTimeline() {
  const iconRectWidth = gsap.getProperty(".preloader-logo__icon-rects", "width");
  const iconRectBorderRadiusFactor = 3.42;
  const iconRectBorderTopLeftRadius = (iconRectWidth * 2) / iconRectBorderRadiusFactor;

  const tl = gsap
    .timeline({ paused: true, defaults: { ease: "none" } })
    .add(getRotateRectsTween())
    // transform rects to background of the logo
    .to(
      ".preloader-logo__icon-rect-inner",
      {
        keyframes: [
          {
            xPercent: 70,
            yPercent: 50,
          },
          {
            x: "+=2",
            y: "+=2",
            xPercent: 50,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: iconRectBorderTopLeftRadius,
          },
        ],
        duration: 1,
      },
      "<"
    )
    // move globus
    .fromTo(
      ".preloader-logo__icon-globus",
      {
        display: "none",
        yPercent: 100,
      },
      {
        delay: 0.1,
        display: "",
        yPercent: 6,
        duration: 0.4,
        ease: "ease-out",
      }
    )
    // move logo to left
    .to(".preloader-logo", {
      xPercent: 15,
      duration: 0.4,
    })
    .fromTo(
      ".preloader-logo__icon",
      {
        left: "50%",
        xPercent: -50,
      },
      {
        delay: 0.1,
        left: "0%",
        xPercent: -130,
        duration: 0.4,
      },
      "<"
    )
    // show logo text
    .from(".preloader-logo__text", {
      delay: 0.1,
      opacity: 0,
      duration: 0.4,
    });

  return tl.tweenFromTo(0, tl.duration(), { ease: "linear" });
}

/**
 * возвращает анимацию исчезания прелоадер
 */
export function getHidePreloaderTween() {
  return gsap.to(".preloader", {
    opacity: 0,
    duration: 0.4,
    ease: "ease-in",
  });
}
