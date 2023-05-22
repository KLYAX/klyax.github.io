import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SlideSwitch } from "components/common";
import AdvantagesHeader from "./AdvantagesHeader";
import AdvantagesSliderNav from "./AdvantagesSliderNav";
import AdvantagesSlider from "./AdvantagesSlider";

class Advantages extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    slides: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    initialSlideIndex: PropTypes.number,
  };

  static defaultProps = {
    initialSlideIndex: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSlideIndex: props.initialSlideIndex,
    };

    this.changeActiveSlide = this.changeActiveSlide.bind(this);
  }

  /**
   * Меняет активный слайд по индексу
   *
   * @param {number} index - Индекс слайда
   */
  changeActiveSlide(index) {
    this.setState({
      activeSlideIndex: index,
    });
  }

  render() {
    const { title, subtitle, slides, className, innerRef } = this.props;

    const sliderNav = slides.map(({ label }) => label);

    return (
      <section ref={innerRef} className={classNames("advantages", className)}>
        <div className="advantages__inner container">
          <AdvantagesHeader title={title} subtitle={subtitle} className="advantages__header" />

          <div className="advantages__body row">
            <div className="advantages__aside advantages-aside col-12 col-md-4 col-xl-3">
              <AdvantagesHeader
                title={title}
                subtitle={subtitle}
                className="advantages__aside-header"
              />

              <div className="advantages__aside-body row">
                <SlideSwitch
                  verticalButtons={{ md: true }}
                  hideTimer={{ md: true }}
                  className="advantages__slide-switcher advantages-slide-switcher order-1 col-auto order-md-0 col-md-12"
                />
                <AdvantagesSliderNav
                  activeSlideIndex={this.state.activeSlideIndex}
                  changeActiveSlide={this.changeActiveSlide}
                  nav={sliderNav}
                  className="order-0 order-md-1 col col-md-12"
                />
              </div>
            </div>
            <div className="advantages__main col-12 col-md-8 col-xl-9">
              <AdvantagesSlider
                activeSlideIndex={this.state.activeSlideIndex}
                changeActiveSlide={this.changeActiveSlide}
                slides={slides}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Advantages.propTypes = {};

export default Advantages;
