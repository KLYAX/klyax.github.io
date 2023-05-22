import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AppearOnScroll, Icon, ViewTransitionItem } from "components/common";
import { useTranslation } from "react-i18next";
import { buildPathToFacility } from "routes/facility";
import { buildFacilityImageSrc } from "utils/path";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isInView } from "utils/dom";
import RevealOnScroll from "components/common/RevaelOnScroll/RevealOnScroll";
import { FACILITIES_IMAGES_PATH } from "config/path";
import Text from "components/common/Text/Text";
import { buildProductImageSrc } from "components/pages/Product/ProductHero/ProductHero";

/**
 * Создает элемент списка, хранящий информацию об объекте
 *
 * @param {object} props
 * @param {object} props.id - Id объекта
 * @param {string} props.name - Название объекта
 * @param {string} props.place - Где объект находится
 * @param {object} props.logo - Лого компании объекта
 * @param {string} props.logo.src - Src лого
 * @param {string} props.logo.alt - Alt лого
 * @param {object|string} props.preview - Превью объекта
 * @param {string} props.linkTo - Ссылка на подробное описание объекта
 */
const FacilityListItem = ({ id, name, isRevealOnScrollActive, location, image }) => {
  const { t } = useTranslation();
  const triggerRef = useRef();
  const timelineRef = useRef();
  const thumbnailRef = useRef();
  const nameRef = useRef();
  const arrowIconRef = useRef();
  const placeRef = useRef();
  const logoRef = useRef();
  const lineRef = useRef();

  const thumbnailImage = image?.thumbnail || {
    src: "",
    alt: "",
  };

  if (!thumbnailImage.src) {
    thumbnailImage.src = buildFacilityImageSrc({
      path: id,
      file: {
        name: "thumbnail",
        ext: "jpg",
        ...thumbnailImage.thumbnailImage,
      },
    });
  }

  if (!thumbnailImage.alt) {
    thumbnailImage.alt = name;
  }

  const logoImage = image?.logo || {
    src: "",
    alt: "",
  };

  if (!logoImage.src) {
    logoImage.src = buildFacilityImageSrc({
      path: id,
      file: {
        name: "logo",
        ext: "png",
        ...thumbnailImage.thumbnailImage,
      },
    });
  }

  if (!logoImage.alt) {
    logoImage.alt = "logo";
  }

  useEffect(() => {
    // const trigger = triggerRef.current;
    // const tl = (timelineRef.current = gsap.timeline({
    //   scrollTrigger: {
    //     trigger,
    //     toggleActions: "play reset play reset",
    //   },
    // }));
    // tl.from(
    //   [
    //     thumbnailRef.current,
    //     nameRef.current,
    //     placeRef.current,
    //     logoRef.current,
    //     arrowIconRef.current,
    //     lineRef.current,
    //   ],
    //   {
    //     stagger: 0.2,
    //     duration: 5,
    //     opacity: 0,
    //     yPercent: 100,
    //     // onStart() {
    //     //   console.log("playing");
    //     // },
    //   }
    // );
    // if (isInView(trigger)) {
    //   console.log("in view");
    //   // tl.progress(1);
    // }
    // return () => {
    //   // containerScrollTrigger.kill();
    //   tl.scrollTrigger.kill();
    //   tl.kill();
    // };
  }, []);

  const animate = (timeline, triggerElem) => {
    const targetElems = triggerElem.querySelectorAll(".container_overflow-hidden > *");
    // const nameElem = triggerElem.querySelector(".facility-list-item__name");
    // const arrowElem = triggerElem.querySelector(".facility-list-item__link-icon");
    // const placeElem = triggerElem.querySelector(".facility-list-item__place");
    // const logoElem = triggerElem.querySelector(".facility-list-item__logo");
    const lineElem = triggerElem.querySelector(".facility-list-item__line");

    timeline.from(lineElem, {
      transformOrigin: "left",
      scaleX: 0,
      duration: 1,
    });

    timeline.from(
      targetElems,
      {
        yPercent: 100,
        stagger: 0.15,
        duration: 0.6,
      },
      "<"
    );
  };

  return (
    <RevealOnScroll
      isActive={isRevealOnScrollActive}
      tag="li"
      className="facility-list-item"
      animate={animate}
    >
      <div className="facility-list-item__container container">
        <Link
          to={buildPathToFacility(id)}
          className="facility-list-item__inner link link_with-arrow-icon row"
        >
          <div className="facility-list-item__header col-12 col-sm-5 col-lg-3 container_overflow-hidden">
            <div className="facility-list-item__header-inner">
              <div className="facility-list-item__image-wrapper">
                <img
                  ref={thumbnailRef}
                  src={thumbnailImage.src}
                  alt={t(thumbnailImage.alt)}
                  className="facility-list-item__image"
                />
              </div>
            </div>
          </div>
          <div className="facility-list-item__body col-12 col-sm-6 col-lg-8 offset-sm-1">
            <div className="facility-list-item__body-inner row">
              <div className="facility-list-item__name-container container_overflow-hidden col-9 col-lg-5">
                <div>
                  <p ref={nameRef} className="facility-list-item__name">
                    <Text>{name}</Text>
                  </p>
                </div>
              </div>

              <div className="facility-list-item__link-container col-3 col-lg-1 order-lg-3 container_overflow-hidden link__arrow-icon">
                <div>
                  <Icon
                    ref={arrowIconRef}
                    name="link-arrow-up-medium"
                    className="facility-list-item__link-icon"
                  />
                </div>
              </div>

              <div className="facility-list-item__place-container container_overflow-hidden col-12 col-lg-3 offset-lg-1">
                <div>
                  <p ref={placeRef} className="facility-list-item__place">
                    <Text>{location}</Text>
                  </p>
                </div>
              </div>

              <div className="facility-list-item__logo-container container_overflow-hidden col-12 col-lg-2">
                <div>
                  <img
                    ref={logoRef}
                    src={logoImage.src}
                    alt={t(logoImage.alt)}
                    className="facility-list-item__logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div ref={lineRef} className="facility-list-item__line" />
        </Link>
      </div>
    </RevealOnScroll>
  );
};

export default FacilityListItem;
