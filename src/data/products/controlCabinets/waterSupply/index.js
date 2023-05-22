import { AppColor } from "config";

import cControlGc from "./c-control-gc-c";
import cControlGiS from "./c-control-gi-s";
import cControlGieSf from "./c-control-gie-sf";
import cControlGlMfMagelis from "./c-control-gl-mf-magelis";

import controlGc from "./control-gc-c";
import controlGiS from "./control-gi-s";
import controlGieSf from "./control-gie-sf";
import controlGlMfMagelis from "./control-gl-mf-magelis";
import controlGiSf from "./control-gi-sf";
import controlGlMfStatusP from "./control-gl-mf-status-p";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "water-supply",
  name: "Водоснабжение",
  color: AppColor.GRAY,
  products: [
    controlGc,
    controlGiS,
    controlGieSf,

    controlGiSf,
    controlGlMfMagelis,
    controlGlMfStatusP,
  ],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cControlGc, cControlGiS, cControlGieSf, cControlGlMfMagelis];
}

export default subcategory;
