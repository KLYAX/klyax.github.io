import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Компонент обертка, которая служит для того, чтобы
 * предотвратить перенос боковых иконок на след. строку
 *
 * @param {object} props
 * @param {React.ReactNode} children
 * @param {function} renderLeft - Рендерит элемент слева
 * @param {function} renderRight - Рендерит элемент слева
 * @param {string} className - Рендерит элемент слева
 */
function LabelWithIcon({ children, renderLeft, renderRight, className }) {
  return (
    <span className={classNames("label-with-icon", className)}>
      {renderLeft && (
        <>
          <span className="label-with-icon__icon label-with-icon__icon_left">{renderLeft()}</span>
          &nbsp;
        </>
      )}
      <span className="label-with-icon__label">{children}</span>
      {renderRight && (
        <>
          &nbsp;
          <span className="label-with-icon__icon label-with-icon__icon_right">{renderRight()}</span>
        </>
      )}
    </span>
  );
}

LabelWithIcon.propTypes = {
  children: PropTypes.node,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  className: PropTypes.string,
};

export default LabelWithIcon;
