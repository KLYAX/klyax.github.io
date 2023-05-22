import PropTypes from "prop-types";
import classNames from "classnames";
import { BurgerIcon } from "components/common";
import Button from "./Button";

const BurgerButton = ({ className, active, ...other }) => {
  return (
    <Button className={classNames("burger-button", className)} {...other}>
      <BurgerIcon className="burger-button__burger" active={active} />
    </Button>
  );
};

BurgerButton.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
};

export default BurgerButton;
