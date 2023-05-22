import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Icon, LabelWithIcon } from "components/common";
import { withTranslation } from "react-i18next";

function MenuHeader({ currentRoute, t }) {
  return (
    <div className="menu__header">
      <NavLink
        className="menu__link menu__header-link link title title_uppercase title_shrink link_with-arrow-icon"
        exact={currentRoute.exact}
        to={currentRoute.path}
      >
        <LabelWithIcon
          renderRight={() => (
            <Icon
              name="link-arrow-up-bold"
              className="menu__link-icon link__arrow-icon"
            />
          )}
        >
          {t(currentRoute.nav.label)}
        </LabelWithIcon>
      </NavLink>
    </div>
  );
}

MenuHeader.propTypes = {
  currentRoute: PropTypes.object.isRequired,
  t: PropTypes.func,
};

export default withTranslation()(MenuHeader);
