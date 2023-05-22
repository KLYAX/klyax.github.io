import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import ContactsMap from "./ContactsMap";

const maps = [
  {
    name: "office",
    title: "Office",
    address: "Ростов-на-Дону, ул. Вавилова, 62, оф.403",
    center: {
      lat: 47.2739413,
      lng: 39.6850012,
    },
  },
  {
    name: "storage",
    title: "Storage",
    address: "Ростов-на-Дону, ул. Вавилова, 65",
    center: {
      lat: 47.273991,
      lng: 39.685659,
    },
  },
];

class ContactsMaps extends Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.props;

    return (
      <section className="maps">
        <div className="maps__inner">
          <ul className="maps__list list row">
            {maps.map((map, i) => (
              <ContactsMap
                key={i}
                title={t(map.title)}
                address={t(map.address)}
                center={map.center}
                className="col-12 col-md-6"
              />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default withTranslation()(ContactsMaps);
