import React from "react";
import { Advantages } from "components/layouts";
import { useTranslation } from "react-i18next";

const ProductAdvantages = ({ slides, title }) => {
  const { t } = useTranslation();

  return <Advantages title={title} slides={slides} className="product-advantages block-divider" />;
};

export default ProductAdvantages;
