import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ViewTransitionItem } from "components/common";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Text from "components/common/Text";

const ProductHeroSubNav = ({ changeProduct, activeCategory, activeProduct, activeSubcategory }) => {
  const productNamesRef = useRef([]);

  useLayoutEffect(() => {
    const productNamesElems = productNamesRef.current;

    productNamesElems.forEach((productNamesElemsBySubcategory) => {
      const maxProductNameWidth = productNamesElemsBySubcategory.reduce(
        (acc, productNameElem) =>
          productNameElem.offsetWidth > acc ? productNameElem.offsetWidth : acc,
        0
      );

      if (maxProductNameWidth) {
        productNamesElemsBySubcategory.forEach((productNameElem) => {
          productNameElem.style.width = maxProductNameWidth + "px";
        });
      }
    });
  }, []);

  const setProductNamesRef = (subcategoryIndex, productIndex) => (el) => {
    if (Array.isArray(productNamesRef.current[subcategoryIndex])) {
      productNamesRef.current[subcategoryIndex][productIndex] = el;
    } else {
      productNamesRef.current[subcategoryIndex] = [el];
    }
  };

  const subcategoryMaxWidth = (1 / activeCategory.subcategories.length) * 100 + "%";

  return (
    <div className="control-cabinets__products-nav control-cabinets-products-nav block-divider container">
      <ul className="control-cabinets-products-nav__list list row">
        {activeCategory.subcategories.map((subcategory, subcategoryIndex) => (
          <li
            key={subcategory.id}
            style={{ maxWidth: subcategoryMaxWidth }}
            className="control-cabinets-products-nav__sub-nav col-9 col-md"
          >
            {subcategory.products && (
              <ul className="control-cabinets-products-nav__sub-list list">
                {subcategory.products.map((product, productIndex) => {
                  const active =
                    subcategory.id === activeSubcategory.id && product.id === activeProduct.id;

                  return (
                    <ViewTransitionItem
                      tag="li"
                      key={product.id}
                      className="control-cabinets-products-nav__list-item container_overflow-hidden"
                    >
                      <div className="control-cabinets-products-nav__list-item-inner">
                        <button
                          className={classNames("button control-cabinets-products-nav__link", {
                            "button control-cabinets-products-nav__link_active": active,
                          })}
                          onClick={() =>
                            changeProduct({ subcategoryId: subcategory.id, productId: product.id })
                          }
                        >
                          <span
                            ref={setProductNamesRef(subcategoryIndex, productIndex)}
                            className="control-cabinets-products-nav__product-name"
                          >
                            <Text>{product.name}</Text>
                          </span>
                          <span className="control-cabinets-products-nav__product-type">
                            <Text>{product.type}</Text>
                          </span>
                        </button>
                      </div>
                    </ViewTransitionItem>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductHeroSubNav;
