import React, { Component, useEffect, useState } from "react";
import classNames from "classnames";
import { Icon, ViewTransitionItem, TransitionItem } from "components/common";
import { usePrevious } from "hooks/usePrevious";
import { useTranslation } from "react-i18next";
import SlideInOutOnChange from "../SlideInOutOnChange/SlideInOutOnChange";

const DIR_UP = -1;
const DIR_DOWN = 1;

/**
 * Создает кнопку к след. продукту
 */
const NextToBtn = ({ labels, activeIndex, onChange, className }) => {
  const { t: translate } = useTranslation();
  const [nextIndex, setNextIndex] = useState(0);
  const [dir, setDir] = useState(DIR_DOWN);
  const prevIndex = usePrevious(activeIndex);

  useEffect(() => {
    const lastIndex = labels.length - 1;

    if (activeIndex !== prevIndex || prevIndex === nextIndex) {
      // находим направление по которому идет выбор продукта в навигации
      const dir = Math.sign(activeIndex - prevIndex);

      // если индекс текущего продукта равен индексу первого продукта
      // или индекс текущего продукта меньше последнего индекса продукта и
      // направление выбора продукта идет вверх, тогда мы меняем направление на противоположное
      // и устанавливаем индекс след. продукта равного индексу активного продукта + 1
      if (activeIndex === 0 || (activeIndex < lastIndex && dir > 0)) {
        setDir(DIR_DOWN);
        setNextIndex(activeIndex + 1);
      }
      // если индекс текущего продукта равен индексу последнего продукта
      // или индекс текущего продукта больше индекса первого продукта и
      // направление выбора продукта в навигации идет вниз, тогда мы меняем направление на противоположное
      // и устанавливаем индекс след. продукта равного индексу активного продукта - 1
      else if (activeIndex === lastIndex || (activeIndex > 0 && dir < 0)) {
        setDir(DIR_UP);
        setNextIndex(activeIndex - 1);
      }
    }
  }, [activeIndex, labels.length, nextIndex, prevIndex]);

  const nextLabel = labels[nextIndex];
  const dirLabel = dir === -1 ? "Up to" : "Down to";

  return (
    <div className={classNames("next-to-btn", className)}>
      <div className="next-to-btn__inner">
        <div className="next-to-btn__dir-container">
          <div className="next-to-btn__dir caption">
            <SlideInOutOnChange trigger={dir}>
              <span className="next-to-btn__dir-label">{translate(dirLabel)}</span>
            </SlideInOutOnChange>
          </div>
        </div>
        <div className="next-to-btn__button-container">
          <button
            className="next-to-btn__button button link_nav link_with-arrow-icon-and-overflow"
            onClick={() => onChange(nextIndex)}
          >
            <SlideInOutOnChange trigger={nextIndex}>
              <span className="next-to-btn__button-label">
                {nextLabel}
                <Icon name="link-arrow-up" className="link__arrow-icon" />
              </span>
            </SlideInOutOnChange>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextToBtn;
