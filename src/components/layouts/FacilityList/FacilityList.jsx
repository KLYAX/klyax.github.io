import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import FacilityListItem from "./FacilityListItem";

function FacilityList({ className, isRevealOnScrollActive = true, facilities }) {
  return (
    <ul className={classNames("facility-list list", className)}>
      {facilities.map((facility, i) => (
        <FacilityListItem isRevealOnScrollActive={isRevealOnScrollActive} key={i} {...facility} />
      ))}
    </ul>
  );
}

FacilityList.propTypes = {
  facilities: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};

export default FacilityList;
