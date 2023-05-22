import React, { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import classNames from "classnames";

import HomeHeroSlider from "./HomeHeroSlider";
import HomeHeroNav from "./HomeHeroNav";
import HomeHeroSubNav from "./HomeHeroSubNav";
import { NextToBtn, Pagination } from "components/common";
import { useTranslation } from "react-i18next";

import Color from "color";

import { Theme } from "config";
import { AppThemeContext } from "App";
import { BodyScrollContext } from "App";
import { buildProductImageSrc } from "utils/path";

const HomeHero = forwardRef(
  ({ productsCategories = [], activeProductIndex, changeProduct }, ref) => {
    const { disableScroll, enableScroll, scrollbarGap } = useContext(BodyScrollContext);

    const { homeHeroTheme, setHeaderTheme, setHomeHeroTheme } = useContext(AppThemeContext);

    const handleSlideChange = useCallback(
      (index) => {
        changeProduct(index);
      },
      [changeProduct]
    );

    const { t } = useTranslation();
    const slides = useMemo(
      () =>
        productsCategories.map((category) => {
          const categoryImageHome = category.image?.home;

          return {
            image: {
              src: categoryImageHome?.src
                ? categoryImageHome?.src
                : buildProductImageSrc({
                    path: category.id,
                    file: {
                      name: "home",
                      ext: "png",
                      ...categoryImageHome,
                    },
                  }),
              alt: categoryImageHome?.alt || category.name,
            },
            color: category.color,
          };
        }),
      [productsCategories]
    );
    const nextToBtnLabels = useMemo(() => productsCategories.map((product) => t(product.name)), [
      productsCategories,
      t,
    ]);

    useEffect(() => {
      const activeProduct = productsCategories[activeProductIndex];

      if (!activeProduct) {
        return;
      }

      // if (activeProduct.color) {
      //   if (homeHeroTheme.theme === Theme.DARK) {
      //     setHeaderTheme(Theme.LIGHT);
      //     setHomeHeroTheme(Theme.LIGHT);
      //   }
      // } else {
      //   if (homeHeroTheme.theme === Theme.LIGHT) {
      //     setHeaderTheme(Theme.DARK);
      //     setHomeHeroTheme(Theme.DARK);
      //   }
      // }
    }, [activeProductIndex, productsCategories, homeHeroTheme, setHomeHeroTheme, setHeaderTheme]);

    return (
      <section
        ref={ref}
        className={classNames("home-hero block-divider theme", {
          [`theme_${homeHeroTheme.theme}`]: homeHeroTheme.theme,
          [`theme_changing`]: homeHeroTheme.isChanging,
        })}
      >
        <div className="home-hero__container container">
          <div className="home-hero__inner">
            <div className="home-hero__background home-hero-background">
              <div className="home-hero-background__layer" />
              <HomeHeroSlider
                slides={slides}
                activeSlideIndex={activeProductIndex}
                scrollbarGap={scrollbarGap}
                enableScroll={enableScroll}
                disableScroll={disableScroll}
                changeSlide={handleSlideChange}
              />
            </div>

            <div className="home-hero__body">
              <div className="home-hero__body-inner row">
                <HomeHeroNav
                  productsCategories={productsCategories}
                  activeProductIndex={activeProductIndex}
                  changeProduct={changeProduct}
                  className="home-hero__nav col-12 order-sm-4 offset-sm-3 col-sm-4 order-lg-0 offset-lg-0 col-lg-10 col-xl-10"
                />
                <div className="home-hero__description-container order-1 col-9 offset-sm-1 col-sm-4 order-lg-1 offset-lg-0 col-lg-2 col-xl-2">
                  <p className="home-hero__description text_description">
                    {t("pages:home.hero.description")}
                  </p>
                </div>
                <HomeHeroSubNav
                  productsCategories={productsCategories}
                  activeProduct={productsCategories[activeProductIndex]}
                  className="home-hero__sub-nav order-0 col-12 offset-sm-1 col-sm-10 order-lg-2 offset-lg-0 col-lg-6 col-xl-6"
                />
              </div>
            </div>
            <div className="home-hero__footer">
              <div className="home-hero__footer-inner row">
                <Pagination
                  current={activeProductIndex + 1}
                  total={productsCategories.length}
                  className="home-hero__pagination col-auto col-lg-1"
                />
                <NextToBtn
                  labels={nextToBtnLabels}
                  activeIndex={activeProductIndex}
                  onChange={changeProduct}
                  className="home-hero__next-to-btn col-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default HomeHero;
