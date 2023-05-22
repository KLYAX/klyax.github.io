import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ViewTransitionItem } from "components/common";
import { connect } from "react-redux";
import { getHomeActiveProductIndex, getProducts } from "store/selectors/app";
import { useTranslation, withTranslation } from "react-i18next";

const HomeHeroNav = ({ className, productsCategories, activeProductIndex, changeProduct }) => {
  const { t } = useTranslation();

  return (
    <nav className={classNames("home-hero-nav nav", className)}>
      <ul className="home-hero-nav__list nav__list nav__list_vertical">
        {productsCategories.map((category, i) => (
          <li className="home-hero-nav__item nav__item" key={i}>
            <button
              onClick={() => changeProduct(i)}
              className={classNames("home-hero-nav__link home-hero__link button nav__link", {
                active: activeProductIndex === i,
              })}
            >
              <ViewTransitionItem>
                <span className="home-hero-nav__link-label">{t(category.name)}</span>
              </ViewTransitionItem>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withTranslation()(HomeHeroNav);
