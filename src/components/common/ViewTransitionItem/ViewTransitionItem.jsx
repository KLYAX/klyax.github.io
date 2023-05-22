import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Служит оберткой для дочернего элемента, который будет анимироваться при переходе на страницу
 *
 * @param {object} props
 * @param {boolean} [overflow=true] - Если установленно в false, тогда с обертки убирается overflow: hidden
 */
const ViewTransitionItem = React.forwardRef(
  ({ tag: TagName, children, overflow, className, ...other }, ref) => {
    return (
      <TagName
        className={classNames("view-transition-item", className)}
        style={{ overflow: overflow && "hidden" }}
        ref={ref}
        {...other}
      >
        {children}
      </TagName>
    );
  }
);

ViewTransitionItem.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

ViewTransitionItem.defaultProps = {
  tag: "div",
  overflow: true,
};

export default ViewTransitionItem;
