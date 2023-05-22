import React, { useMemo } from "react";

import ProductsNavCategoryPreview from "./ProductsNavCategoryThumbnail";
import ProductsNavSubcategory from "./ProductsNavSubcategory";

import { Link } from "react-router-dom";
import { buildPathToProduct } from "routes/product";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";
import Text from "components/common/Text";

/**
 * Компонент создает группу с навигациями, которая имеет заголовок и превью
 *
 * @param {Object} props
 * @param {string} props.title - Заголовок группы
 * @param {Object[]} props.nav - Навигации группы
 * @param {Object[]} props.previews - Превью группы
 * @param {string} props.className - Класс
 * @param {function} props.t - Функция для перевода текста на разные локали
 */

function ProductsNavCategory({ category, hideHeaderSubNav }) {
  const navThumbnails = Array.isArray(category.navThumbnail)
    ? category.navThumbnail
    : [category.navThumbnail];

  const linkToCategory = useMemo(() => buildPathToProduct(category.id), [category]);

  return (
    <li className="products-nav-group products-nav__group col-12 col-md-6 col-xl-3">
      <div className="products-nav-group__inner">
        <Link
          onClick={hideHeaderSubNav}
          to={linkToCategory}
          className="products-nav-group__previews-container link"
        >
          <ProductsNavCategoryPreview
            className="products-nav-group__preview"
            items={navThumbnails}
          />
        </Link>
        <div className="products-nav-group__title-container container_overflow-hidden">
          <Link onClick={hideHeaderSubNav} to={linkToCategory} className="link">
            <h3 className="products-nav-group__title title title_uppercase title_shrink title">
              <Text>{category.name}</Text>
            </h3>
          </Link>
        </div>
        {Array.isArray(category.subcategories) && (
          <ul className="products-nav-group__subcategory-list list">
            {category.subcategories.map((subcategory) => (
              <li
                key={subcategory.id}
                className="products-nav-group__subcategory-list-item container_overflow-hidden"
              >
                <ProductsNavSubcategory
                  hideHeaderSubNav={hideHeaderSubNav}
                  category={category}
                  subcategory={subcategory}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default ProductsNavCategory;
