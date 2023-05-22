import { AppColor } from "config";
import hydroGk from "./hydro-gk";

import cHydroGk from "./c-hydro-gk";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "drainage",
  name: "Водоотведение",
  color: AppColor.GRAY,
  products: [hydroGk],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cHydroGk];
}

export default subcategory;
