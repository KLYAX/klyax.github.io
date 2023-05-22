import { Contacts } from "components/pages";

const route = {
  path: "/contacts",
  exact: true,
  component: Contacts,
  className: "contacts",
  nav: {
    label: "Contacts",
  },
};

export default route;
