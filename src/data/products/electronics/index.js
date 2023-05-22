import { AppColor } from "config";
import { IMAGES_PATH } from "config/path";
import controllers from "./controllers";
import modules from "./modules";
import panels from "./panels";
import repeaters from "./repeaters";

const electronics = {
  id: "electronics",
  name: "Электроника",
  image: {
    home: {},
  },
  color: AppColor.YELLOW,
  pageContent: {
    product: {
      advantages: {
        title: "Преимущества\nнашей электроники",
        slides: [
          {
            label: "Безопасность",
            content: {
              body: [
                "детали для сборки насосных станций и\u00a0шкафов управления отвечают всем стандартам качества и\u00a0безопасности",
              ],
              footer: "ГОСТ 12.3.002",
            },
          },
          {
            label: "Гарантия",
            content: {
              body: [
                "Наши строители при возведении зданий руководствуются чертежами. После окончания строительства выполняется проверка соответствия выполненных работ проектной документации.",
                "Мы\u00a0гарантируем высокое качество наших построек, так как контролируем все этапы производства и\u00a0монтажа.",
              ],
              footer: "Гарантия 1 год",
            },
          },
        ],
      },
      gallery: [{}, {}, {}, {}, {}],
    },
  },
  navThumbnail: [
    {
      image: {
        src: `${IMAGES_PATH}/products/electronics/nav-thumbnail-1.jpg`,
        alt: "",
      },
    },
    {
      image: {
        src: `${IMAGES_PATH}/products/electronics/nav-thumbnail-2.jpg`,
        alt: "",
      },
    },
    {
      image: {
        src: `${IMAGES_PATH}/products/electronics/nav-thumbnail-3.jpg`,
        alt: "",
      },
    },
  ],
  subcategories: [controllers, modules, panels, repeaters],
};

export default electronics;
