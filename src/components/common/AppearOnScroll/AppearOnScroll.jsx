import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Компонента служит для обертывания элемента, который будет анимароваться при скролле
 */
class AppearOnScroll extends Component {
  static propTypes = {
    /**
     * Селектор элемента при скролле до которого будет проигрываться анимация,
     * если не указан, тогда триггером будет служить сам компонент
     */
    trigger: PropTypes.string,
    /**
     * Если значение в true, тогда будут анимироваться все дочерние элементы (на 1 уровень),
     * или элементы, которые указаны в пропсе target
     */
    group: PropTypes.bool,
    /**
     * Селектор элемента, который надо анимировать, если не указан,
     * тогда будет анимироваться первый дочерний
     */
    target: PropTypes.string,
    /**
     * Gsap параметры анимации
     */
    vars: PropTypes.object,
    /**
     * Тэг компонента
     */
    tag: PropTypes.string,
    /**
     * Если значение в false, тогда убирает overflow: hidden
     */
    overflow: PropTypes.bool,
  };

  static defaultProps = {
    tag: "div",
    overflow: true,
  };

  constructor(props) {
    super(props);

    this.elemRef = createRef();
  }

  initAnimation() {
    /**
     * @type {HTMLElement}
     */
    const container = this.elemRef.current;
    const { overflow } = this.props;
    let target = [];
    let trigger = container;

    if (this.props.target) {
      target = container.querySelectorAll(this.props.target);
    } else {
      target = container.children;
    }

    if (target.length === 0) {
      return;
    }

    if (!this.props.target && !this.props.group) {
      target = target[0];
    }

    if (this.props.trigger) {
      trigger = this.props.trigger;
    }

    gsap.set(target, {
      backfaceVisibility: "hidden",
    });

    this.tween = gsap.from(target, {
      scrollTrigger: {
        trigger,
        toggleActions: "play reset play reset",
        onLeaveBack() {
          if (overflow) {
            gsap.set(container, {
              overflow: "hidden",
            });
          }
        },
        onLeave() {
          if (overflow) {
            gsap.set(container, {
              overflow: "hidden",
            });
          }
        },
      },
      onComplete() {
        if (overflow) {
          gsap.set(container, {
            overflow: "",
          });
        }
      },
      // force3D: true,
      duration: 0.5,
      delay: 0.1,
      yPercent: 101,
      ease: "ease-out",
      ...this.props.vars,
    });
  }

  componentDidMount() {
    this.initAnimation();
  }

  componentWillUnmount() {
    if (this.tween) {
      this.tween.kill();
    }
  }

  render() {
    const { children, overflow, className, tag: TagName } = this.props;

    return (
      <TagName
        ref={this.elemRef}
        style={{ overflow: overflow && "hidden" }}
        className={classNames("appear-on-scroll", className)}
      >
        {children}
      </TagName>
    );
  }
}

export default AppearOnScroll;
