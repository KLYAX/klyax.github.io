import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppearOnScroll, Cards, DocCard, ViewTransitionItem } from "components/common";
import { useTranslation } from "react-i18next";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";
import RevealOnScroll from "components/common/RevaelOnScroll/RevealOnScroll";

const PageDocumentationCardGroup = ({ label, cards = [] }) => {
  const { t } = useTranslation();
  // const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsActive(true);
  //   }, 5000);
  // }, []);

  const animateCards = useCallback((timeline, triggerElem) => {
    const cardsElem = triggerElem.querySelector(".cards");
    const cardsPartsElems = cardsElem.querySelectorAll(".container_overflow-hidden > *");

    timeline.from(cardsElem, {
      opacity: 0,
      delay: 0.2,
    });

    timeline.from(cardsPartsElems, {
      yPercent: 100,
      ease: "ease-out",
      stagger: 0.05,
    });

    return () => {
      timeline.set([cardsElem, cardsPartsElems], {
        clearProps: "all",
      });
    };
  }, []);

  return (
    <li className="documentation-tech-docs__item documentation__group documentation-tech-docs-item">
      <div className="documentation-tech-docs-item__inner row">
        <div className="documentation-tech-docs-item__header documentation__group-header col-12 col-xl-3">
          <SlideUpOnScroll>
            <p className="documentation-tech-docs-item__caption documentation__group-caption caption caption_primary">
              {label}
            </p>
          </SlideUpOnScroll>
        </div>
        <div className="documentation-tech-docs-item__body col-12 col-xl-9">
          <Cards className="documentation-tech-docs-item__cards">
            {cards.map((card, i) => (
              <DocCard
                key={i}
                title={t(card.title)}
                caption={t(card.caption)}
                subtitle={t(card.subtitle)}
                preview={card.preview}
                file={card.file}
                className="documentation-tech-docs-item__card col-12 col-md-6 col-lg-4"
              />
            ))}
          </Cards>
        </div>
      </div>
    </li>
  );
};

PageDocumentationCardGroup.propTypes = {
  label: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func,
};

export default PageDocumentationCardGroup;
