import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppearOnScroll, Icon, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "../RevaelOnScroll/SlideUpOnScroll";

/**
 * Компоненте рендерит кнопки управление слайдером (пред., след.) и таймер
 *
 * @param {Object} props
 * @param {string} props.timer - Таймер который будет обновляться
 * @param {Object} [props.verticalButtons={}] - Устанавливает кнопки слайдера в вертикальное положение
 * @param {boolean} [props.verticalButtons.sm] - Устанавливает кнопки слайдера в вертикальное положение при ширине экрана меньше или равному 575px
 * @param {boolean} [props.verticalButtons.md] - Устанавливает кнопки слайдера в вертикальное положение при ширине экрана меньше или равному 767px
 * @param {Object} [props.hideTimer={}] - Прячет таймер
 * @param {boolean} [props.hideTimer.sm] - Прячет таймер при ширине экрана меньше или равному 575px
 * @param {boolean} [props.hideTimer.md] - Прячет таймер при ширине экрана меньше или равному 767px
 */
function SlideSwitch({ timer, className, verticalButtons, hideTimer }) {
  return (
    <div
      className={classNames(
        "slide-switch",
        {
          "slide-switch_sm_vertical-buttons": verticalButtons.sm,
          "slide-switch_md_vertical-buttons": verticalButtons.md,
          "slide-switch_sm_hide-timer": hideTimer.sm,
          "slide-switch_md_hide-timer": hideTimer.md,
        },
        className
      )}
    >
      <SlideUpOnScroll>
        <div className="slide-switch__inner">
          <div className="slide-switch__buttons">
            <button className="slide-switch__button slide-switch__button_prev button">
              <Icon name="triangle-left" className="slide-switch__button-icon" />
            </button>
            <button className="slide-switch__button slide-switch__button_next button">
              <Icon name="triangle-right" className="slide-switch__button-icon" />
            </button>
          </div>
          <div className="slide-switch__timer-container">
            <p className="slide-switch__timer">{timer}</p>
          </div>
        </div>
      </SlideUpOnScroll>
    </div>
  );
}

SlideSwitch.propTypes = {
  timer: PropTypes.string,
  className: PropTypes.string,
  verticalButtons: PropTypes.shape({
    md: PropTypes.bool,
    sm: PropTypes.bool,
  }),
  hideTimer: PropTypes.shape({
    md: PropTypes.bool,
    sm: PropTypes.bool,
  }),
};

SlideSwitch.defaultProps = {
  timer: "00:00",
  verticalButtons: {},
  hideTimer: {},
};

export default SlideSwitch;
