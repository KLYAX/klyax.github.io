import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import { getElemDataAfterTransformations } from "utils/dom";
import { AppearOnScroll, ViewTransitionItem } from "..";

import gsap from "gsap";
import { DEFAULT_VIEW_TRANSITION_TIMEOUT } from "utils/config";

/**
 * Создает табы
 */
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node,
    controls: PropTypes.arrayOf(PropTypes.string),
    initialTabIndex: PropTypes.number,
    innerPadding: PropTypes.bool,
    headerScroll: PropTypes.shape({
      md: PropTypes.bool,
    }),
  };

  static defaultProps = {
    initialTabIndex: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: this.props.initialTabIndex,
    };

    this.headerRef = React.createRef();
    this.tabsRef = React.createRef();
    this.slidingLineRef = React.createRef();

    this.controlClickHandler = this.controlClickHandler.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);

    this.activeControlEl = null;
  }

  handleWindowResize(e) {
    this.updateSlidingLineAndScrollPos();
  }

  initAnimation() {
    const slidingLineElem = this.slidingLineRef.current;

    gsap.from(slidingLineElem, {
      delay: DEFAULT_VIEW_TRANSITION_TIMEOUT / 1000 + 0.5,
      duration: 0.4,
      y: (_, target) => target.offsetHeight,
    });
  }

  componentDidMount() {
    this.updateSlidingLineAndScrollPos();
    this.initAnimation();

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  updateSlidingLineAndScrollPos() {
    if (this.activeControlEl) {
      const activeControlElLabel = this.activeControlEl.children[0];
      const headerScrollLeft = this.activeControlEl.parentElement.offsetLeft;

      this.setSlidingLine(activeControlElLabel, false);
      this.smoothScrollHeaderLeft(headerScrollLeft, 0);
    }
  }

  /**
   * Плавно скроллит хедер по x на кол-во пикселей px
   *
   * @param {number} px - Кол-во пикселей на которое нужно проскроллить
   */
  smoothScrollHeaderLeft(px, duration = 400) {
    $(this.headerRef.current).animate(
      {
        scrollLeft: px,
      },
      duration
    );
  }

  /**
   * Устанавливает подчеркивающую линий под элементом el
   *
   * @param {HTMLElement} el - Элемент под которым нужно установить подчеркивающую линий
   * @param {boolean=} afterTransforms - Если установленно в true,
   *  тогда будут рассчитаны параметры элементов (ширина и позиция слева)
   *  с учетом ранее примененных трансформаций
   */
  setSlidingLine(el, withDuration = true) {
    const slidingLineElem = this.slidingLineRef.current;
    // Находим ширину и позицию слева, после применения трансформаций (transform: scale)
    const { width, left } = getElemDataAfterTransformations(el, (elAfterTransformations) => {
      return elAfterTransformations.getBoundingClientRect();
    });

    // Отступы от экрана до компонента
    const leftPadding = this.tabsRef.current.getBoundingClientRect().left;
    // Новая позиция линии
    const x = this.headerRef.current.scrollLeft + left - leftPadding;

    gsap.to(slidingLineElem, {
      x,
      width,
      duration: withDuration ? 0.5 : 0,
      ease: "ease-out",
    });
  }

  /**
   * Обработчик нажатий по контрлам табов
   *
   * @param {object} e
   */
  controlClickHandler(e) {
    e.preventDefault();

    const { currentTarget } = e;

    const tabIndex = +currentTarget.dataset["index"];

    // Меняем таб, если индекс копки на который было
    if (this.state.activeTabIndex !== tabIndex) {
      this.setState(
        {
          activeTabIndex: tabIndex,
        },
        // Устанавливаем линию под текстом контрола в коллбэке,
        // так как нам нужно сначала установить активный класс,
        // который применяет трансформации текста.
        // После чего можно будет рассчитывать новые параметры линии,
        // основываясь новых на размерах и позиции текста контрола
        () => {
          const label = currentTarget.children[0];

          this.setSlidingLine(label);

          ScrollTrigger.refresh();
        }
      );
    }

    // Новая позиция скролла хедера по x
    const headerScrollLeft = currentTarget.parentElement.offsetLeft;

    this.smoothScrollHeaderLeft(headerScrollLeft);
  }

  render() {
    const { activeTabIndex } = this.state;
    const { controls, innerPadding, children } = this.props;

    return (
      <div ref={this.tabsRef} className={classNames("tabs", this.props.className)}>
        <div className="tabs__inner">
          <div
            ref={this.headerRef}
            className={classNames("tabs__header", {
              "tabs__header_scroll-md": this.props.headerScroll && this.props.headerScroll.md,
            })}
          >
            <div className="tabs__header-inner">
              <AppearOnScroll overflow={false}>
                <ViewTransitionItem tag="ul" overflow={false} className="tabs__controls list">
                  {controls.map((control, i) => (
                    <li
                      key={i}
                      style={{ zIndex: i }}
                      className={classNames("tabs__control-container", {
                        container: innerPadding,
                      })}
                    >
                      <button
                        className={classNames("tabs__control", {
                          active: i === activeTabIndex,
                        })}
                        ref={(el) =>
                          (this.activeControlEl = i === activeTabIndex ? el : this.activeControlEl)
                        }
                        data-index={i}
                        onClick={this.controlClickHandler}
                      >
                        <span className="tabs__control-label">{control}</span>
                      </button>
                    </li>
                  ))}
                </ViewTransitionItem>
              </AppearOnScroll>

              <div ref={this.slidingLineRef} className="tabs__sliding-line" />
            </div>

            <div className="tabs__header-border-line" />
          </div>
          <div className="tabs__body">
            <div
              className={classNames("tabs__body-inner", {
                container: innerPadding,
              })}
            >
              <ul className="tabs__list list">
                {React.Children.map(children, (child, i) =>
                  React.cloneElement(child, {
                    active: i === activeTabIndex,
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
