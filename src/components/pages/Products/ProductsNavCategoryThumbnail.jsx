import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

/**
 * Компонент создает превью для группы с навигацией
 *
 * @param {Object} props
 * @param {string} props.src - Src превью
 * @param {string} props.alt - Alt превью
 * @param {string} props.className - Класс
 */
function ProductsNavCategoryPreview({ items = [], className }) {
  return (
    <div className="products-nav-group-preview">
      <ul className={classNames("products-nav-group-preview__list list", className)}>
        {items.map(({ image }, i) => (
          <li
            key={i}
            style={{ backgroundImage: `url(${image.src})` }}
            className="products-nav-group-preview__item"
          />
        ))}
      </ul>
    </div>
  );
}

ProductsNavCategoryPreview.propTypes = {
  image: PropTypes.object,
  className: PropTypes.string,
};

export default ProductsNavCategoryPreview;
