import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import classNames from "classnames";
import { DownloadIcon } from "components/common";
import { withTranslation } from "react-i18next";
import { ViewTransitionItem } from "components/common";
import Text from "../Text/Text";

/**
 * Создает карточку документа, который в последующем можно скачать
 *
 * @param {Object} props
 * @param {string} [props.caption=руководство по эксплуатации] - Подпись
 * @param {string} props.title - Заголовок
 * @param {string} [props.subtitle] - Подзаголовок
 * @param {string} [props.preview] - Превью документа
 * @param {string} props.file - Ссылка на скачивание документа
 * @param {string} [props.className] - Класс
 */
function DocCard({ caption, title, subtitle, preview, file, className, t }) {
  if (typeof preview === "string") {
    preview = {
      src: preview,
      alt: title,
    };
  }

  const fileName = (title || caption).replace(/\./g, "-");

  return (
    <Card hover={true} className={classNames({ "card_with-preview": preview }, className)}>
      <div className="card__header">
        <div className="card__caption-container">
          <div className="container_overflow-hidden">
            <div>
              <p className="card__caption caption caption_primary">
                <Text>{caption}</Text>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card__body">
        <div className="card__title-container">
          <div className="container_overflow-hidden">
            <div>
              <h3 className="card__title title">
                <Text>{title}</Text>
              </h3>
            </div>
          </div>
        </div>
        {subtitle && (
          <div className="card__subtitle-container">
            <div className="container_overflow-hidden">
              <div>
                <p className="card__subtitle">
                  <Text>{subtitle}</Text>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="card__footer">
        <div className="card__footer-inner">
          {preview && (
            <div className="card__preview ">
              <div className="container_overflow-hidden">
                <div>
                  <img src={preview.src} alt={preview.alt} className="card__preview-image" />
                </div>
              </div>
            </div>
          )}

          <div className="card__link-container">
            <div className="container_overflow-hidden">
              <div>
                <a href={file} download={fileName} className="card__link card__link_download link">
                  скачать
                  <DownloadIcon className="card__link-download-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

DocCard.propTypes = {
  caption: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  preview: PropTypes.oneOfType([
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  file: PropTypes.string,
};

DocCard.defaultProps = {
  caption: "руководство по эксплуатации",
  file: "#",
};

export default withTranslation()(DocCard);
