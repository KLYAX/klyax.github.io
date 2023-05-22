import React from "react";
import { AppearOnScroll, Gallery, List } from "components/common";
import classNames from "classnames";
import Fancybox from "components/common/Fancybox/Fancybox";
import FancyboxImage from "components/common/Fancybox/FancyboxImg";

const FacilityHeroAboutGallery = ({ items }) => {
  return (
    <Fancybox>
      <div className="facility-about-gallery">
        <AppearOnScroll
          overflow={false}
          group={true}
          vars={{ stagger: 0.15, duration: 0.6 }}
          target=".facility-about-gallery__image"
          className="facility-about-gallery__container container"
        >
          <List
            className="facility-about-gallery__list row"
            items={items}
            itemClassName={(_, i) => {
              return classNames(
                "facility-about-gallery__item container_overflow-hidden col-sm-6 col-md-4",
                { "offset-md-4": items.length <= 2 && i === 0 }
              );
            }}
          >
            {(item) => {
              return (
                <FancyboxImage
                  src={item.src}
                  alt={item.alt}
                  group="facility-gallery"
                  className="facility-about-gallery__link container_overflow-hidden"
                  thumbnailClassName="facility-about-gallery__image facility__image"
                />
              );
            }}
          </List>
          {/* <Gallery listClassName="facility-about-gallery__list row" items={items}>
            {(image, i) => (
              <li
                key={i}
                className={classNames(
                  "facility-about-gallery__item container_overflow-hidden col-sm-6 col-md-4",
                  { "offset-md-4": items.length <= 2 && i === 0 }
                )}
              >
                <FancyboxImage
                  src={image.src}
                  alt={image.alt}
                  group="facility-gallery"
                  className="facility-about-gallery__link container_overflow-hidden"
                  thumbnailClassName="facility-about-gallery__image facility__image"
                />
              </li>
            )}
          </Gallery> */}
        </AppearOnScroll>
      </div>
    </Fancybox>
  );
};

FacilityHeroAboutGallery.propTypes = {};

export default FacilityHeroAboutGallery;
