import React from "react";
import classNames from "classnames";

import { AppearOnScroll, Gallery, List } from "components/common";
import { buildSpecificImageSrc } from "utils/path";
import Fancybox from "components/common/Fancybox/Fancybox";
import FancyboxImg from "components/common/Fancybox/FancyboxImg";

const isWide = (i) => !((i % 4) % 3);

const AboutManufactureGallery = ({ items }) => {
  return (
    <Fancybox>
      <AppearOnScroll
        vars={{ duration: 0.8, stagger: 0.1 }}
        overflow={false}
        target=".our-manufacture-gallery__image"
      >
        <List
          className="our-manufacture-gallery row"
          itemClassName={(_, i) =>
            classNames(
              "our-manufacture-gallery__item container_overflow-hidden",
              isWide(i) ? "col-sm-4 col-xl-5" : "col-sm-8 col-xl-7"
            )
          }
          items={items}
        >
          {(item, i) => {
            const image = {
              alt: item.alt,
              src:
                !item.src || item.src === "object"
                  ? buildSpecificImageSrc("pages/about/manufacture/gallery", item, {
                      name: i + 1,
                      ext: "jpg",
                    })
                  : item.src,
            };

            return (
              <FancyboxImg
                src={image.src}
                alt={image.alt}
                group="manufacture-gallery"
                thumbnailClassName="our-manufacture-gallery__image"
              />
            );
          }}
        </List>
      </AppearOnScroll>
    </Fancybox>
  );
};

AboutManufactureGallery.propTypes = {};

export default AboutManufactureGallery;
