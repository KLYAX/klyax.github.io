import status3264 from "./status-32-64";
import statusIn220v from "./status-in-220v";
import statusIo from "./status-io";

import cStatus3264 from "./c-status-32-64";
import cStatusIn220v from "./c-status-in-220v";
import cStatusIo from "./c-status-io";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "modules",
  name: "Модули",
  products: [status3264, statusIn220v, statusIo],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cStatus3264, cStatusIn220v, cStatusIo];
}

export default subcategory;
