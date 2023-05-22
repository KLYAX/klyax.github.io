import { IS_COMPETITION_VERSION } from "config";
import { AppColor } from "config";
import hydroGf from "./hydro-gf";

const subcategory = {
  id: "firefighting",
  name: "Пожаротушение",
  color: AppColor.GRAY,
  products: [hydroGf],
};

if (IS_COMPETITION_VERSION) {
  // subcategory.products = [cHydroGk];
}

export default subcategory;
