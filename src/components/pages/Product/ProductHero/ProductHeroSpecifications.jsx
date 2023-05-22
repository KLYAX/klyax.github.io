import Content from "components/common/Content";
import React from "react";
import { Accordion } from "components/common";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const containerVariants = {
  initial: {},
  enter: {
    transition: {
      // when: "afterChildren",
      // duration: 1,
      // staggerChildren: 0.5,
    },
  },
  exit: {
    // transition: {
    //   when: "afterChildren",
    //   duration: 1,
    //   staggerChildren: 0.15,
    // },
  },
};

const itemVariants = {
  enter: {
    // transition: {
    //   when: "afterChildren",
    //   staggerChildren: 0.15,
    //   duration: 1,
    // },
  },
  initial: {},
  exit: {
    // transition: {
    //   when: "afterChildren",
    //   staggerChildren: 0.15,
    //   delayChildren: 5,
    //   duration: 1,
    // },
  },
};

const ProductHeroSpecifications = ({ specifications }) => {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.ul
        variants={containerVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        key={location.pathname}
        className="control-cabinets-description__accordions list accordions container"
      >
        {specifications.map(({ data, name }, i) => (
          <motion.li
            layout
            variants={itemVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            key={i}
          >
            <Accordion summary={name}>
              {data.map((content, i) => {
                return Array.isArray(content) ? (
                  <div className="row" key={i}>
                    {content.map((contentItem, l) => (
                      <div key={l} className="col-12 col-sm-6">
                        <Content {...contentItem} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Content key={i} {...content} />
                );
              })}
            </Accordion>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default ProductHeroSpecifications;
