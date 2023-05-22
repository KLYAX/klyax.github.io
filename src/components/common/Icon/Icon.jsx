import { ReactComponent as LogoIcon } from "./svg-icons/logo.svg";
import { ReactComponent as LinkArrowUpBold } from "./svg-icons/link-arrow-up-bold.svg";
import { ReactComponent as LinkArrowUpMedium } from "./svg-icons/link-arrow-up-medium.svg";
import { ReactComponent as LinkArrowUp } from "./svg-icons/link-arrow-up.svg";
import { ReactComponent as TriangleLeft } from "./svg-icons/triangle-left.svg";
import { ReactComponent as TriangleRight } from "./svg-icons/triangle-right.svg";
import { ReactComponent as ArrowDown } from "./svg-icons/arrow-down.svg";
import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef } from "react";

/**
 * Объект хранящий доступные svg иконки в формате:
 * ключ - имя иконки,
 * значение - компонент иконки
 */
const icons = {
  logo: LogoIcon,
  "link-arrow-up-bold": LinkArrowUpBold,
  "link-arrow-up-medium": LinkArrowUpMedium,
  "link-arrow-up": LinkArrowUp,
  "triangle-left": TriangleLeft,
  "triangle-right": TriangleRight,
  "arrow-down": ArrowDown,
};

/**
 * Компонент иконки
 *
 * @param {object} props
 * @param {('logo'|'link-arrow-up-bold')} props.name - Имя иконки
 * @param {string} [props.className] - Класс иконки
 */
const Icon = forwardRef(({ name, className }, ref) => {
  const SpecificIcon = icons[name];

  return (
    SpecificIcon && (
      <SpecificIcon
        ref={ref}
        aria-hidden
        className={classNames("icon", `icon_${name}`, className)}
      />
    )
  );
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
