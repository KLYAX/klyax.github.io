import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Компонент карточка
 *
 * @param {Object} props
 * @param {any} props.children - Дочерние элементы
 * @param {boolean} props.hover - Если true, тогда будет работать эффект при наведении
 * @param {className} props.className - Класс
 */
function Card({ children, hover, tag: TagName, className }) {
  return (
    <TagName className={classNames("card", { card_hover: hover }, className)}>
      <div className="card__container">
        <div className="card__inner">{children}</div>
      </div>
    </TagName>
  );
}

Card.defaultProps = {
  tag: "li",
};

Card.propTypes = {
  hover: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
