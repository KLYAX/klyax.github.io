import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerRefreshTimeoutId = null;

/**
 * Заменяет дочерний элемент с анимацией
 *
 * @param {object} props
 * @param {string} props.tag - Тэг
 * @param {string} props.trigger - Уникальное значение при изменении которого будет запускаться анимация
 * @param {string} props.children - Элемент который будет анимироваться
 * @param {string} props.className - Класс
 */
function TransitionItem({ tag: TagName, trigger, type, children, className }) {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={trigger}
        classNames={type}
        onExited={() => {
          if (scrollTriggerRefreshTimeoutId) {
            clearTimeout(scrollTriggerRefreshTimeoutId);
          }

          scrollTriggerRefreshTimeoutId = setTimeout(() => {
            ScrollTrigger.refresh();
            scrollTriggerRefreshTimeoutId = null;
          }, 400);
        }}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
      >
        <TagName className={classNames("transition-item", className)}>
          {children}
        </TagName>
      </CSSTransition>
    </SwitchTransition>
  );
}

TransitionItem.propTypes = {
  tag: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  children: PropTypes.element,
};

TransitionItem.defaultProps = {
  type: "slide-up",
  tag: "div",
};

export default TransitionItem;
