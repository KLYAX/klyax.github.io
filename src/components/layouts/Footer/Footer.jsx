import React from "react";
import PropTypes from "prop-types";
import FooterNav from "./FooterNav";
import { Copyright } from "components/layouts";
import { withTranslation } from "react-i18next";
import { AppearOnScroll } from "components/common";
import { buildPathToProduct } from "routes/product";
import { buildPathToDocumentation } from "routes/documentation";

const documentations = [
  {
    id: "technical-documentation",
    name: "Техническая документация",
    subcategories: [
      {
        name: "Шкафы управления",
        documents: [],
      },
      {
        name: "Шкафы управления",
        documents: [],
      },
    ],
  },
  {
    id: "product-catalogues",
    name: "Каталоги продукции",
    documents: [],
  },
  {
    id: "certificates",
    name: "Сертификаты",
    documents: [],
  },
];

const navs = [
  {
    title: "Продукция",
    navItems: [
      {
        label: "Электроника",
        link: buildPathToProduct("electronics"),
      },
      {
        label: "Шкафы управления",
        link: buildPathToProduct("control-cabinets"),
      },
      {
        label: "Насосные станции",
        link: buildPathToProduct("pumping-stations"),
      },
      {
        label: "Блок контейнеры",
        link: buildPathToProduct("block-containers"),
      },
    ],
  },
  {
    title: "Документация",
    navItems: [
      {
        id: "technical-documentation",
        label: "Technical documentation",
        link: buildPathToDocumentation("technical-documentation"),
      },
      {
        id: "product-catalog",
        label: "Product catalogs",
        link: buildPathToDocumentation("product-catalog"),
      },
      {
        id: "certificates",
        label: "Certificates",
        link: buildPathToDocumentation("certificates"),
      },
    ],
  },
];

const contactsPrimary = [
  {
    href: "tel:+78633089090",
    itemProp: "telephone",
    label: "+7 (863) 308 90 90",
  },
  {
    href: "mailto:info@globe-it.ru",
    itemProp: "email",
    label: "info@globe-it.ru",
  },
];

function Footer({ renderHeaderInner, t }) {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__inner">
          <div className="footer__header">
            {renderHeaderInner ? (
              renderHeaderInner()
            ) : (
              <AppearOnScroll>
                <h2
                  className="footer__title title"
                  dangerouslySetInnerHTML={{
                    __html: t("Globus group of companies"),
                  }}
                />
              </AppearOnScroll>
            )}
          </div>
          <div className="footer__body">
            <div className="footer__main row">
              <div className="footer__navs order-1 order-xl-0 col-12 col-xl-6 row">
                {navs.map((nav, i) => (
                  <FooterNav
                    key={i}
                    title={nav.title}
                    navItems={nav.navItems}
                    className="footer__nav col-6 col-xl-12"
                  />
                ))}
              </div>
              <div
                className="footer__company-info footer-company-info order-0 order-xl-1 col-12 col-xl-6 row"
                itemScope=""
                itemType="http://schema.org/ElectronicsStore"
              >
                <div className="footer-company-info__contacts col-12 col-sm-6 col-xl-12">
                  <ul className="footer-company-info__contacts-list list row">
                    {contactsPrimary.map((contact, i) => (
                      <li key={i} className="footer-company-info__contact contact col-12 col-xl-6">
                        <a
                          href={contact.href}
                          itemProp={contact.itemProp}
                          className="contact__content contact__content_large footer-company-info__contact-link link link_hover-underline"
                        >
                          <AppearOnScroll>
                            <span className="span">{contact.label}</span>
                          </AppearOnScroll>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="footer-company-info__general col-12 col-sm-6 col-xl-12">
                  <div className="contact">
                    <AppearOnScroll tag="p" className="contact__label">
                      <span className="span">{t("Working hours")}</span>
                    </AppearOnScroll>
                    <AppearOnScroll
                      tag="time"
                      className="contact__content footer__contact contact__content_large"
                      itemProp="openingHours"
                      dateTime="Mo-Fr 8:00-17:00"
                    >
                      <span className="span">
                        {t("day-of-week.short.mo")}-{t("day-of-week.short.fr")} 8:00-17:00
                      </span>
                    </AppearOnScroll>
                  </div>
                </div>
              </div>
            </div>
            <Copyright
              className="footer__copyright"
              leftClassName="col-12 col-sm-6"
              rightClassName="col-12 col-sm-6"
              innerPadding={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  renderHeaderInner: PropTypes.func,
};

export default withTranslation()(Footer);
