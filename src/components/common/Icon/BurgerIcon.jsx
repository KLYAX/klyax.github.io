import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * Компонент иконка-бургер
 *
 * @param {Object} props
 * @param {boolean} [props.active] - Если true, тогда меняет вид бургера на крест
 * @param {string} [props.className] - Класс иконки
 */
function BurgerIcon({ active, className }) {
  return (
    <span className={classNames("burger-icon", className, { active })}>
      <span className="burger-icon__line burger-icon__line_top"></span>
      <span className="burger-icon__line burger-icon__line_bottom"></span>
    </span>
  );
}

BurgerIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
};

export default BurgerIcon;
