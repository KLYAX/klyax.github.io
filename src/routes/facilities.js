import Facilities from "components/pages/Facilities/Facilities";

const route = {
  path: "/facilities",
  exact: true,
  component: Facilities,
  className: "facilities",
  nav: {
    label: "Our facilities",
  },
};

export default route;
