import React, { Component } from "react";
import PropTypes from "prop-types";

import FeaturesProduct from "./FeaturesProduct";

class FeaturesContent extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="features-main__product features-main-product row">
        {/* <FeaturesProduct
          image={activeContent.image}
          className="features-main-product__view col-12 col-lg-5 col-xl-4"
        />

        <div className="features-main-product__description features-main-product-description col-12 col-lg-7 col-xl-8">
          <AppearOnScroll
            overflow={false}
            group={true}
            target=".list__item-inner"
            vars={{ stagger: 0.05 }}
          >
            <ul
              key={`list-${activeContent.features.toString()}`}
              className="features-main-product-description__list list"
            >
              {activeContent.features.map((item, i) => (
                <div className="list__item-container container_overflow-hidden">
                  <div key={`list-item-${item}`} className="list__item-inner">
                    {item}
                  </div>
                </div>
              ))}
            </ul>
          </AppearOnScroll>

          <AppearOnScroll>
            <p className="features-main-product-description__text text_tertiary text_sm">
              {activeContent.about}
            </p>
          </AppearOnScroll>
        </div> */}
      </div>
    );
  }
}

export default FeaturesContent;
