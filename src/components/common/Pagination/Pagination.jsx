import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TransitionItem } from "..";
import { AnimatePresence, motion } from "framer-motion";
import SlideInOutOnChange from "../SlideInOutOnChange/SlideInOutOnChange";

/**
 * Компонент создает нумерацию страниц
 */
class Pagination extends Component {
  static propTypes = {
    /**
     * Текущая страница
     */
    current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Всего страниц
     */
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Класс
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    current: 0,
    total: 0,
  };

  render() {
    const { current, total, className } = this.props;

    return (
      <div className={classNames("pagination", className)}>
        <div className="pagination__inner">
          <div className="pagination__item pagination__current-container text_mono text_bold">
            <div className="pagination__current">
              <SlideInOutOnChange trigger={current}>
                <span className="pagination__current-text">{current}</span>
              </SlideInOutOnChange>
              {/* <TransitionItem tag="span" trigger={current}>
                <span className="pagination__current-text">{current}</span>
              </TransitionItem> */}
            </div>
          </div>
          <span className="pagination__item pagination__total-container text_mono">
            <span className="pagination__total">{total}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Pagination;
