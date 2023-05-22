import classNames from "classnames";
import { forwardRef, useContext, useImperativeHandle, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import homeRoute from "routes/home";

import MenuHeader from "./MenuHeader";
import MenuBody from "./MenuBody";
import MenuFooter from "./MenuFooter";

import { headerNavRoutes } from "components/layouts/Header/HeaderNav";
import { TransitionGroup, Transition } from "react-transition-group";
import { BodyScrollContext } from "App";

const headerNavRoutesWithoutHomeRoute = headerNavRoutes.filter(
  (route) => route.path !== homeRoute.path
);

const Menu = forwardRef(({ className, open }, ref) => {
  const menuRef = useRef(null);
  const location = useLocation();
  const { scrollbarGap, isScrollActive, disableScroll, enableScroll } = useContext(
    BodyScrollContext
  );
  // const prevIsScrollActiveRef = useRef(isScrollActive);

  const currentRoute = useMemo(() => {
    return (
      headerNavRoutesWithoutHomeRoute.find((route) => {
        return location.pathname === route.path || location.pathname.indexOf(route.path) !== -1;
      }) || homeRoute
    );
  }, [location.pathname]);

  const bodyRoutes = useMemo(
    () => headerNavRoutes.filter((route) => route.path !== currentRoute.path),
    [currentRoute.path]
  );

  // useEffect(() => {
  //   // const prevIsScrollActive = prevIsScrollActiveRef.current;
  //   if (open) {
  //     if (isScrollActive) {
  //       disableScroll();
  //     }
  //   } else {
  //     if (!isScrollActive) {
  //       enableScroll();
  //     }
  //   }
  // }, [isScrollActive, enableScroll, disableScroll, open]);

  useImperativeHandle(ref, () => menuRef.current);

  // useEffect(() => {
  //   const menuElem = menuRef.current;

  //   if (isOpen) {
  //     const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

  //     if (scrollbarGap > 0) {
  //       menuElem.style.paddingRight = `${scrollbarGap}px`;
  //     }

  //     disableBodyScroll(menuElem, {
  //       reserveScrollBarGap: true,
  //     });
  //   } else {
  //     menuElem.style.paddingRight = "";

  //     enableBodyScroll(menuElem);
  //   }
  // }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={classNames("menu", className, { active: open })}
      style={{ paddingRight: scrollbarGap }}
    >
      <div className="menu__container container row">
        <TransitionGroup component={null}>
          <Transition key={currentRoute.path} timeout={800}>
            {(stage) => (
              <div
                className={classNames(
                  "menu__inner col-12 col-md-10 offset-md-2",
                  `menu__inner_${stage}`
                )}
              >
                <MenuHeader currentRoute={currentRoute} />
                <MenuBody routes={bodyRoutes} />
                <MenuFooter />
              </div>
            )}
          </Transition>
        </TransitionGroup>
      </div>
    </div>
  );
});

export default Menu;

// class Menu extends Component {
//   static propTypes = {
//     location: PropTypes.object.isRequired,
//     className: PropTypes.string,
//     isOpen: PropTypes.bool,
//   };

//   constructor(props) {
//     super(props);

//     this.menuRef = createRef();
//   }

//   componentDidMount() {
//     this.headerEl = document.querySelector(".header");
//   }

//   open() {
//     const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

//     if (scrollbarGap > 0) {
//       this.menuRef.current.style.paddingRight = this.headerEl.style.paddingRight = `${scrollbarGap}px`;
//     }

//     disableBodyScroll(this.menuRef.current, {
//       reserveScrollBarGap: true,
//     });
//   }

//   close() {
//     this.menuRef.current.style.paddingRight = this.headerEl.style.paddingRight = "";

//     enableBodyScroll(this.menuRef.current);
//   }

//   componentDidUpdate(prevProps) {
//     const { isOpen } = this.props;

//     // проверяем изменилось ли состояние открытости меню
//     if (prevProps.isOpen !== isOpen) {
//       // если меню открыто, тогда прячем скролл в противном случаем возвращаем его
//       if (isOpen) {
//         this.open();
//       } else {
//         this.close();
//       }
//     }
//   }

//   render() {
//     const { location, isOpen, className } = this.props;

//     const currentRoute =
//       headerNavRoutesWithoutHomeRoute.find((route) => {
//         return location.pathname === route.path || location.pathname.indexOf(route.path) !== -1;
//       }) || homeRoute;

//     const bodyRoutes = headerNavRoutes.filter((route) => route.path !== currentRoute.path);

//     return (
//       <div ref={this.menuRef} className={classNames("menu", className, { active: isOpen })}>
//         <div className="menu__container container row">
//           <TransitionGroup component={null}>
//             <Transition key={currentRoute.path} timeout={DEFAULT_VIEW_TRANSITION_TIMEOUT}>
//               {(stage) => (
//                 <div
//                   className={classNames(
//                     "menu__inner col-12 col-md-10 offset-md-2",
//                     `menu__inner_${stage}`
//                   )}
//                 >
//                   <MenuHeader currentRoute={currentRoute} />
//                   <MenuBody routes={bodyRoutes} />
//                   <MenuFooter />
//                 </div>
//               )}
//             </Transition>
//           </TransitionGroup>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (store) => ({
//   isOpen: isMenuOpen(store),
// });

// export default connect(mapStateToProps)(withRouter(Menu));
