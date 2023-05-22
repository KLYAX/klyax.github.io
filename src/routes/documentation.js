import { Documentation } from "components/pages";

export const buildPathToDocumentation = (documentationId = "") => {
  if (documentationId) {
    documentationId = "/" + documentationId;
  }

  return `/documentation${documentationId}`;
};

const route = {
  path: "/documentation/:documentationId?",
  exact: true,
  component: Documentation,
  className: "documentation",
  nav: {
    label: "Documentation",
    href: buildPathToDocumentation(),
  },
};

export default route;
