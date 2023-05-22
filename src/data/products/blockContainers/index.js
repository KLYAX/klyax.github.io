// import mini from "./mini";
// import medium from "./medium";
// import big from "./big";

import { IMAGES_PATH, PRODUCT_IMAGES_PATH } from "config/path";
import product from "./product";

export default {
  id: "block-containers",
  name: "Блок-контейнеры",
  image: {
    home: {},
  },
  product,
  homePageSlide: {
    image: {
      src: `${PRODUCT_IMAGES_PATH}/block-containers/mini/bc-4000/slide.png`,
      alt: "",
    },
    backgroundColor: "",
  },
  pageContent: {
    product: {
      advantages: {
        title: "Преимущества\nнаших блок-контейнеров",
        slides: [
          {
            label: "Безопасность",
            content: {
              body: [
                "Основным материалом для утепления наших блок контейнеров служит безопасный минераловатный негорючий утеплитель, толщина которого определяется в\nзависимости от\nрегиона эксплуатации и\nназначения изделия.",
                "Мы\nпредлагаем современные строительные и\nдругие контейнеры, характеризующиеся высоким качеством.",
              ],
              footer: "ГОСТ 12.3.002, ГОСТ 12.2.003",
            },
          },
          {
            label: "Гарантия",
            content: {
              body: [
                "Наши строители при возведении зданий руководствуются чертежами. После окончания строительства выполняется проверка соответствия выполненных работ проектной документации.",
                "Мы\nгарантируем высокое качество наших построек, так как контролируем все этапы производства и\nмонтажа.",
              ],
              footer: "Гарантия 1 год",
            },
          },
        ],
      },
      gallery: [{}, {}, {}, {}, {}],
    },
  },
  navThumbnail: {
    image: {
      src: `${IMAGES_PATH}/products/block-containers/nav-thumbnail-1.jpg`,
      alt: "",
    },
  },
};
