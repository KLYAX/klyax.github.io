import {
  SET_PRODUCTS,
  SET_HOME_ACTIVE_PRODUCT_INDEX,
  CHANGE_HEADER_THEME,
  SET_APP_LOADED,
  DISABLE_PRELOADER,
  ENABLE_PRELOADER,
  CHANGE_HOME_HERO_THEME,
  OPEN_MENU,
  CLOSE_MENU,
  CHANGE_HEADER_AND_HOME_HERO_THEME,
  SET_FACILITIES,
} from "../actionTypes/app";

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setFacilities = (facilities) => ({
  type: SET_FACILITIES,
  payload: facilities,
});

export const setHomeActiveProductIndex = (productIndex) => ({
  type: SET_HOME_ACTIVE_PRODUCT_INDEX,
  payload: productIndex,
});

export const changeHeaderTheme = (theme) => ({
  type: CHANGE_HEADER_THEME,
  payload: theme,
});

export const changeHomeHeroTheme = (theme) => ({
  type: CHANGE_HOME_HERO_THEME,
  payload: theme,
});

export const changeHeaderAndHomeHeroTheme = (theme) => ({
  type: CHANGE_HEADER_AND_HOME_HERO_THEME,
  payload: theme,
});

export const setAppLoaded = () => ({
  type: SET_APP_LOADED,
});

export const disablePreloader = () => ({
  type: DISABLE_PRELOADER,
});

export const enablePreloader = () => ({
  type: ENABLE_PRELOADER,
});

export const openMenu = () => ({
  type: OPEN_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});
