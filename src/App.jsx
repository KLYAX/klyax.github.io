import { Component, createContext, createRef } from "react";
import PropTypes from "prop-types";
import { Switch, Route, matchPath, Redirect, withRouter } from "react-router-dom";

import { Header } from "components/layouts";
import { Preloader } from "components/layouts";
import routes from "./routes";
import notFoundRoute from "./routes/notFound";
import homeRoute from "./routes/home";
import productRoute from "./routes/product";
import documentationRoute from "./routes/documentation";

import {
  disablePreloader,
  enablePreloader,
  setProducts,
  setFacilities,
  changeHeaderTheme,
  closeMenu,
  changeHeaderAndHomeHeroTheme,
} from "./store/actions/app";
import { connect } from "react-redux";
import gsap from "gsap";

import { getProducts, isMenuOpen, isPreloaderActive } from "store/selectors/app";

import products from "data/products";
import facilities from "data/facilities";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import ViewTransition from "components/common/ViewTransition/ViewTransition";
import { AppColor, Theme } from "config";

const getRoute = (location) =>
  routes.find((route) => matchPath(location.pathname, route)) || notFoundRoute;

export const AppThemeContext = createContext({
  headerTheme: {
    theme: "dark",
    isChanging: false,
  },
  homeHeroTheme: {
    theme: "dark",
    isChanging: false,
  },
  changeHeaderTheme: () => {},
  changeHomeHeroTheme: () => {},
});

export const AppPageTransitionContext = createContext({
  enableScroll: () => {},
  disableScroll: () => {},
});

export const BodyScrollContext = createContext({
  enableScroll: () => {},
  disableScroll: () => {},
  scrollbarGap: 0,
  isActive: false,
});

class App extends Component {
  static propTypes = {
    setProducts: PropTypes.func,
    preloaderActive: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      viewActive: false,
      dataFetched: false,
      isBodyScrollActive: true,
      bodyScrollbarGap: 0,
      headerTheme: {
        theme: "dark",
        isChanging: false,
      },
      homeHeroTheme: {
        theme: "dark",
        isChanging: false,
      },
    };

    this.handlePreloadedAnimationEnd = this.handlePreloadedAnimationEnd.bind(this);

    this.disableScroll = this.disableScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
    this.getOverlayDisappearTween = this.getOverlayDisappearTween.bind(this);
    this.getHeaderAppearTimeline = this.getHeaderAppearTimeline.bind(this);

    this.handelViewTransitionEnter = this.handelViewTransitionEnter.bind(this);
    this.handelViewTransitionExit = this.handelViewTransitionExit.bind(this);

    this.setHeaderTheme = this.setHeaderTheme.bind(this);
    this.setHomeHeroTheme = this.setHomeHeroTheme.bind(this);

    this.timeline = gsap.timeline();

    this.pageOverlayRef = createRef();
    this.preventClickOverlayRef = createRef();
    this.headerRef = createRef();
    this.menuRef = createRef();
    this.wrapperRef = createRef();

    this.fromRoute = this.toRoute = getRoute(props.location);

