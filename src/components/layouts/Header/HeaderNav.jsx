import React, { useCallback, useMemo, useRef } from "react";
import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";
import ProductsNav from "components/pages/Products/ProductsNav";
import HeaderSubNav from "./HeaderSubNav";

import homeRoute from "routes/home";
import productsRoute from "routes/products";
import documentationRoute from "routes/documentation";
import facilitiesRoute from "routes/facilities";
import aboutRoute from "routes/about";
import contactsRoute from "routes/contacts";
import { Theme } from "config";
import { useTranslation } from "react-i18next";

export const headerNavRoutes = [
  homeRoute,
  productsRoute,
  documentationRoute,
  facilitiesRoute,
  aboutRoute,
  contactsRoute,
];

const HeaderNav = ({ className, headerTheme, setHeaderTheme }) => {
  const location = useLocation();
  const { t: translate } = useTranslation();

  const isProductsPage = useMemo(() => location.pathname === productsRoute.path, [
    location.pathname,
  ]);

  return (
    <nav className={classNames("header-nav", "nav", className)}>
      <ul className="header-nav__list nav__list list">
        {headerNavRoutes.map((route, i) => {
          const hasProductSubNav = !isProductsPage && productsRoute.path === route.path;

          return (
            route.nav && (
              <li className="header-nav__item nav__item" key={i}>
                <NavLink
                  className="header-nav__link header__link nav__link"
                  exact={route.exact}
                  to={route?.nav?.href || route.path}
                >
                  {translate(route.nav.label)}
                </NavLink>

                {hasProductSubNav && (
                  <HeaderSubNav>
                    <ProductsNav />
                  </HeaderSubNav>
                )}
              </li>
            )
          );
        })}
      </ul>
    </nav>
  );
};

export default HeaderNav;
