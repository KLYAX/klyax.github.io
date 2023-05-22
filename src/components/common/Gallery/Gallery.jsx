import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Gallery = ({ className, listClassName, items, children, carcase = true }) => {
  return carcase ? (
    <div className={classNames("gallery", className)}>
      <ul className={classNames("gallery__list list", listClassName)}>
        {items.map((item, i) => children(item, i))}
      </ul>
    </div>
  ) : (
    <>{items.map((item, i) => children(item, i))}</>
  );
};

Gallery.propTypes = {
  className: PropTypes.string,
  listClassName: PropTypes.string,
  children: PropTypes.func,
  items: PropTypes.array,
};

export default Gallery;
