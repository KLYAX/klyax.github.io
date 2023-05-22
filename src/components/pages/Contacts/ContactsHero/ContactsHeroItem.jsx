import React from "react";
import { AppearOnScroll, ViewTransitionItem } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";
import Text from "components/common/Text/Text";
import { isArray } from "lodash";

function ContactsHeroItem({ caption, meta }) {
  const metas = isArray(meta) ? meta : [meta];

  return (
    <div className="contacts-item">
      <div className="contacts-item__header container_overflow-hidden">
        <SlideUpOnScroll>
          <p className="contacts-item__caption caption caption_primary">
            <Text>{caption}</Text>
          </p>
        </SlideUpOnScroll>
      </div>
      <div className="contacts-item__body container_overflow-hidden">
        {metas.map(
          (metaItem, i) =>
            metaItem && (
              <SlideUpOnScroll key={i}>
                <p className="contacts-item__meta">
                  <Text>{metaItem}</Text>
                </p>
              </SlideUpOnScroll>
            )
        )}
      </div>
    </div>
  );
}

ContactsHeroItem.propTypes = {};

export default ContactsHeroItem;
