import React, { forwardRef, useCallback, useState } from "react";
import { HeroHeader } from "components/layouts";
import { Tabs, Tab, ContactCard, Cards } from "components/common";
import ContactsHeroMain from "./ContactsHeroMain";
import ContactsHeroRequisites from "./ContactsHeroRequisites";
import { useTranslation } from "react-i18next";
import contacts from "data/contacts";

const ContactsHero = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [activeTabId, setActiveTabId] = useState(0);
  const handleTabChange = useCallback((tabId) => setActiveTabId(tabId), []);

  return (
    <section ref={ref} className="contacts hero">
      <div className="contacts__inner container">
        <HeroHeader title={t("pages:contacts.hero.title")} />
        <div className="contacts__body">
          <ContactsHeroMain />

          <Tabs activeTabId={activeTabId} onChange={handleTabChange} className="contacts__tabs">
            <Tab id={0} label="Отделы">
              <div className="contacts__cards-and-main row">
                <ContactsHeroMain className="contacts__main col-lg-3" />
                <div className="contacts__cards-container col-12 col-lg-9">
                  <Cards>
                    {contacts.map((contact, i) => (
                      <ContactCard
                        key={i}
                        caption={contact.name}
                        contacts={contact.links}
                        className="col-12 col-sm-6 col-xl-4"
                      />
                    ))}
                  </Cards>
                </div>
              </div>
            </Tab>
            <Tab id={1} label="Реквизиты">
              <ContactsHeroRequisites />
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
});

export default ContactsHero;
