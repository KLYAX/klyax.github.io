import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ProductsNav from "./ProductsNav";
import { useTranslation, withTranslation } from "react-i18next";
import { ViewTransitionItem } from "components/common";
import { AppPageTransitionContext } from "App";
import gsap from "gsap";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

/**
 * Компонент-страница со списком продукции
 *
 * @param {Object} props
 * @param {function} props.t - Функция для перевода текста на разные локали
 */
const Products = () => {
  const {
    enableScroll,
    disableScroll,
    getHeaderAppearTimeline,
    getOverlayDisappearTween,
  } = useContext(AppPageTransitionContext);
  const { t: translate } = useTranslation();
  const heroRef = useRef();

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "ease-out" } });

    const heroElem = heroRef.current;
    const titleElem = heroElem.querySelector(".products__title");
    const navGroups = heroElem.querySelectorAll(".products-nav-group");

    timeline.add(getOverlayDisappearTween(), "+=0.2");

    timeline.from(titleElem, {
      yPercent: 100,
    });

    timeline.addLabel("nagGroupsAppear");

    navGroups?.forEach((navGroup, i) => {
      const previewsElems = navGroup.querySelectorAll(".products-nav-group-preview");
      const previewsListElems = navGroup.querySelectorAll(".products-nav-group-preview__list");
      const categoryTitlesElems = navGroup.querySelectorAll(
        ".products-nav-group__title-container > *"
      );

      const subcategoriesElems = navGroup.querySelectorAll(".products-nav-group-nav");

      const navGroupTimeline = gsap.timeline({ defaults: { ease: "ease-out" } });

      navGroupTimeline.from(previewsElems, {
        yPercent: 100,
        stagger: 0.15,
        duration: 0.6,
        delay: i * 0.15,
      });

      navGroupTimeline.from(
        previewsListElems,
        {
          stagger: 0.15,
          duration: 0.6,
          scale: 1.5,
        },
        "<"
      );

      navGroupTimeline.from(categoryTitlesElems, {
        yPercent: 100,
      });

      navGroupTimeline.from(subcategoriesElems, {
        y: 50,
        stagger: 0.15,
        opacity: 0,
      });

      timeline.add(navGroupTimeline, "nagGroupsAppear");
    });

    timeline.add(getHeaderAppearTimeline(), "<");
    timeline.add(enableScroll);

    return () => {
      timeline.kill();
    };
  }, [enableScroll, getOverlayDisappearTween, getHeaderAppearTimeline]);

  return (
    <section ref={heroRef} className="products hero">
      <div className="products__container container">
        <div className="products__inner">
          <header className="products__header hero__header">
            <SlideUpOnScroll>
              <h2 className="products__title title title_section_primary">
                {translate("Products")}
              </h2>
            </SlideUpOnScroll>
          </header>
          <div className="products__body">
            <ProductsNav className="products__nav" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
