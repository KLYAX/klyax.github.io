import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function DownloadIcon({ className }) {
  return (
    <span className={classNames("download-icon", className)}>
      <span className="download-icon__arrow"></span>
    </span>
  );
}

DownloadIcon.propTypes = {
  className: PropTypes.string,
};

export default DownloadIcon;
