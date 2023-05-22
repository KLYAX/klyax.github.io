import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { withTranslation } from "react-i18next";
import { AppearOnScroll } from "components/common";

/**
 * Компонент создает навигацию для футера
 *
 * @param {Object} props
 * @param {string} props.title - Заголовок навигации
 * @param {Object[]} props.navItems - Элементы навигации
 * @param {string} props.navItems[].link - Ссылка
 * @param {string} props.navItems[].label - Подпись ссылки
 * @param {string} [props.className] - Класс
 */
function FooterNav({ title, navItems, className, t }) {
  return (
    <nav className={classNames("footer-nav", className)}>
      <div className="footer-nav__inner row">
        <div className="footer-nav__header col-12 col-xl-4">
          <AppearOnScroll>
            <h3 className="footer-nav__title">{t(title)}</h3>
          </AppearOnScroll>
        </div>
        <div className="footer-nav__body col-12 col-xl-8">
          <ul className="footer-nav__list list">
            {navItems.map((navItem, i) => (
              <li key={i} className="footer-nav__item">
                <AppearOnScroll>
                  <Link
                    className="footer-nav__link link"
                    to={navItem.link || "/"}
                  >
                    {t(navItem.label)}
                  </Link>
                </AppearOnScroll>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

FooterNav.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
  className: PropTypes.string,
  t: PropTypes.func,
};

export default withTranslation()(FooterNav);
