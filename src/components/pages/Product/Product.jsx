import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import UseCases from "./UseCases/UseCases";
import ProductHero from "./ProductHero/ProductHero";
import ProductAdvantages from "./ProductAdvantages/ProductAdvantages";
import Features from "./Features/FeaturesNew";
import Manufacture from "./Manufacture/Manufacture";
import { Footer } from "components/layouts";
import {
  withRouter,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
  generatePath,
} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import notFoundRoute from "routes/notFound";
import { getProducts } from "store/selectors/app";
import productPageData from "data/pages/product";
import { AppPageTransitionContext } from "App";
import gsap from "gsap";
import { BodyScrollContext } from "App";
import { AppThemeContext } from "App";
import { Theme } from "config";
import { AppColor } from "config";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const findByIdKeyValue = (arrWithObjects, idKeyValue) =>
  arrWithObjects.find((arrItem) => arrItem.id === idKeyValue);

const Product = (props) => {
  const categories = useSelector(getProducts);
  const { setHeaderTheme } = useContext(AppThemeContext);
  const { categoryId, subcategoryId, productId } = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const activeCategory = useMemo(() => {
    return Array.isArray(categories) && findByIdKeyValue(categories, categoryId);
  }, [categoryId, categories]);

  const activeSubcategory = useMemo(() => {
    if (!activeCategory || (activeCategory && !Array.isArray(activeCategory.subcategories))) {
      return;
    }

    return subcategoryId !== undefined
      ? findByIdKeyValue(activeCategory.subcategories, subcategoryId)
      : activeCategory.subcategories[0];
  }, [activeCategory, subcategoryId]);

  const activeProduct = useMemo(() => {
    if (activeCategory && activeCategory.product) {
      return activeCategory.product;
    }

    if (!activeSubcategory || (activeSubcategory && !Array.isArray(activeSubcategory.products))) {
      return;
    }

    return productId !== undefined
      ? findByIdKeyValue(activeSubcategory.products, productId)
      : activeSubcategory.products[0];
  }, [activeSubcategory, productId, activeCategory]);

  const changeProduct = useCallback(
    ({ subcategoryId, productId }) => {
      if (
        activeProduct &&
        activeProduct.id === productId &&
        activeSubcategory &&
        activeSubcategory.id === subcategoryId
      ) {
        return;
      }

      const path = generatePath(match.path, {
        ...match.params,
        subcategoryId,
        productId,
      });

      if (path !== match.url) {
        history.replace(path);
      }
    },
    [history, match, activeProduct, activeSubcategory]
  );

  // animation

  const { enableScroll, disableScroll } = useContext(BodyScrollContext);

  const { getHeaderAppearTimeline, getOverlayDisappearTween } = useContext(
    AppPageTransitionContext
  );

  // animation
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = (timelineRef.current = gsap.timeline());
    const heroElem = heroRef.current;

    if (!heroElem) {
      return;
    }

    const heroAsideElem = heroElem.querySelector(".control-cabinets__aside");
    const heroSliderElem = heroElem.querySelector(".control-cabinets__slider");
    const heroSliderActiveSlide = heroSliderElem.querySelector(".swiper-slide-active");
    const heroHeaderNavTargets = heroElem.querySelectorAll(
      ".control-cabinets-product-types-nav .view-transition-item > *"
    );
    const heroSliderActiveSlideImage = heroSliderActiveSlide.querySelector(
      ".control-cabinets-slider-slide__image"
    );
    const heroNavSlidingLineElem = heroElem.querySelector(
      ".control-cabinets-product-types-nav__sliding-line"
    );

    const heroTitleElem = heroElem.querySelector(".control-cabinets-header__title-text");
    const heroHeaderDetails = heroElem.querySelector(".control-cabinets-header__details");

    const heroHeaderDescriptionElems = heroElem.querySelectorAll(
      ".control-cabinets-description__header .slide-in-out-on-change__target > *"
    );

    const heroHeaderAccordionsSummaryElems = heroElem.querySelectorAll(
      ".control-cabinets-description__accordions .container_overflow-hidden > .accordion__summary > *"
    );

    const heroHeaderAccordionsArrowElems = heroElem.querySelectorAll(
      ".control-cabinets-description__accordions .container_overflow-hidden > .accordion__toggle > * > *"
    );

    const heroTargetsElems = heroElem.querySelectorAll(".view-transition-item > *");
    const isVerticalLayout = matchMedia("(max-width: 1199px)").matches;

    timeline.add(() => {
      setHeaderTheme(Theme.DARK);
    });

    if (isVerticalLayout) {
      timeline.add(
        getOverlayDisappearTween({
          from: { zIndex: 500 },
          to: { duration: 0, delay: 0.8, zIndex: 500 },
        })
      );

      timeline
        .from(heroSliderElem, {
          duration: 1.4,
          maxHeight: "100vh",
          ease: "ease-out",
        })
        .set(heroSliderElem, {
          maxHeight: "",
        });

      timeline.from(
        heroSliderActiveSlideImage,
        {
          yPercent: 10,
          opacity: 0,
          scale: 1.25,
          duration: 0.6,
          ease: "ease-out",
        },
        "-=0.7"
      );
    } else {
      const overlayColor =
        activeProduct?.color || activeSubcategory?.color || activeCategory?.color || AppColor.GRAY;

      // console.log(activeProduct);
      timeline.add(
        getOverlayDisappearTween({
          from: {
            scaleX: 1,
            scaleY: 1,
            zIndex: 500,
            display: "block",
            backgroundColor: overlayColor,
          },
          to: { duration: 1.4, delay: 0.4, scaleX: 0, scaleY: 1, zIndex: 500, display: "none" },
        })
      );

      timeline.addLabel("startAppear");

      timeline.from(
        heroAsideElem,
        {
          width: "100%",
          position: "absolute",
          right: 0,
          top: 0,
          maxWidth: "100%",
          duration: 1.2,
        },
        "-=1"
      );

      timeline.set(heroAsideElem, {
        clearProps: "all",
      });

      timeline.fromTo(
        heroSliderActiveSlideImage,
        {
          xPercent: -20,
          yPercent: 10,
          opacity: 0,
          scale: 1.25,
        },
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
        }
      );
    }

    const slideUpWithStagger = {
      yPercent: 100,
      stagger: 0.15,
    };

    timeline.from(
      heroTitleElem,
      {
        yPercent: 100,
      },
      "startAppear"
    );

    if (heroHeaderDetails) {
      timeline.from(
        heroHeaderDetails,
        {
          y: 50,
          opacity: 0,
        },
        "-=0.4"
      );
    }

    timeline.from(
      heroNavSlidingLineElem,
      {
        y: 6,
      },
      "startAppear"
    );

    timeline.from(
      heroHeaderNavTargets,
      {
        yPercent: 100,
        stagger: 0.05,
      },
      "startAppear"
    );

    if (heroHeaderDescriptionElems) {
      timeline.from(heroHeaderDescriptionElems, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
      });
    }

    timeline.from(heroHeaderAccordionsSummaryElems, slideUpWithStagger, "<");
    timeline.from(heroHeaderAccordionsArrowElems, slideUpWithStagger, "<");

    timeline.add(getHeaderAppearTimeline());

    timeline.add(enableScroll);
    timeline.add(ScrollTrigger.refresh);

    return () => {
      timeline.kill();
    };
  }, [enableScroll, getOverlayDisappearTween, getHeaderAppearTimeline, setHeaderTheme]);

  const categoryProductPageContent = activeCategory.pageContent?.product;

  const { features } = productPageData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, subcategoryId, productId]);

  return activeProduct ? (
    <div className={classNames("product", `product_category-${activeCategory.id}`)}>
      <ProductHero
        ref={heroRef}
        isCategoryProduct={!!activeCategory.product}
        activeCategory={activeCategory}
        activeSubcategory={activeSubcategory}
        activeProduct={activeProduct}
        changeActiveProduct={changeProduct}
      />

      {categoryProductPageContent && (
        <>
          {/* {categoryProductPageContent.useCases && (
            <UseCases {...categoryProductPageContent.useCases} />
          )} */}
          {categoryProductPageContent.advantages && (
            <ProductAdvantages {...categoryProductPageContent.advantages} />
          )}
        </>
      )}
      <Features {...features} />

      <Manufacture category={activeCategory} />
      <Footer />
    </div>
  ) : (
    <Redirect to={notFoundRoute.path} />
  );
};

export default Product;
