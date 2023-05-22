import PropTypes from "prop-types";
import classNames from "classnames";
import { BurgerButton } from "components/common";
import { Component, useCallback, useContext } from "react";
import { Menu } from "components/layouts";
import { withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { openMenu, closeMenu } from "store/actions/app";
import { isMenuOpen } from "store/selectors/app";
import { BodyScrollContext } from "App";

const HeaderMenu = ({ className, menuRef }) => {
  const menuOpen = useSelector(isMenuOpen);

  const dispatch = useDispatch();

  const open = useCallback(() => {
    dispatch(openMenu());
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const toggle = useCallback(() => {
    if (menuOpen) {
      close();
    } else {
      open();
    }
  }, [menuOpen, open, close]);

  return (
    <div className={classNames("header-menu", className)}>
      <BurgerButton
        className="header-menu__toggle header__menu-toggle"
        active={menuOpen}
        onClick={toggle}
      />
      <Menu open={menuOpen} ref={menuRef} className="header-menu__menu header__menu" />
    </div>
  );
};

export default HeaderMenu;

// class HeaderMenu extends Component {
//   static propTypes = {
//     isMenuOpen: PropTypes.bool.isRequired,
//     openMenu: PropTypes.func.isRequired,
//     closeMenu: PropTypes.func.isRequired,
//     className: PropTypes.string,
//   };

//   constructor(props) {
//     super(props);

//     this.handleMenuToggle = this.handleMenuToggle.bind(this);
//   }

//   /**
//    * Обработчик нажатий по кнопке, который будет открывать из закрывать меню
//    */
//   handleMenuToggle() {
//     if (this.props.isMenuOpen) {
//       this.props.closeMenu();
//     } else {
//       this.props.openMenu();
//     }
//   }

//   render() {
//     const { isMenuOpen, className } = this.props;

//     return (
//       <div className={classNames("header-menu", className)}>
//         <BurgerButton
//           className="header-menu__toggle header__menu-toggle"
//           active={isMenuOpen}
//           onClick={this.handleMenuToggle}
//         />
//         <Menu className="header-menu__menu header__menu" />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   isMenuOpen: isMenuOpen(state),
// });

// const mapDispatchToProps = {
//   openMenu,
//   closeMenu,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderMenu));
