import React from "react";
import PropTypes from "prop-types";
import { Footer } from "components/layouts";
import { withTranslation } from "react-i18next";
import { AppearOnScroll } from "components/common";

/**
 * Компонент создает футер для страницы "Главная"
 *
 * @param {Object} props
 */
function HomeFooter({ t }) {
  return (
    <Footer
      renderHeaderInner={() => (
        <div className="footer__header-inner  ">
          <div className="footer__header-main">
            <div className="footer__title-container">
              <AppearOnScroll>
                <h2
                  className="footer__title footer__title_accent title"
                  dangerouslySetInnerHTML={{
                    __html: t("pages:home.footer.title"),
                  }}
                />
              </AppearOnScroll>
            </div>
            <div className="footer__subtitle-container">
              <AppearOnScroll>
                <p
                  className="footer__subtitle"
                  dangerouslySetInnerHTML={{
                    __html: t("pages:home.footer.subtitle"),
                  }}
                />
              </AppearOnScroll>
            </div>
          </div>
        </div>
      )}
    />
  );
}

HomeFooter.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(HomeFooter);
