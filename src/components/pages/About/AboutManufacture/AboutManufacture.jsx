import React from "react";
import { AppearOnScroll, List } from "components/common";
import AboutManufactureGallery from "./AboutManufactureGallery";
import chunk from "lodash/chunk";

const AboutManufacture = ({ title, description, gallery }) => {
  return (
    <section className="our-manufacture block-divider">
      <div className="our-manufacture__inner">
        <header className="our-manufacture__header">
          <div className="our-manufacture__header-inner container row">
            <div className="our-manufacture__title-container container_overflow-hidden col-12 col-md-3 col-xl-12">
              <AppearOnScroll>
                <h2 className="our-manufacture__title title title_section_secondary">{title}</h2>
              </AppearOnScroll>
            </div>
            <div className="our-manufacture__header-group row col-12 col-sm-10 col-md-8 offset-md-1 col-xl-12 offset-xl-0">
              <div className="our-manufacture__caption-container container_overflow-hidden col-12 col-md-9 col-xl-2">
                <AppearOnScroll>
                  <p className="our-manufacture__caption text_description">{description[0]}</p>
                </AppearOnScroll>
              </div>
              <div className="our-manufacture__lists-container col-12 col-md-9 col-xl-9 offset-xl-1">
                <AppearOnScroll group={true} target=".list__item-inner">
                  <div className="our-manufacture__lists">
                    {chunk(description[1], 3).map((listItems, i) => (
                      <List key={i} marked items={listItems} className="our-manufacture__list" />
                    ))}
                  </div>
                </AppearOnScroll>
              </div>
            </div>
          </div>
        </header>
        <div className="our-manufacture__body">
          <AboutManufactureGallery items={gallery} />
        </div>
      </div>
    </section>
  );
};

export default AboutManufacture;
