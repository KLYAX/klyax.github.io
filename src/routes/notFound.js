// import { NotFound } from "components/pages";

// импорт работает только с таким путем
import NotFound from "components/pages/NotFound/NotFound";

const route = {
  path: "/404",
  component: NotFound,
  className: "not-found",
};

export default route;
