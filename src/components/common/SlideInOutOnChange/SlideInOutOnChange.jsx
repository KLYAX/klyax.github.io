import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

export const getSlideInOutVariants = (overrides = { enter: {}, exit: {}, initial: {} }) => ({
  initial: {
    y: "100%",
    ...overrides.initial,
  },
  enter: {
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
    ...overrides.enter,
  },
  exit: {
    y: "-100%",
    transition: {
      ease: "easeIn",
      duration: 0.5,
    },
    ...overrides.exit,
  },
});

const SlideInOutOnChange = ({
  children,
  tag = "div",
  hidden = true,
  className,
  trigger,
  initial,
  enter,
  exit,
}) => {
  // const variantsContainer = useMemo(
  //   () => ({
  //     initial: {
  //       overflow: "",
  //     },
  //     // enter: {
  //     //   overflow: "hidden",
  //     //   transition: {
  //     //     duration: 0,
  //     //   },
  //     // },
  //     // exit: {
  //     //   overflow: "hidden",
  //     //   transition: {
  //     //     duration: 0,
  //     //   },
  //     // },
  //   }),
  //   []
  // );

  const variantsTarget = useMemo(() => getSlideInOutVariants({ enter, exit, initial }), [
    enter,
    exit,
    initial,
  ]);

  return (
    <AnimatePresence initial={true} exitBeforeEnter>
      <motion.div
        className={classNames("slide-in-out-on-change", className)}
        style={{ overflow: hidden && "hidden" }}
        key={trigger}
      >
        <motion.div
          className="slide-in-out-on-change__target"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={variantsTarget}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideInOutOnChange;
