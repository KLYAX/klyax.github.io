import { AppColor } from "config/index";

import controlGf from "./control-gf";
import controlGfs from "./control-gfs";

import cControlGf from "./c-control-gf";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "firefighting",
  name: "Пожаротушение",
  color: AppColor.GRAY,
  products: [controlGf, controlGfs],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cControlGf];
}

export default subcategory;
