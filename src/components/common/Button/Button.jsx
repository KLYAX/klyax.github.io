import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ className, children, ...other }) => {
  return (
    <button className={classNames("button", className)} {...other}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
