import { AppColor } from "config";
import controlGk from "./control-gk";
import controlGks from "./control-gks";

import cControlGk from "./c-control-gk";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "drainage",
  name: "Водоотведение",
  color: AppColor.GRAY,
  products: [controlGk, controlGks],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cControlGk];
}

export default subcategory;
