import { IMAGES_PATH } from "config/path";

const getFeaturePageImageSrc = (name, ext = "jpg") =>
  `${IMAGES_PATH}/pages/product/switching-equipment/${name}.${ext}`;

const features = {
  title: "Наши объекты",
  content: [
    {
      image: {
        src: getFeaturePageImageSrc(1, "png"),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(2, "png"),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(3, "png"),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(4),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(5),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(6, "png"),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(7),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(8),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(9),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(10),
      },
    },
    {
      image: {
        src: getFeaturePageImageSrc(11),
      },
    },
  ],
};

export default features;
