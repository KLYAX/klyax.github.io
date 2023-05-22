import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const RawHtml = ({ tag: Tag = "div", className, children, ...other }) => {
  return (
    <Tag
      className={classNames("raw-html", className)}
      dangerouslySetInnerHTML={{
        __html: children,
      }}
      {...other}
    />
  );
};

RawHtml.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default RawHtml;
