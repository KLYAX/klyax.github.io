import statusA11 from "./status-a-1-1";
import statusA28 from "./status-a-2-8";

import cStatusA11 from "./c-status-a-1-1";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "repeaters",
  name: "Повторители",
  products: [statusA11, statusA28],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cStatusA11];
}

export default subcategory;
