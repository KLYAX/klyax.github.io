import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import classNames from "classnames";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import HeaderContact from "./HeaderContact";
import HeaderMenu from "./HeaderMenu";
import { ScrollProgress } from "components/common";
import { AppThemeContext } from "App";
import { BodyScrollContext } from "App";

// const HeaderThemeContext = createContext({

// })

const Header = forwardRef(({ menuRef }, ref) => {
  const headerRef = useRef(null);
  const { headerTheme, setHeaderTheme } = useContext(AppThemeContext);
  const { scrollbarGap } = useContext(BodyScrollContext);

  useImperativeHandle(ref, () => headerRef.current);

  return (
    <header
      ref={headerRef}
      className={classNames("header", {
        [`theme_${headerTheme.theme}`]: headerTheme.theme,
        [`theme_changing`]: headerTheme.isChanging,
      })}
      style={{ paddingRight: scrollbarGap + "px" }}
    >
      <div className="header__container container">
        <div className="header__inner row">
          <HeaderLogo className="header__logo col-auto col-sm-3 col-md-2" />
          <HeaderNav
            setHeaderTheme={setHeaderTheme}
            headerTheme={headerTheme.theme}
            className="header__nav col-7"
          />
          <HeaderContact className="header__contact col-auto col-sm-3" />
          <HeaderMenu menuRef={menuRef} className="header__menu-toggle col-auto" />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
});

export default Header;
