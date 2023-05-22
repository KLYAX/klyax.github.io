import React, { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ProductsNavCategory from "./ProductsNavCategory";
import { connect } from "react-redux";
import { getProducts } from "store/selectors/app";

/**
 * Компонент создает навигацию со всей продукцией
 *
 * @param {Object} props
 * @param {Object} props.className - Класс
 */
function ProductsNav({ className, products }) {
  const headerRef = useRef(null);

  useEffect(() => {
    /**
     * @type HTMLElement
     */
    const headerElem = (headerRef.current = document.querySelector(".header"));

    if (!headerElem) {
      return;
    }

    headerElem.style.pointerEvents = "";

    const headerTransitionendHandler = (e) => {
      if (
        e.target.classList.contains("header-sub-nav") &&
        e.propertyName === "opacity" &&
        headerElem.classList.contains("header--disable-sub-nav-on-hover")
      ) {
        headerElem.classList.remove("header--disable-sub-nav-on-hover");
      }
    };

    headerElem.addEventListener("transitionend", headerTransitionendHandler);

    return () => {
      headerElem.removeEventListener("transitionend", headerTransitionendHandler);
    };
  }, []);

  const hideHeaderSubNav = useCallback(() => {
    const headerElem = headerRef.current;

    headerElem.classList.add("header--disable-sub-nav-on-hover");
  }, []);

  return (
    <nav className={classNames("products-nav", className)}>
      <div className="products-nav__container">
        <ul className="products-nav__groups list row">
          {products.map((category) => (
            <ProductsNavCategory
              hideHeaderSubNav={hideHeaderSubNav}
              key={category.id}
              category={category}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

ProductsNav.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

export default connect(mapStateToProps)(ProductsNav);
