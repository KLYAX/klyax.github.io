import { Theme } from "config";
import {
  SET_PRODUCTS,
  SET_FACILITIES,
  SET_HOME_ACTIVE_PRODUCT_INDEX,
  CHANGE_HEADER_THEME,
  SET_APP_LOADED,
  ENABLE_PRELOADER,
  DISABLE_PRELOADER,
  CHANGE_HOME_HERO_THEME,
  OPEN_MENU,
  CLOSE_MENU,
  CHANGE_HEADER_AND_HOME_HERO_THEME,
} from "../actionTypes/app";

const initialState = {
  products: [],
  facilities: [],
  homeActiveProductIndex: 0,
  headerTheme: Theme.DARK,
  loading: false,
  preloaderActive: false,
  homeHeroTheme: Theme.DARK,
  menuOpen: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }

    case SET_FACILITIES: {
      return {
        ...state,
        facilities: payload,
      };
    }

    case SET_HOME_ACTIVE_PRODUCT_INDEX: {
      return {
        ...state,
        homeActiveProductIndex: payload,
      };
    }

    case CHANGE_HEADER_THEME: {
      return {
        ...state,
        headerTheme: payload,
      };
    }

    case CHANGE_HOME_HERO_THEME: {
      return {
        ...state,
        homeHeroTheme: payload,
      };
    }

    case CHANGE_HEADER_AND_HOME_HERO_THEME: {
      return {
        ...state,
        headerTheme: payload,
        homeHeroTheme: payload,
      };
    }

    case SET_APP_LOADED: {
      return {
        ...state,
        loading: false,
      };
    }

    case ENABLE_PRELOADER: {
      return {
        ...state,
        preloaderActive: true,
      };
    }

    case DISABLE_PRELOADER: {
      return {
        ...state,
        preloaderActive: false,
      };
    }

    case OPEN_MENU: {
      return {
        ...state,
        menuOpen: true,
      };
    }

    case CLOSE_MENU: {
      return {
        ...state,
        menuOpen: false,
      };
    }

    default:
      return state;
  }
}

export default reducer;
