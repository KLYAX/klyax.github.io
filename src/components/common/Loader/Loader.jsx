import React from "react";
import classNames from "classnames";

const Loader = ({ className }) => {
  return (
    <div className={classNames("loader", className)}>
      <div className="loader__inner">
        <span className="loader__line loader__line_left"></span>
        <span className="loader__line loader__line_center"></span>
        <span className="loader__line loader__line_right"></span>
      </div>
    </div>
  );
};

export default Loader;
