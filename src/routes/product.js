import { Product } from "components/pages";
import productsRoute from "./products";

export const buildPathToProduct = (categoryId, subcategoryId, productId) =>
  `${productsRoute.path}/${[categoryId, subcategoryId, productId]
    .filter((token) => token)
    .join("/")}`;

const route = {
  path: `${productsRoute.path}/:categoryId/:subcategoryId?/:productId?`,
  exact: true,
  className: "product",
  component: Product,
};

export default route;
