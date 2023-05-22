import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BodyScrollContext } from "App";

const HeaderSubNav = ({ children }) => {
  const { scrollbarGap } = useContext(BodyScrollContext);

  return (
    <div className="header-sub-nav">
      <div className="header-sub-nav__underlay"></div>
      <div className="header-sub-nav__body">
        <div className="header-sub-nav__body-container container">
          <div style={{ paddingRight: scrollbarGap }} className="header-sub-nav__inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderSubNav.propTypes = {
  children: PropTypes.node,
};

export default HeaderSubNav;
