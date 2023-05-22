import React from "react";

import classNames from "classnames";

const FancyboxImg = ({ src, thumbnail, alt, group, className, thumbnailClassName }) => {
  if (!thumbnail) {
    thumbnail = src;
  }

  return (
    <a
      onClick={(e) => e.preventDefault()}
      href={src}
      className={classNames("fancybox-img", className)}
      data-fancybox={group}
    >
      <img
        src={thumbnail}
        alt={alt}
        className={classNames("fancybox-img__thumbnail", thumbnailClassName)}
      />
    </a>
  );
};

export default FancyboxImg;
