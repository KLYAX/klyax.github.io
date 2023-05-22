import { AppColor } from "config";
import hydroGc from "./hydro-gc";
import hydroGi from "./hydro-gi";
import hydroGie from "./hydro-gie";
import hydroGl from "./hydro-gl";

import cHydroGie from "./с-hydro-gie";
import cHydroGl from "./c-hydro-gl";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "water-supply",
  name: "Водоснабжение",
  color: AppColor.GRAY,
  image: {
    home: {},
  },
  products: [hydroGc, hydroGi, hydroGl],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [hydroGc, hydroGi, cHydroGie, cHydroGl];
}

export default subcategory;
