import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon, ViewTransitionItem, TransitionItem } from "components/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getHomeActiveProductIndex, getProducts } from "store/selectors/app";

export const DIRECTION_LABELS = ["Down to", "Up to"];
export const DIRECTION = {
  DOWN: 0,
  UP: 1,
};

/**
 * Создает кнопку к след. продукту
 */
class HomeHeroNext extends Component {
  static propTypes = {
    /**
     * Класс
     */
    className: PropTypes.string,
    t: PropTypes.func,
    products: PropTypes.arrayOf(PropTypes.object),
    activeProductIndex: PropTypes.number,
    changeProduct: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      directions: [
        props.t(DIRECTION_LABELS[DIRECTION.DOWN]),
        props.t(DIRECTION_LABELS[DIRECTION.UP]),
      ],
      activeDir: DIRECTION.DOWN,
      nextProductIndex: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const activeProductIndex = this.props.activeProductIndex;
    const lastProductIndex = this.props.products.length - 1;
    const prevProductIndex = prevProps.activeProductIndex;

    // если текущий продукт не равен предыдущему продукту
    // или предыдущий продукт равен следующему продукту тогда обновляем состояние
    if (
      activeProductIndex !== prevProductIndex ||
      prevProductIndex === this.state.nextProductIndex
    ) {
      // находим направление по которому идет выбор продукта в навигации
      const dir = Math.sign(activeProductIndex - prevProductIndex);

      // если индекс текущего продукта равен индексу первого продукта
      // или индекс текущего продукта меньше последнего индекса продукта и
      // направление выбора продукта идет вверх, тогда мы меняем направление на противоположное
      // и устанавливаем индекс след. продукта равного индексу активного продукта + 1
      if (activeProductIndex === 0 || (activeProductIndex < lastProductIndex && dir > 0)) {
        this.setState({
          activeDir: DIRECTION.DOWN,
          nextProductIndex: activeProductIndex + 1,
        });
      }
      // если индекс текущего продукта равен индексу последнего продукта
      // или индекс текущего продукта больше индекса первого продукта и
      // направление выбора продукта в навигации идет вниз, тогда мы меняем направление на противоположное
      // и устанавливаем индекс след. продукта равного индексу активного продукта - 1
      else if (activeProductIndex === lastProductIndex || (activeProductIndex > 0 && dir < 0)) {
        this.setState({
          activeDir: DIRECTION.UP,
          nextProductIndex: activeProductIndex - 1,
        });
      }
    }
  }

  render() {
    const { products, className, t, changeProduct } = this.props;
    const { directions, activeDir, nextProductIndex } = this.state;

    const direction = directions[activeDir];
    const nextProduct = products[nextProductIndex] || {};

    return (
      <div className={classNames("home-hero-next", className)}>
        <div className="home-hero-next__inner">
          <div className="home-hero-next__direction-container">
            <ViewTransitionItem>
              <span className="home-hero-next__direction home-hero__next-direction caption">
                <TransitionItem tag="span" trigger={direction}>
                  <span className="home-hero-next__direction-label">{direction}</span>
                </TransitionItem>
              </span>
            </ViewTransitionItem>
          </div>
          <div className="home-hero-next__button-container">
            <ViewTransitionItem>
              <button
                className="home-hero-next__button home-hero__next-button button link_nav link_with-arrow-icon-and-overflow"
                onClick={() => changeProduct(nextProductIndex)}
              >
                <TransitionItem tag="span" trigger={nextProduct.id}>
                  <span className="home-hero-next__button-label">
                    {t(nextProduct.name)}
                    <Icon name="link-arrow-up" className="link__arrow-icon" />
                  </span>
                </TransitionItem>
              </button>
            </ViewTransitionItem>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(HomeHeroNext);
