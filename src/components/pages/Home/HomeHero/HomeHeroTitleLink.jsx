import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Icon, TransitionItem } from "components/common";
import SlideInOutOnChange from "components/common/SlideInOutOnChange/SlideInOutOnChange";

function HomeHeroTitleLink({ className, children, to, ...other }) {
  return (
    <Link
      className={classNames(
        "home-hero-title-link home-hero__title link title title_uppercase title_shrink link_with-arrow-icon-and-overflow"
      )}
      to={to}
      {...other}
    >
      <SlideInOutOnChange trigger={to}>
        <span className="home-hero-title-link__inner">
          <span className="home-hero-title-link__label">{children}</span>&nbsp;
          <span className="home-hero-title-link__icon">
            <Icon className="link__arrow-icon " name="link-arrow-up-bold" />
          </span>
        </span>
      </SlideInOutOnChange>
    </Link>
  );
}

HomeHeroTitleLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
};

export default HomeHeroTitleLink;
