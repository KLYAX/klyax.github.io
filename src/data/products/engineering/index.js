import { AppColor } from "config";
import { IMAGES_PATH } from "config/path";
import product from "./product";

const engineering = {
  id: "engineering",
  name: "Инжиниринг",
  image: {
    home: {},
  },
  product,
  pageContent: {
    product: {
      gallery: [{}, {}, {}, {}, {}],
    },
  },
  navThumbnail: [
    {
      image: {
        src: `${IMAGES_PATH}/products/engineering/nav-thumbnail-1.jpg`,
        alt: "",
      },
    },
    // {
    //   image: {
    //     src: `${IMAGES_PATH}/products/electronics/nav-thumbnail-2.jpg`,
    //     alt: "",
    //   },
    // },
    // {
    //   image: {
    //     src: `${IMAGES_PATH}/products/electronics/nav-thumbnail-3.jpg`,
    //     alt: "",
    //   },
    // },
  ],
};

export default engineering;
