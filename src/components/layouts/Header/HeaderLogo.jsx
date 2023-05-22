import { Icon } from "components/common";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

const HeaderLogo = ({ className }) => {
  return (
    <div className={classNames("header-logo", className)}>
      <Link to="/" className="header-logo__link">
        <Icon name="logo" className="header-logo__icon" />
        <span className="header-logo__label">Глобус</span>
      </Link>
    </div>
  );
};

HeaderLogo.propTypes = {
  className: PropTypes.string,
};

export default HeaderLogo;
