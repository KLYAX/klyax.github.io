import statusP from "./status-p";
import cStatusP from "./c-status-p";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "panels",
  name: "Панели",
  products: [statusP],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cStatusP];
}

export default subcategory;
