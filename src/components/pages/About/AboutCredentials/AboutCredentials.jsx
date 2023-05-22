import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Cards } from "components/common";
import { DocCard } from "components/common";
import { withTranslation } from "react-i18next";

const AboutCredentials = ({ tabs }) => {
  const tabsLabels = tabs.map((tab) => tab.label);
  const [activeTabId, setActiveTabId] = useState(0);
  const onTabChange = useCallback((tabId) => setActiveTabId(tabId), []);

  return (
    <section className="credentials">
      <div className="credentials__inner">
        <Tabs
          activeTabId={activeTabId}
          onChange={(tabId) => onTabChange(tabId)}
          className="credentials__tabs"
          innerPadding={true}
          controls={tabsLabels}
        >
          {tabs.map(({ label, cards }, i) => (
            <Tab label={label} id={i} key={i}>
              {cards && (
                <Cards>
                  {cards.map((card, i) => (
                    <DocCard
                      key={i}
                      className="col-12 col-sm-6 col-lg-4 col-xl-3"
                      caption={card.caption}
                      title={card.title}
                      subtitle={card.subtitle}
                      file={card.file}
                      preview={card.preview}
                    />
                  ))}
                </Cards>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

AboutCredentials.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(AboutCredentials);
