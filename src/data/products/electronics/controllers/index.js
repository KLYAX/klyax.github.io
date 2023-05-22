import statusIvC from "./status-iv-c";
import statusIvSf from "./status-iv-sf";
import statusU from "./status-u";

import cStatusU from "./c-status-u";
import cStatusIv from "./c-status-iv";
import { IS_COMPETITION_VERSION } from "config";

const subcategory = {
  id: "controllers",
  name: "Контроллеры",
  products: [statusIvC, statusIvSf, statusU],
};

if (IS_COMPETITION_VERSION) {
  subcategory.products = [cStatusU, cStatusIv];
}

export default subcategory;
