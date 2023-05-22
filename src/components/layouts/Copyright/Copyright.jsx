import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as SagirovLogo } from "assets/images/logos/sagirov.com.svg";
import { withTranslation } from "react-i18next";
import { AppearOnScroll } from "components/common";
import { Link } from "react-router-dom";
import privacyPolicyRoute from "routes/privacyPolicy";

function Copyright({ tag: TagName, leftClassName, rightClassName, innerPadding, className, t }) {
  const currentYear = new Date().getFullYear();

  return (
    <TagName className={classNames("copyright", className)}>
      <div
        className={classNames("copyright__inner row", {
          container: innerPadding,
        })}
      >
        <div className={classNames("copyright__left", leftClassName)}>
          <div className="copyright__author copyright-author">
            <AppearOnScroll>
              <a
                href="https://sagirov.com/"
                className="copyright-author__link copyright-author-link"
              >
                <span className="copyright-author__link-made-in caption">Made&nbsp;in </span>
                <SagirovLogo className="copyright-author__link-logo" />
              </a>
            </AppearOnScroll>
          </div>
        </div>
        <div className={classNames("copyright__right", rightClassName)}>
          <div className="copyright__main copyright-main text_mono">
            <AppearOnScroll tag="span" className="copyright-main__policy">
              <Link to={privacyPolicyRoute.path} className="link">
                {t("Privacy policy")}{" "}
              </Link>
            </AppearOnScroll>
            <AppearOnScroll tag="span" className="copyright-main__copyright text_secondary">
              <span className="span">
                Copyright 2007&ndash;
                <span className="copyright-main__copyright-end-year">{currentYear}</span>
              </span>
            </AppearOnScroll>
          </div>
        </div>
      </div>
    </TagName>
  );
}

Copyright.defaultProps = {
  leftClassName: "col-3 col-md-4 col-xl-6",
  rightClassName: "col-9 col-md-8 col-xl-6",
  tag: "div",
};

Copyright.propTypes = {
  className: PropTypes.string,
  leftClassName: PropTypes.string,
  rightClassName: PropTypes.string,
  innerPadding: PropTypes.bool,
};

export default withTranslation()(Copyright);
