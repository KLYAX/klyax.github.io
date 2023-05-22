import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "./Card";
import { ViewTransitionItem } from "..";

/**
 * Компонент карточка с контактами
 *
 * @param {Object} props - Конфигурация карточки
 * @param {string} props.caption - Подпись карточки
 * @param {Object[]} props.contacts - Список контактов
 * @param {string} props.contacts[].href - Url на контакт
 * @param {string} props.contacts[].label - Подпись контакта
 */
function ContactsCard({ caption, contacts, className }) {
  return (
    <Card hover={true} className={classNames("card_contacts", className)}>
      <div className="card__header">
        <div className="card__caption-container">
          <div className="container_overflow-hidden">
            <div>
              <p className="card__caption caption caption_primary">{caption}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card__footer">
        <ul className="card__contacts list">
          {contacts.map(({ href, label }, i) => (
            <li key={i} className="card__contact">
              <div className="card__link-container">
                <div className="container_overflow-hidden">
                  <div>
                    <a href={href} className="card__link card__link_contact link">
                      {label}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

ContactsCard.propTypes = {
  caption: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default ContactsCard;
