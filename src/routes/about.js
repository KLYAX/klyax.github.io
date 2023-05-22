import { About } from "components/pages";

const route = {
  path: "/about",
  exact: true,
  component: About,
  className: "about",
  nav: {
    label: "About",
  },
};

export default route;
