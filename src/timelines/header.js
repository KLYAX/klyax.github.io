import gsap from "gsap";

export const headerSlideDownTween = (vars) => {
  return gsap.fromTo(
    ".header",
    {
      yPercent: -100,
    },
    {
      yPercent: 0,
      ease: "ease-out",
      duration: 0.4,
      ...vars,
    }
  );
};
