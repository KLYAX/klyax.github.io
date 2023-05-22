import React, { forwardRef, useCallback, useMemo } from "react";

import ProductHeroNav from "./ProductHeroNav";
import ProductHeroSlider from "./ProductHeroSlider";
import { buildProductImageSrc } from "utils/path";
import Text from "components/common/Text";
import { PRODUCT_IMAGES_PATH } from "config/path";
import { AppColor } from "config";
import ProductHeroSpecifications from "./ProductHeroSpecifications";
import ProductHeroDescription from "./ProductHeroDescription";
import { isArray, isObject, isString } from "lodash";
import Content from "components/common/Content/Content";
import classNames from "classnames";

const ProductHero = forwardRef(
  (
    { activeCategory, activeSubcategory, activeProduct, changeActiveProduct, isCategoryProduct },
    ref
  ) => {
    const makeProductSlide = useCallback(
      ({ color, product, productImagePath }) => {
        const productMainImagePlaceholder = buildProductImageSrc({
          path: activeCategory.id,
          file: "product-image-main-placeholder.png",
        });

        const image = {
          src: "",
          alt: product.name,
        };

        const productMainImage = product?.image?.main;

        if (productMainImage) {
          if (isString(productMainImage)) {
            image.src = productMainImage;
          } else if (isObject) {
            image.src = productMainImage.src
              ? productMainImage.src
              : buildProductImageSrc({
                  path: productImagePath,
                  file: isString(image.file)
                    ? image.file
                    : {
                        name: "main",
                        ext: "png",
                        ...image.file,
                      },
                });

            if (isString(productMainImage.alt)) {
              image.alt = productMainImage.alt;
            }
          } else {
            image.src = productMainImagePlaceholder;
          }
        } else {
          image.src = productMainImagePlaceholder;
        }

        return {
          color,
          image,
        };
      },
      [activeCategory]
    );

    let slides = useMemo(() => {
      return activeCategory?.subcategories?.reduce(
        (acc, subcategory) =>
          acc.concat(
            subcategory.products.map((product) => {
              return {
                productId: product.id,
                subcategoryId: subcategory.id,
                slide: makeProductSlide({
                  product,
                  color:
                    product.color || subcategory.color || activeCategory.color || AppColor.GRAY,
                  productImagePath: [activeCategory.id, subcategory.id, product.id],
                }),
              };
            })
          ),
        []
      );
    }, [activeCategory, makeProductSlide]);

    slides = useMemo(() => {
      if (isCategoryProduct) {
        return [
          {
            slide: makeProductSlide({
              product: activeProduct,
              color: activeProduct.color || activeCategory.color || AppColor.GRAY,
              productImagePath: activeCategory.id,
            }),
          },
        ];
      }

      return slides;
    }, [activeProduct, activeCategory, makeProductSlide, slides, isCategoryProduct]);

    const activeSlideIndex = useMemo(() => {
      if (isCategoryProduct) {
        return 0;
      }

      const activeSubcategoryIndex = activeCategory.subcategories.findIndex(
        ({ id }) => id === activeSubcategory.id
      );
      const activeProductIndex = activeSubcategory.products.findIndex(
        ({ id }) => id === activeProduct.id
      );

      return (
        activeCategory.subcategories
          .slice(0, activeSubcategoryIndex)
          .reduce((acc, subcategory) => subcategory.products.length + acc, 0) + activeProductIndex
      );
    }, [activeCategory, activeProduct, activeSubcategory, isCategoryProduct]);

    const product = activeProduct || activeCategory.product;

    return (
      <section ref={ref} className="control-cabinets">
        <div className="control-cabinets__inner row">
          <div className="control-cabinets__main col-12 col-xl-7 order-2 order-xl-1">
            <header
              className={classNames("control-cabinets__header control-cabinets-header", {
                sticky: !!activeCategory.subcategories,
              })}
            >
              <div className="control-cabinets-header__top container">
                <h1 className="control-cabinets-header__title title title_hero title_uppercase title_shrink container_overflow-hidden">
                  <span className="control-cabinets-header__title-text">
                    <Text>{activeCategory.name}</Text>
                  </span>
                </h1>

                {product.about?.details && (
                  <div className="control-cabinets-header__details">
                    {product.about?.details.map((detail, i) => (
                      <Content key={i} {...detail} />
                    ))}
                  </div>
                )}
              </div>
              {activeCategory.subcategories && (
                <ProductHeroNav
                  activeCategory={activeCategory}
                  activeProduct={activeProduct}
                  activeSubcategory={activeSubcategory}
                  changeActiveProduct={changeActiveProduct}
                />
              )}
            </header>
            <div className="control-cabinets-description">
              {product.about?.description && (
                <div className="control-cabinets-description__header control-cabinets-description-header container">
                  <ProductHeroDescription
                    productName={product.name}
                    description={product.about?.description}
                  />
                </div>
              )}
              <div className="control-cabinets-description__body">
                {Array.isArray(product.about?.specifications) && (
                  <ProductHeroSpecifications specifications={product.about?.specifications} />
                )}
              </div>
            </div>
          </div>
          <div className="control-cabinets__aside col-12 col-xl-5 order-1 order-xl-2">
            <ProductHeroSlider
              onChange={changeActiveProduct}
              slides={slides}
              activeSlideIndex={activeSlideIndex}
              className="control-cabinets__slider"
            />
          </div>
        </div>
      </section>
    );
  }
);

export default ProductHero;
