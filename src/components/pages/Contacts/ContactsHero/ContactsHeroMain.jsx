import React from "react";
import classNames from "classnames";
import ContactsHeroItem from "./ContactsHeroItem";
import { withTranslation } from "react-i18next";
import { AppearOnScroll, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

const contacts = [
  {
    href: "tel:+78633089090",
    itemProp: "telephone",
    label: "+7 (863) 308 90 90",
  },
  {
    href: "tel:+74991109090",
    itemProp: "telephone",
    label: "+7 (499) 110 90 90",
  },

  {
    href: "mailto:info@globe-it.ru",
    itemProp: "email",
    label: "info@globe-it.ru",
  },
];

const workingTime = {
  caption: "режим работы",
  datetime: "Mo-Fr 8:00-17:00",
  itemProp: "openingHours",
  label: "пн-пт 8:00-17:00",
};

const address = {
  office: {
    caption: "офис",
    meta: "Ростов-на-Дону\nул. Вавилова, 62, оф.403",
  },
  storage: {
    caption: "склад",
    meta: "Ростов-на-Дону\nул. Вавилова, 65",
  },
};

function ContactsHeroMain({ className, t }) {
  return (
    <div className={classNames("contacts__main contacts-main", className)}>
      <div className="contacts-main__inner row">
        <div className="contacts-main__item col-6 col-lg-12 order-md-3">
          <ContactsHeroItem
            caption={t(workingTime.caption)}
            meta={workingTime.label}
          />
        </div>

        <div className="contacts-main__item col-6 col-lg-12 order-md-1 order-lg-0">
          <div className="contacts-main__contacts contacts-main-contacts">
            <ul className="contacts-main-contacts__list list">
              {contacts.map(({ label, href, itemProp }, i) => (
                <li
                  key={i}
                  className="contacts-main-contacts__item container_overflow-hidden"
                >
                  <SlideUpOnScroll>
                    <a
                      itemProp={itemProp}
                      href={href}
                      className="contacts-link contacts-link_md"
                    >
                      {label}
                    </a>
                  </SlideUpOnScroll>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="contacts-main__item col-6 col-lg-12 order-md-0 order-lg-1">
          <ContactsHeroItem
            caption={t(address.office.caption)}
            meta={t(address.office.meta)}
          />
        </div>

        <div className="contacts-main__item col-6 col-lg-12 order-md-2">
          <ContactsHeroItem
            caption={t(address.storage.caption)}
            meta={t(address.storage.meta)}
          />
        </div>
      </div>
    </div>
  );
}

ContactsHeroMain.propTypes = {};

export default withTranslation()(ContactsHeroMain);
