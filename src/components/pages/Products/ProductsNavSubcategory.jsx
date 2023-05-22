import React from "react";
import PropTypes from "prop-types";
import { Link, matchPath, useLocation, useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { ViewTransitionItem } from "components/common";
import { buildPathToProduct } from "routes/product";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";
import classNames from "classnames";
import Text from "components/common/Text";
import productRoute from "routes/product";

const ProductsNavGroupSubcategory = ({ category, subcategory, hideHeaderSubNav }) => {
  const location = useLocation();
  const match = matchPath(location.pathname, productRoute);

  // console.log(params);

  return (
    <div className="products-nav-group-nav">
      <div className="products-nav-group-nav__title-container container_overflow-hidden">
        <Link
          onClick={hideHeaderSubNav}
          to={buildPathToProduct(category.id, subcategory.id)}
          className="link"
        >
          <h4 className="products-nav-group-nav__title">
            <Text>{subcategory.name}</Text>
          </h4>
        </Link>
      </div>

      {subcategory.products && (
        <ul className="products-nav-group-nav__list list row">
          {subcategory.products.map((product) => {
            const isActiveLink = match &&
              match.params.subcategoryId === subcategory.id && match.params.productId === product.id;

            return (
              <li
                key={product.id}
                className="products-nav-group-nav__item container_overflow-hidden col-6 col-sm-4 col-md-6 col-lg-3 col-xl-6"
              >
                <Link
                  onClick={!isActiveLink ? hideHeaderSubNav : undefined}
                  className={classNames(
                    "products-nav-group-nav__link link link_primary link_caption",
                    { "products-nav-group-nav__link_active": isActiveLink }
                  )}
                  to={buildPathToProduct(category.id, subcategory.id, product.id)}
                >
                  <Text>{product.name}</Text>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProductsNavGroupSubcategory;
