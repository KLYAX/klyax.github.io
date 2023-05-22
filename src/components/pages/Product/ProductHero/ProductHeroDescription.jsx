import React from "react";
import { motion } from "framer-motion";
import SlideInOutOnChange from "components/common/SlideInOutOnChange/SlideInOutOnChange";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import Content from "components/common/Content";
import Text from "components/common/Text";

const ProductHeroDescription = ({ productName, description }) => {
  const location = useLocation();

  return (
    <motion.div layout className="control-cabinets-description__header-inner row">
      <SlideInOutOnChange
        className="control-cabinets-description__header-col-with-title col-12 col-lg-2 col-xl-12"
        trigger={location.pathname}
      >
        <h2 className="control-cabinets-description-header__title title title_xs">
          <Text>{productName}</Text>
        </h2>
      </SlideInOutOnChange>
      <SlideInOutOnChange
        trigger={location.pathname}
        className={classNames(
          "control-cabinets-description__header-col-with-primary-description",
          "col-12 col-sm-6",
          `col-lg-${description.length >= 2 ? 5 : 10}`,
          `col-xl-${description.length >= 2 ? 6 : 12}`
        )}
      >
        <div className="control-cabinets-description-header__text text_secondary">
          {Array.isArray(description[0]) &&
            description[0].map((content, i) => (
              <Content key={i} type={content.type} data={content.data} />
            ))}
        </div>
      </SlideInOutOnChange>
      <SlideInOutOnChange className="col" trigger={location.pathname}>
        {Array.isArray(description[1]) &&
          description[1].map((content, i) => (
            <Content key={i} type={content.type} data={content.data} />
          ))}
      </SlideInOutOnChange>
    </motion.div>
  );
};

export default ProductHeroDescription;
