import React, { Component, useContext, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import HomeHeroSlider from "./HomeHeroSlider";
import HomeHeroNext from "./HomeHeroNext";
import HomeHeroNav from "./HomeHeroNav";
import HomeHeroSubNav from "./HomeHeroSubNav";
import { Pagination, ViewTransitionItem } from "components/common";
import { useTranslation, withTranslation } from "react-i18next";

import { THEME } from "utils/constants";
import { HOME_HERO_SLIDE_CHANGE_DURATION } from "./HomeHeroSlider";
import { getHeaderTheme, getHomeHeroTheme } from "store/selectors/app";
import { changeHeaderAndHomeHeroTheme } from "store/actions/app";
import { connect } from "react-redux";
import { AppThemeContext } from "App";

class HomeHero extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    headerTheme: PropTypes.string,
    homeHeroTheme: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      themeChanging: false,
    };
  }

  updateHeaderAndSectionTheme(prevProps) {
    if (prevProps.activeProductIndex !== this.props.activeProductIndex) {
      const activeProduct = this.props.products[this.props.activeProductIndex];

      const { backgroundColor } = activeProduct.homePageSlide;

      // Если у слайда след. продукта есть задний фон, тогда меняем тему шапки и секции
      if (backgroundColor) {
        if (this.props.homeHeroTheme === THEME.DEFAULT) {
          this.changeHeaderAndHomeHeroTheme(THEME.LIGHT);
        }
      } else {
        if (this.props.homeHeroTheme === THEME.LIGHT) {
          this.changeHeaderAndHomeHeroTheme(THEME.DEFAULT);
        }
      }
    }
  }

  changeHeaderAndHomeHeroTheme(theme) {
    this.props.changeHeaderAndHomeHeroTheme(theme);

    if (this.state.themeChanging) {
      clearTimeout(this.timeoutId);
    } else {
      this.setState({
        themeChanging: true,
      });
    }

    this.timeoutId = setTimeout(() => {
      this.setState({
        themeChanging: false,
      });
    }, HOME_HERO_SLIDE_CHANGE_DURATION);
  }

  componentDidUpdate(prevProps) {
    this.updateHeaderAndSectionTheme(prevProps);
  }

  render() {
    const { products, homeHeroTheme, activeProductIndex, changeProduct, t } = this.props;
    const { themeChanging } = this.state;

    console.log(products);

    const slides = products.map((category) => category.homePageSlide);

    return (
      <section
        className={classNames("home-hero block-divider theme", {
          [`theme_changing`]: themeChanging,
          [`theme_${homeHeroTheme}`]: homeHeroTheme,
        })}
      >
        <div className="home-hero__container container">
          <div className="home-hero__inner">
            <div className="home-hero__background home-hero-background">
              <div className="home-hero-background__layer"></div>
              <HomeHeroSlider
                activeSlideIndex={activeProductIndex}
                slides={slides}
                handleSlideChange={changeProduct}
              />
            </div>

            <div className="home-hero__body">
              <div className="home-hero__body-inner row">
                <HomeHeroNav
                  products={products}
                  activeProductIndex={activeProductIndex}
                  changeProduct={changeProduct}
                  className="home-hero__nav col-12 order-sm-4 offset-sm-3 col-sm-4 order-lg-0 offset-lg-0 col-lg-10 col-xl-10"
                />
                <div className="home-hero__description-container order-1 col-9 offset-sm-1 col-sm-4 order-lg-1 offset-lg-0 col-lg-2 col-xl-2">
                  <ViewTransitionItem>
                    <p
                      className="home-hero__description text_description"
                      dangerouslySetInnerHTML={{
                        __html: t("pages:home.hero.description"),
                      }}
                    />
                  </ViewTransitionItem>
                </div>
                <HomeHeroSubNav
                  products={products}
                  activeProduct={products[activeProductIndex]}
                  className="home-hero__sub-nav order-0 col-12 offset-sm-1 col-sm-10 order-lg-2 offset-lg-0 col-lg-6 col-xl-6"
                />
              </div>
            </div>
            <div className="home-hero__footer">
              <div className="home-hero__footer-inner row">
                <Pagination
                  current={activeProductIndex + 1}
                  total={products.length}
                  className="home-hero__pagination col-auto col-lg-1"
                />
                <HomeHeroNext
                  products={products}
                  activeProductIndex={activeProductIndex}
                  changeProduct={changeProduct}
                  className="home-hero__next col-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  headerTheme: getHeaderTheme(state),
  homeHeroTheme: getHomeHeroTheme(state),
});

const mapDispatchToProps = {
  changeHeaderAndHomeHeroTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomeHero));