    this.pageTransitionTimeout = 800;
  }

  setHeaderTheme(theme) {
    // if (theme.color === this.state.headerTheme.color) return;

    this.setState(
      (state) => ({
        headerTheme: {
          ...state.headerTheme,
          theme,
          isChanging: true,
        },
      }),
      () => {
        clearTimeout(this.headerThemeChangingTimeoutId);

        this.headerThemeChangingTimeoutId = setTimeout(() => {
          this.setState((state) => ({
            headerTheme: {
              ...state.headerTheme,
              isChanging: false,
            },
          }));
        }, 1000);
      }
    );
  }

  setHomeHeroTheme(theme) {
    // if (theme.color === this.state.homeHeroTheme.color) return;

    this.setState((state) => ({
      homeHeroTheme: {
        ...state.homeHeroTheme,
        theme,
        isChanging: true,
      },
    }));

    clearTimeout(this.homeHeroThemeChangingTimeoutId);

    this.homeHeroThemeChangingTimeoutId = setTimeout(() => {
      this.setState((state) => ({
        homeHeroTheme: {
          ...state.homeHeroTheme,
          isChanging: false,
        },
      }));
    }, 1000);
  }

  fetchData() {
    setTimeout(() => {
      this.props.setProducts(products);
      this.props.setFacilities(facilities);

      this.setState({
        dataFetched: true,
        loading: false,

        viewActive: false,
        // viewActive: true,
      });

      // console.log(products);

      // this.setState({
      //   loading: false,
      // });
    }, 50);
  }

  componentDidMount() {
    this.props.enablePreloader();
    this.fetchData();
  }

  componentWillUnmount() {
    clearTimeout(this.headerThemeChangingTimeoutId);
    clearTimeout(this.homeHeroThemeChangingTimeoutId);
  }

  /**
   * Обработчик, который сработает, когда анимация прелоудера закончится
   */
  handlePreloadedAnimationEnd() {
    // показываем представление
    this.handelViewTransitionExit({
      complete: () => {
        this.setState({
          viewActive: true,
        });
        this.props.disablePreloader();
      },
    });
  }

  getOverlayAppearTween(modifications = { from: {}, to: {} }) {
    const pageOverlayElem = this.pageOverlayRef.current;
    const duration = this.pageTransitionTimeout / 1000;

    gsap.set(pageOverlayElem, { clearProps: "all" });

    return gsap.fromTo(
      pageOverlayElem,
      {
        scaleY: 1,
        scaleX: 0,
        display: "block",
        ...modifications.from,
      },
      {
        scaleX: 1,
        ease: "ease-out",
        duration,
        ...modifications.to,
      }
    );

    // return timeline;
  }

  getOverlayDisappearTween(modifications = { from: {}, to: {} }) {
    const pageOverlayElem = this.pageOverlayRef.current;
    const duration = this.pageTransitionTimeout / 1000;

    // const timeline = gsap.timeline();

    return gsap.fromTo(
      pageOverlayElem,
      {
        scaleX: 1,
        scaleY: 1,
        ...modifications.from,
      },
      {
        scaleY: 0,
        ease: "ease-in",
        duration,
        ...modifications.to,
        onComplete() {
          gsap.set(pageOverlayElem, { clearProps: "all" });
        },
      }
    );

    // return timeline;
  }

  getHeaderAppearTimeline(fromModifications) {
    const headerElem = this.headerRef.current;
    const timeline = gsap.timeline();

    timeline
      .set(headerElem, {
        transitionDuration: "0",
      })
      .from(headerElem, {
        yPercent: -100,
        ease: "ease-out",
        duration: 0.5,
        ...fromModifications,
      })
      .set(headerElem, {
        transitionDuration: "",
      });

    return timeline;
  }

  disableScroll({ reserveScrollBarGap = true } = { reserveScrollBarGap: true }) {
    if (!this.state.isBodyScrollActive) {
      return;
    }

    const bodyScrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = bodyScrollbarGap + "px";

    this.setState({
      isBodyScrollActive: false,
      bodyScrollbarGap,
    });
  }

  enableScroll() {
    if (this.state.isBodyScrollActive) {
      return;
    }

    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    this.setState({
      isBodyScrollActive: true,
      bodyScrollbarGap: 0,
    });
  }

  handelViewTransitionEnter({ viewElem, complete, isAppearing }) {
    const timeline = gsap.timeline();

    if (isAppearing) {
      timeline.add(this.getHeaderAppearTimeline());
      timeline.add(this.disableScroll);
    }

    timeline.add(complete);

    document.body.scrollTop = 0;
  }

  getActiveProduct() {
    const match = matchPath(this.props.location.pathname, {
      path: productRoute.path,
      exact: productRoute.exact,
    });

    if (!match) {
      return;
    }

    const { categoryId, subcategoryId, productId } = match.params;

    const category = products.find((category) => category.id === categoryId);
    const categorySubcategories = category?.subcategories;

    let subcategory;
    let product;

    if (category?.product) {
      product = category.product;
    } else {
      if (categorySubcategories) {
        subcategory = subcategoryId
          ? categorySubcategories.find((subcategory) => subcategory.id === subcategoryId)
          : categorySubcategories[0];
      }

      const subcategoryProducts = subcategory?.products;

      if (subcategoryProducts) {
        product = productId
          ? subcategoryProducts.find((product) => product.id === productId)
          : subcategoryProducts[0];
      }
    }

    return {
      category,
      subcategory,
      product,
    };
  }

  handelViewTransitionExit({ viewElem, complete = () => {} }) {
    const timeline = gsap.timeline();
    const pageOverlay = this.pageOverlayRef.current;
    const preventClickOverlayElem = this.preventClickOverlayRef.current;

    if (!viewElem) {
      timeline.set(pageOverlay, {
        zIndex: 160,
      });
    }

    timeline.add(this.disableScroll);
    timeline.set(preventClickOverlayElem, {
      display: "block",
    });

    if (this.toRoute.path === homeRoute.path) {
      const firstProductCategory = this.props.products[0];
      const overlayColor = firstProductCategory?.color;

      timeline.add(
        this.getOverlayAppearTween({
          from: {
            backgroundColor: overlayColor,
            zIndex: !this.props.preloaderActive && !this.props.menuOpen && 140,
          },
        })
      );

      // timeline.add(this.setHeaderTheme(Theme.LIGHT));
    } else if (this.toRoute.path === productRoute.path) {
      const { product, subcategory, category } = this.getActiveProduct();
      const isVerticalLayout = matchMedia("(max-width: 1199px)").matches;

      if (category) {
        const overlayColor =
          product?.color || subcategory?.color || category?.color || AppColor.GRAY;

        timeline.add(
          this.getOverlayAppearTween({
            from: {
              backgroundColor: overlayColor,
              scaleY: isVerticalLayout ? 0 : 1,
              scaleX: isVerticalLayout ? 1 : 0,
            },
            to: {
              scaleY: 1,
              scaleX: 1,
            },
          })
        );
      }
    } else {
      timeline.add(this.getOverlayAppearTween());
      timeline.add(() => this.setHeaderTheme(Theme.DARK));
    }

    timeline.add(() => {
      if (this.props.menuOpen) {
        this.props.closeMenu();
      }

      window.scrollTo(0, 0);
    });

    timeline.set(preventClickOverlayElem, {
      display: "",
    });

    timeline.add(complete);
  }

  updateFromToRoutes(prevProps) {
    const fromRoute = getRoute(prevProps.location);
    const toRoute = getRoute(this.props.location);

    if (fromRoute.path !== toRoute.path) {
      this.toRoute = toRoute;
      this.fromRoute = fromRoute;
    }
  }

  updateMenu(prevProps) {
    if (prevProps.menuOpen !== this.props.menuOpen) {
      const headerElem = this.headerRef.current;
      const menuElem = this.menuRef.current;

      if (this.props.menuOpen) {
        const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

        headerElem.style.paddingRight = menuElem.style.paddingRight = `${scrollbarGap}px`;

        disableBodyScroll(menuElem, { reserveScrollBarGap: true });
      } else {
        headerElem.style.paddingRight = menuElem.style.paddingRight = "";

        enableBodyScroll(menuElem);
      }
    }
  }

  componentDidUpdate(prevProps) {
    this.updateFromToRoutes(prevProps);
  }

  render() {
    const { preloaderActive, location } = this.props;
    const { dataFetched, viewActive } = this.state;

    return (
      <AppThemeContext.Provider
        value={{
          headerTheme: this.state.headerTheme,
          homeHeroTheme: this.state.homeHeroTheme,
          setHeaderTheme: this.setHeaderTheme,
          setHomeHeroTheme: this.setHomeHeroTheme,
        }}
      >
        <AppPageTransitionContext.Provider
          value={{
            enableScroll: this.enableScroll,
            disableScroll: this.disableScroll,
            getHeaderAppearTimeline: this.getHeaderAppearTimeline,
            getOverlayDisappearTween: this.getOverlayDisappearTween,
          }}
        >
          <BodyScrollContext.Provider
            value={{
              enableScroll: this.enableScroll,
              disableScroll: this.disableScroll,
              isScrollActive: this.state.isBodyScrollActive,
              scrollbarGap: this.state.bodyScrollbarGap,
            }}
          >
            <div ref={this.wrapperRef} className="wrapper">
              <Header ref={this.headerRef} menuRef={this.menuRef} />
              <div ref={this.pageOverlayRef} className="overlay overlay_view view-overlay" />
              <div
                ref={this.preventClickOverlayRef}
                className="overlay overlay_prevent-click prevent-click-overlay"
              />

              {preloaderActive && (
                <Preloader loop={!dataFetched} onAnimationEnd={this.handlePreloadedAnimationEnd} />
              )}

              {dataFetched && viewActive && (
                <Route
                  render={(props) => {
                    const route = getRoute(props.location);

                    return (
                      <ViewTransition
                        trigger={route.path}
                        tag="main"
                        className="view"
                        onEnter={this.handelViewTransitionEnter}
                        onExit={this.handelViewTransitionExit}
                      >
                        <Switch location={location}>
                          {routes.map((route, i) => (
                            <Route key={i} {...route} />
                          ))}
                          <Redirect to={notFoundRoute.path} />
                        </Switch>
                      </ViewTransition>
                    );
                  }}
                />
              )}
            </div>
          </BodyScrollContext.Provider>
        </AppPageTransitionContext.Provider>
      </AppThemeContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  preloaderActive: isPreloaderActive(state),
  menuOpen: isMenuOpen(state),
  products: getProducts(state),
});

const mapDispatchToProps = {
  changeHeaderAndHomeHeroTheme,
  enablePreloader,
  changeHeaderTheme,
  disablePreloader,
  setFacilities,
  setProducts,
  closeMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
