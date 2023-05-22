import Products from "components/pages/Products";

const route = {
  path: "/products",
  exact: true,
  component: Products,
  className: "products",
  nav: {
    label: "Products",
  },
};

export default route;
