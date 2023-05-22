import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import { ViewTransitionItem } from "components/common";
import { withRouter } from "react-router-dom";
import ProductHeroSubNav from "./ProductHeroSubNav";
import { getElemDataAfterTransformations } from "utils/dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

class ProductHeroNav extends Component {
  static propTypes = {
    items: PropTypes.array,
    activeItemIndex: PropTypes.number,
    t: PropTypes.func,
    updateProductRoute: PropTypes.func,
    match: PropTypes.object,
    scrollRef: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      slidingLine: {
        width: 0,
        x: 0,
      },
    };

    this.navListRef = createRef();
    this.scrollRef = createRef();
    this.slidingLineRef = createRef();
    this.activeSubcategoryBtnRef = createRef();

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeSubcategory.id !== prevProps.activeSubcategory.id) {
      this.updateSlidingLineAndScrollPosition();
    }
  }

  componentDidMount() {
    const activeSubcategoryBtnElem = this.activeSubcategoryBtnRef.current;

    if (activeSubcategoryBtnElem) {
      this.setSlidingLine({ underElem: activeSubcategoryBtnElem, duration: 0 });
      this.updateNavScrollPos(0);
    }

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize(e) {
    const activeSubcategoryBtnElem = this.activeSubcategoryBtnRef.current;

    if (activeSubcategoryBtnElem) {
      this.setSlidingLine({ underElem: activeSubcategoryBtnElem, duration: 0 });
      this.updateNavScrollPos(0);
    }
  }

  /**
   * Обновляет подчеркивающую линию под лэйблом активного контрола
   */
  updateSlidingLineAndScrollPosition() {
    const activeSubcategoryBtnElem = this.activeSubcategoryBtnRef.current;

    if (activeSubcategoryBtnElem) {
      // const activeControlElLabel = this.activeControlEl.children[0];

      this.setSlidingLine({ underElem: activeSubcategoryBtnElem, afterTransforms: true });

      this.updateNavScrollPos();
    }
  }

  /**
   * Плавно скроллит хедер по x на кол-во пикселей px
   *
   * @param {number} px - Кол-во пикселей на которое нужно проскроллить
   */
  updateNavScrollPos(duration = 0.8) {
    const activeSubcategoryBtnElem = this.activeSubcategoryBtnRef.current;

    if (activeSubcategoryBtnElem) {
      const scrollElem = this.scrollRef.current;
      const x = activeSubcategoryBtnElem.parentNode.offsetLeft;

      if (duration) {
        gsap.to(scrollElem, {
          scrollTo: {
            autoKill: true,
            x,
          },
          duration,
          ease: "ease-out",
        });
      } else {
        gsap.set(scrollElem, {
          scrollTo: {
            x,
          },
        });
      }
    }
  }

  /**
   * Устанавливает подчеркивающую линий под элементом el
   *
   * @param {HTMLElement} el - Элемент под которым нужно установить подчеркивающую линий
   * @param {boolean=} afterTransforms - Если установленно в true,
   *  тогда будут рассчитаны параметры элементов (ширина и позиция слева)
   *  с учетом ранее примененных трансформаций
   */
  setSlidingLine({ underElem, duration = 0.8 }) {
    // Находим ширину и позицию слева, после применения трансформаций (transform: scale)
    // const { width, left } = afterTransforms
    //   ? getElemDataAfterTransformations(underElem, (elAfterTransformations) => {
    //       return elAfterTransformations.getBoundingClientRect();
    //     })
    //   : underElem.getBoundingClientRect();

    const width = underElem.offsetWidth;
    const { left } = underElem.getBoundingClientRect();

    const scrollElem = this.scrollRef.current;
    const slidingLineElem = this.slidingLineRef.current;

    // позиция скролла
    const scrollPos = scrollElem ? scrollElem.scrollLeft : 0;

    // Новая позиция линии
    const x = scrollPos + left;

    if (duration) {
      gsap.to(slidingLineElem, {
        width,
        x,
        duration,
        ease: "ease-out",
      });
    } else {
      gsap.set(slidingLineElem, { x, width });
    }
  }

  render() {
    const {
      t,
      changeActiveProduct,

      activeCategory,
      activeSubcategory,
      activeProduct,
    } = this.props;

    const subcategoryMaxWidth = (1 / activeCategory.subcategories.length) * 100 + "%";

    return (
      <div ref={this.scrollRef} className="control-cabinets-header__body">
        <div className="control-cabinets-header__body-inner">
          <nav className="control-cabinets-header__navs">
            <div className="control-cabinets__product-types-nav control-cabinets-product-types-nav block-divider container">
              <ViewTransitionItem
                tag="ul"
                ref={this.navListRef}
                className="control-cabinets-product-types-nav__list list row"
              >
                {activeCategory.subcategories.map((subcategory, i) => {
                  const active = activeSubcategory.id === subcategory.id;

                  return (
                    <li
                      style={{ maxWidth: subcategoryMaxWidth }}
                      key={subcategory.id}
                      className="control-cabinets-product-types-nav__list-item col-9 col-md"
                    >
                      <button
                        ref={(elem) => active && (this.activeSubcategoryBtnRef.current = elem)}
                        onClick={() => {
                          changeActiveProduct({ subcategoryId: subcategory.id });
                        }}
                        className={classNames("control-cabinets-product-types-nav__link button", {
                          "control-cabinets-product-types-nav__link_active": active,
                        })}
                      >
                        {t(subcategory.name)}
                      </button>
                    </li>
                  );
                })}
              </ViewTransitionItem>

              <div
                ref={this.slidingLineRef}
                className="control-cabinets-product-types-nav__sliding-line"
              />
            </div>
            <ProductHeroSubNav
              activeSubcategory={activeSubcategory}
              activeProduct={activeProduct}
              activeCategory={activeCategory}
              changeProduct={changeActiveProduct}
            />
          </nav>
        </div>
      </div>
    );
  }
}

export default withTranslation()(withRouter(ProductHeroNav));
