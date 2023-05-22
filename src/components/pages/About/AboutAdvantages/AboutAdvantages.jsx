import React from "react";
import PropTypes from "prop-types";
import Advantages from "components/layouts/Advantages/Advantages";
import { withTranslation } from "react-i18next";

function AboutAdvantages({ title, subtitle, slides, t }) {
  return (
    <Advantages
      title={title}
      subtitle={subtitle}
      slides={slides}
      className="about-our-advantages"
    />
  );
}

AboutAdvantages.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(AboutAdvantages);
