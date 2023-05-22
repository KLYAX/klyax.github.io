import React, { useCallback, useMemo } from "react";
import classNames from "classnames";

import { AppearOnScroll, List, ViewTransitionItem } from "components/common";

import { withTranslation } from "react-i18next";

import FacilityHeroAboutGallery from "./FacilityHeroAboutGallery";
import FacilityHeroAboutGroup from "./FacilityHeroAboutGroup";
import { buildFacilityImageSrc, buildSpecificImageSrc } from "utils/path";
import { FACILITIES_IMAGES_PATH } from "config/path";
import { isArray, isString } from "lodash";
import Content from "components/common/Content/Content";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

const FacilityHeroAbout = ({ facility, className, t }) => {
  const pageContent = facility?.page?.facility;

  const gallery = useMemo(() => {
    if (!isArray(pageContent.gallery)) {
      return;
    }

    return pageContent.gallery.map((galleryImage, i) => {
      const image = galleryImage || {
        src: "",
        alt: "",
      };

      if (!image.src) {
        image.src = buildFacilityImageSrc({
          path: [facility.id, "gallery"],
          file: isString(image.file)
            ? image.file
            : {
                name: i + 1,
                ext: "jpg",
                ...image.file,
              },
        });
      }

      return image;
    });
  }, [pageContent, facility]);

  const getAboutImage = useCallback(
    (image) => {
      const aboutImage = image || {
        alt: "",
        src: "",
      };

      if (!aboutImage.src) {
        aboutImage.src = buildFacilityImageSrc({
          path: facility.id,
          file: aboutImage.file,
        });
      }

      return aboutImage;
    },
    [facility]
  );

  return (
    <div className={classNames("facility-about", className)}>
      <div className="facility-about__inner">
        {pageContent.about && (
          <div className="facility-about__groups">
            {pageContent.about.map((aboutItem, i) => (
              <FacilityHeroAboutGroup key={i} title={aboutItem.title}>
                <div className="facility-about__main">
                  <SlideUpOnScroll>
                    {aboutItem.content.map((contentItem, i) => (
                      <Content {...contentItem} key={i} />
                    ))}
                  </SlideUpOnScroll>
                </div>

                {aboutItem.image && (
                  <div className="facility-about__image-container">
                    <SlideUpOnScroll>
                      <img
                        alt=""
                        {...getAboutImage(aboutItem.image)}
                        className="facility-about__image facility__image"
                      />
                    </SlideUpOnScroll>
                  </div>
                )}
              </FacilityHeroAboutGroup>
            ))}

            {/* <FacilityHeroAboutGroup title={t("pages:facility.about-project-title")}>
                <div className="facility-about__main">
                  <AppearOnScroll
                    overflow={false}
                    group={true}
                    target=".container_overflow-hidden > *"
                    vars={{ stagger: 0.08 }}
                  >
                    <List
                      items={pageContent.aboutProject.performedWorks?.map((listItem) => t(listItem))}
                      className="facility-about__list"
                    />
                  </AppearOnScroll>
                </div>
                <div className="facility-about__image-container">
                  <AppearOnScroll>
                    <ViewTransitionItem>
                      <img
                        src={image.aboutProject.src}
                        alt={image.aboutProject.alt}
                        className="facility-about__image facility__image"
                      />
                    </ViewTransitionItem>
                  </AppearOnScroll>
                </div>
              </FacilityHeroAboutGroup> */}
            {/* 
            <FacilityHeroAboutGroup title={t("pages:facility.about-client-title")}>
              <div className="facility-about__main">
                <AppearOnScroll
                  group={true}
                  overflow={false}
                  target=".facility-about__text-content"
                  vars={{ stagger: 0.08 }}
                >
                  {Array.isArray(pageContent.aboutClient) ? (
                    pageContent.aboutClient.map((text, i) => (
                      <ViewTransitionItem tag="p" key={i} className="facility-about__text ">
                        <span className="span facility-about__text-content">{text}</span>
                      </ViewTransitionItem>
                    ))
                  ) : (
                    <ViewTransitionItem tag="p" className="facility-about__text ">
                      <span className="span facility-about__text-content">
                        {pageContent.aboutClient}
                      </span>
                    </ViewTransitionItem>
                  )}
                </AppearOnScroll>
              </div>
            </FacilityHeroAboutGroup> */}
          </div>
        )}
        {gallery && gallery.length && <FacilityHeroAboutGallery items={gallery} />}
      </div>
    </div>
  );
};

FacilityHeroAbout.propTypes = {};

export default withTranslation()(FacilityHeroAbout);
