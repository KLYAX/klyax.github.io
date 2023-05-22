import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import GoogleMap from "google-map-react";
import googleMapsStyles from "utils/googleMapsStyles.json";
import { GOOGLE_MAPS_API_KEY } from "config";

import { ReactComponent as MapMarkerIcon } from "assets/images/map-marker.svg";
import { AppearOnScroll } from "components/common";
import SlideUpOnScroll from "components/common/RevaelOnScroll/SlideUpOnScroll";

/**
 * Маркер для карты
 */
function MapMarker() {
  return (
    <MapMarkerIcon style={{ transform: "translate(-50%, -50%)" }} height="64px" width="64px" />
  );
}

class ContactsMap extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }).isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      shouldRenderMap: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ shouldRenderMap: true }));
    }, 2600);
  }

  render() {
    const { title, address, center, className } = this.props;

    return (
      <li className={classNames("maps__item maps-item", className)}>
        <div className="maps-item__header container container_overflow-hidden">
          <SlideUpOnScroll>
            <h3 className="maps-item__title title title_section_secondary">{title}</h3>
          </SlideUpOnScroll>
        </div>
        <div className="maps-item__body container_overflow-hidden">
          <div className="maps-item__map-container">
            <SlideUpOnScroll from={{ delay: 0.8 }} className="maps-item__map-label">
              <span className="maps-item__map-label-content">{address}</span>
            </SlideUpOnScroll>
            <SlideUpOnScroll from={{ opacity: 0, duration: 0.7, y: 50, yPercent: 0 }}>
              <div className="maps-item__map">
                {this.state.shouldRenderMap && (
                  <GoogleMap
                    bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                    options={{
                      disableDefaultUI: true,
                      styles: googleMapsStyles,
                    }}
                    center={center}
                    zoom={18}
                  >
                    <MapMarker {...center} />
                  </GoogleMap>
                )}
              </div>
            </SlideUpOnScroll>
          </div>
        </div>
      </li>
    );
  }
}

export default ContactsMap;
