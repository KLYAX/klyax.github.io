import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import {
  getMoveRectsToInitialPositionTimeline,
  getRectsConvergenceTimeline,
  getRectsDivergenceTimeline,
  getTransformToLogoTimeline,
} from "timelines/preloader";
import { withTranslation } from "react-i18next";
import { ReactComponent as Globe } from "assets/images/logo-globe.svg";
import gsap from "gsap";

class Preloader extends Component {
  static propTypes = {
    t: PropTypes.func,
    loop: PropTypes.bool,
    onAnimationEnd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.timeline = gsap.timeline({ paused: true });
  }

  initAnimation() {
    // Задержка перед каждым этапом анимации
    const posBtwStages = "+=0.1";

    this.timeline.add(getMoveRectsToInitialPositionTimeline(), posBtwStages);

    this.timeline.addLabel("loopStart");
    this.timeline.add(getRectsConvergenceTimeline(), posBtwStages);
    this.timeline.add(getRectsDivergenceTimeline(), posBtwStages);
    this.timeline.addLabel("loopEnd");

    this.timeline.add(() => {
      if (this.props.loop) {
        this.timeline.seek("loopStart");
      }
    });

    this.timeline.add(getTransformToLogoTimeline(), posBtwStages);

    this.timeline.add(this.props.onAnimationEnd);

    // this.timeline.add(getHidePreloaderTween(), posBtwStages);

    // Прячем прилоудер
    // this.timeline.add(this.hide);
    this.timeline.play(0);
  }

  componentDidMount() {
    this.initAnimation();
  }

  render() {
    const { t } = this.props;

    return (
      <div className={classNames("preloader")}>
        <div className="preloader__logo preloader-logo">
          <div className="preloader-logo__icon">
            <div className="preloader-logo__icon-rects">
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((rect, i) => (
                <div
                  key={i}
                  className={classNames(
                    "preloader-logo__icon-rect",
                    `preloader-logo__icon-rect_${rect}`
                  )}
                >
                  <div className="preloader-logo__icon-rect-inner"></div>
                </div>
              ))}
            </div>
            <Globe className="preloader-logo__icon-globus" />
          </div>
          <span className="preloader-logo__text">{t("Globe")}</span>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withTranslation()(Preloader));
