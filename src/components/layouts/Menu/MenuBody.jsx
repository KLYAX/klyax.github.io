import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Icon, LabelWithIcon } from "components/common";
import { withTranslation } from "react-i18next";

function MenuBody({ routes, t: translate }) {
  return (
    <div className="menu__body">
      <nav className="menu__nav">
        <ul className="menu__list list">
          {routes.map((route) => (
            <li key={route.path} className="menu__item">
              <NavLink
                className="menu__link link title title_uppercase title_shrink link_with-arrow-icon"
                exact={route.exact}
                to={route?.nav?.href || route.path}
              >
                <LabelWithIcon
                  renderRight={() => (
                    <Icon name="link-arrow-up-bold" className="menu__link-icon link__arrow-icon" />
                  )}
                >
                  {translate(route.nav.label)}
                </LabelWithIcon>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

MenuBody.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation()(MenuBody);
