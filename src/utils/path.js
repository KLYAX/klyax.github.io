import {
  DOCUMENTS_PATH,
  FACILITIES_IMAGES_PATH,
  IMAGES_PATH,
  LOGOS_IMAGES_PATH,
  PRODUCTS_DOCUMENTS_PATH,
  PRODUCT_IMAGES_PATH,
} from "config/path";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";

/**
 * Возвращает путь к определенной картинке
 *
 * @param {string} folder каталок в котором храниться нужная картинка
 * @param {Object} config
 * @param {*} defaults
 */
export const buildSpecificImageSrc = (
  folder,
  config = { name: "", ext: "", file: "" },
  defaults = { name: "image", ext: "jpg", path: IMAGES_PATH }
) => {
  let file = config.file;

  defaults = {
    ...{ name: "image", ext: "jpg", path: IMAGES_PATH },
    ...defaults,
  };

  if (!file) {
    let name = config.name || defaults.name;
    let ext = config.ext || defaults.ext;

    file = `${name}.${ext}`;
  }

  return `${defaults.path}/${folder}/${file}`;
};

export const getFileSrcBuilder = (root) => {
  return ({ path, file }) => {
    if (isArray(path)) {
      path = path.join("/");
    }

    if (isObject(file)) {
      file = `${file.name}.${file.ext}`;
    }

    return `${root}/${path ? path + "/" : ""}${file}`;
  };
};

export const buildFacilityImageSrc = getFileSrcBuilder(FACILITIES_IMAGES_PATH);
export const buildProductImageSrc = getFileSrcBuilder(PRODUCT_IMAGES_PATH);
export const buildLogoImageSrc = getFileSrcBuilder(LOGOS_IMAGES_PATH);
export const buildProductDocumentsSrc = getFileSrcBuilder(PRODUCTS_DOCUMENTS_PATH);

export const getProductManualSrc = ({ categoryId, subcategoryId, productId, file }) => {
  return buildProductDocumentsSrc({
    path: [categoryId, subcategoryId, productId],
    file: {
      name: "manual",
      ext: "pdf",
      ...file,
    },
  });
};

// export const buildProductManualSrc = getFileSrcBuilder(PRODUCT_DOCUME);
