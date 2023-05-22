// import { createSelector } from "reselect";

// export const productSelector = createSelector([getProducts, ]);

export const getProducts = (store) => store.app.products;
export const getTotalProducts = (store) => store.app.products.length;

export const getHomeActiveProductIndex = (store) => store.app.homeActiveProductIndex;

export const getHomeActiveProduct = (store) => {
  return getProducts(store)[getHomeActiveProductIndex(store)] || {};
};

export const getHeaderTheme = (store) => store.app.headerTheme;
export const getHomeHeroTheme = (store) => store.app.homeHeroTheme;

export const isAppLoading = (store) => store.app.loading;

export const isPreloaderActive = (store) => store.app.preloaderActive;

export const isMenuOpen = (store) => store.app.menuOpen;
