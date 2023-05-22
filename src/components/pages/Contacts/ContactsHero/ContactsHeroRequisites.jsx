import React from "react";

import ContactsHeroItem from "./ContactsHeroItem";
import { withTranslation } from "react-i18next";
import { AppearOnScroll, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

const requisites = [
  {
    name: "ИНН\\КПП",
    value: "6164260383\\616401001",
  },
  {
    name: "БИК",
    value: "046015762",
  },
  {
    name: "ОКПО",
    value: "97819758",
  },
  {
    name: "ОГРН",
    value: "1076164000934",
  },
  {
    name: "банк",
    value: "ПАО КБ&nbsp;&laquo;Центр-Инвест&raquo;\nв&nbsp;г.Ростов-на-Дону",
  },
  {
    name: "ОКАТО",
    value: "60401372000",
  },
  {
    name: "р\\сч",
    value: "40702810800000010323",
  },
  {
    name: "к\\с",
    value: "30101810100000000762",
  },
  {
    name: "ОКВЭД",
    value: "51.65.6",
  },
];

const addresses = [
  {
    name: "юридический адрес",
    postcode: "344064",
    address: "г. Ростов-на-Дону\nВавилова, 62в, к.14а\n(с21.08.2020г.)",
  },
  {
    name: "фактический адрес",
    postcode: "344064",
    address: "г. Ростов-на-Дону\nВавилова, 62в, к.14а\n(с21.08.2020г.)",
  },
  {
    name: "почтовый адрес",
    postcode: "344012",
    address: "г.Ростов-на-Дону, 344064 а/я 42",
  },
];

function ContactsHeroRequisites({ t }) {
  const list = [
    {
      caption: "INN\\KPP",
      meta: "6164260383\\616401001",
    },
    {
      caption: "BIK",
      meta: "046015762",
    },
    {
      caption: "OGRN",
      meta: "1076164000934",
    },
    {
      caption: "Bank",
      meta: "pages:contacts.hero.requisite.bank",
    },
    {
      caption: "p\\n",
      meta: "40702810800000010323",
    },
    {
      caption: "c\\a",
      meta: "30101810100000000762",
    },
    {
      caption: "OKPO",
      meta: "97819758",
    },
    {
      caption: "OKATO",
      meta: "60401372000",
    },
  ];

  return (
    <div className="contacts-requisites">
      <div className="contacts-requisites__inner row">
        <div className="contacts-requisites__header col-12 col-xl-3 container_overflow-hidden">
          <SlideUpOnScroll>
            <h2 className="title title_section_secondary">{t("Requisites")}</h2>
          </SlideUpOnScroll>
        </div>
        <div className="contacts-requisites__body col-12 col-xl-9">
          <ul className="contacts-requisites__list row list">
            {requisites.map((requisite, i) => (
              <li key={i} className="contacts-requisites__item col-12 col-sm-6 col-xl-4">
                <ContactsHeroItem caption={requisite.name} meta={requisite.value} />
              </li>
            ))}
          </ul>
          <ul className="contacts-requisites__list row list">
            {addresses.map((address, i) => (
              <li key={i} className="contacts-requisites__item col-12 col-sm-6 col-xl-4">
                <ContactsHeroItem
                  caption={address.name}
                  meta={[address.postcode, address.address]}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ContactsHeroRequisites.propTypes = {};

export default withTranslation()(ContactsHeroRequisites);
