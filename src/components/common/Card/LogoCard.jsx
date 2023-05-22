import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Card from "./Card";

/**
 * Рендерит карточку в которой будет находится лого расположенное по центру
 *
 * @param {Object} props
 * @param {any} props.src - Src лого
 * @param {boolean} props.alt - Alt лого
 * @param {string} props.className - Класс
 */
function LogoCard({ src, alt, className }) {
  return (
    <Card className={classNames("card_logo", className)}>
      <div className="card__logo-container container_overflow-hidden">
        <img src={src} alt={alt} className="card__logo" />
      </div>
    </Card>
  );
}

LogoCard.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
};

export default LogoCard;
