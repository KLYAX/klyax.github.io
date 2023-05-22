import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ViewTransitionItem } from "components/common";

/**
 * Компонент создает список состоящий из элементов items
 *
 * @param {Object} props
 * @param {string[]} props.items - Элементы списка
 * @param {string} props.className - Класс
 */
const List = ({ items = [], className, itemClassName, children, marked }) => {
  return (
    <ul className={classNames("list", className)}>
      {items.map((item, i) => {
        const computedItemClassName =
          typeof itemClassName === "function" ? itemClassName(item, i) : itemClassName;

        const child = typeof children === "function" ? children(item, i) : item;

        return (
          <ViewTransitionItem
            tag="li"
            key={i}
            className={classNames("list__item", computedItemClassName)}
          >
            {marked ? (
              <div className="list__item-container container_overflow-hidden">
                <div className="list__item-inner">{child}</div>
              </div>
            ) : (
              <>{child}</>
            )}
          </ViewTransitionItem>
        );
      })}
    </ul>
  );
};

export default List;
