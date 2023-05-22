import React from "react";
import { AppearOnScroll, RawHtml, List } from "components/common";
import UseCasesStatistic from "./UseCasesStatistic";
import { useTranslation, withTranslation } from "react-i18next";
import chunk from "lodash/chunk";

const UseCases = ({ title, description, table }) => {
  const { t } = useTranslation();

  return (
    <section className="products-use-cases">
      <div className="products-use-cases__inner container">
        <header className="products-use-cases__header container_overflow-hidden">
          <AppearOnScroll>
            <h2 className="products-use-cases__title title title_section_secondary">{title}</h2>
          </AppearOnScroll>
        </header>
        <div className="products-use-cases__description products-use-cases-description row">
          <div className="products-use-cases-description__main products-use-cases-description-main container_overflow-hidden col-12 col-sm-5 col-md-5 col-lg-4 col-xl-2">
            <AppearOnScroll>
              <p className="products-use-cases-description-main__text text_secondary">
                {description[0]}
              </p>
            </AppearOnScroll>
          </div>
          <AppearOnScroll
            overflow={false}
            group={true}
            target=".list__item-inner"
            className="products-use-cases-description__use-cases products-use-cases-description-use-cases col-12 col-sm-7 col-md-7 col-lg-5 col-xl-5 offset-xl-1"
          >
            {chunk(description[1], 3).map((list, i) => (
              <List
                key={i}
                marked
                items={list}
                className="products-use-cases-description-use-cases__list"
              />
            ))}
          </AppearOnScroll>
        </div>

        <UseCasesStatistic data={table} />
      </div>
    </section>
  );
};

export default UseCases;
