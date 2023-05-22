import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { getElemDataAfterTransformations } from "utils/dom";
import { AppearOnScroll, ViewTransitionItem } from "..";

import gsap from "gsap";

import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);

const Tabs = forwardRef(
  (
    {
      children,
      innerPadding,
      headerScroll = { md: false },
      className,
      tabRef,

      activeTabId,
      onChange,
    },
    ref
  ) => {
    const headerRef = useRef(null);
    const tabsRef = useRef(null);
    const slidingLineRef = useRef(null);

    const activeTabRef = useRef();
    const activeControlContainerRef = useRef([]);
    const activeControlRef = useRef();
    const activeControlLabelRef = useRef();

    useImperativeHandle(ref, () => tabsRef.current);

    const setScrollHeaderLeftTo = useCallback((elem, duration) => {
      const headerElem = headerRef.current;
      let x =
        window.innerWidth <= 414
          ? elem.offsetLeft
          : elem.offsetLeft - (headerElem.offsetWidth - elem.offsetWidth) / 2;

      const maxScrollX = headerElem.scrollWidth - headerElem.offsetWidth;

      if (x < 0) {
        x = 0;
      } else if (x > maxScrollX) {
        x = maxScrollX;
      }

      if (duration) {
        gsap.to(headerElem, {
          scrollTo: {
            x: x || 1,
          },
          duration,
          ease: "ease-out",
          force3D: true,
        });
      } else {
        gsap.set(headerElem, {
          scrollTo: {
            x,
          },
        });
      }
    }, []);

    const setSlidingLineTo = useCallback((toElem, duration) => {
      if (!toElem) {
        return;
      }

      const slidingLineElem = slidingLineRef.current;
      const headerElem = headerRef.current;
      const tabsElem = tabsRef.current;
      // Находим ширину и позицию слева, после применения трансформаций (transform: scale)
      // const { width, left } = getElemDataAfterTransformations(toElem, (elAfterTransformations) => {
      //   return elAfterTransformations.getBoundingClientRect();
      // });
      const { width, left } = toElem.getBoundingClientRect();

      // Отступы от экрана до компонента
      const leftPadding = tabsElem.getBoundingClientRect().left;
      // Новая позиция линии
      const x = headerElem.scrollLeft + left - leftPadding;

      if (duration) {
        gsap.to(slidingLineElem, {
          x,
          width,
          duration,
          ease: "ease-out",
        });
      } else {
        gsap.set(slidingLineElem, {
          x,
          width,
        });
      }
    }, []);

    useEffect(() => {
      const controlContainerElem = activeControlContainerRef.current;
      const controlLabelElem = activeControlLabelRef.current;

      const updateSlidingLineAndHeaderScroll = () => {
        setSlidingLineTo(controlLabelElem);
        setScrollHeaderLeftTo(controlContainerElem);
      };

      window.addEventListener("resize", updateSlidingLineAndHeaderScroll);

      return () => {
        window.removeEventListener("resize", updateSlidingLineAndHeaderScroll);
      };
    }, [setSlidingLineTo, setScrollHeaderLeftTo]);

    useEffect(() => {
      const controlContainerElem = activeControlContainerRef.current;
      const controlLabelElem = activeControlLabelRef.current;

      setSlidingLineTo(controlLabelElem, 0.6);
      setScrollHeaderLeftTo(controlContainerElem, 0.6);

      ScrollTrigger.refresh();
    }, [activeTabId, setSlidingLineTo, setScrollHeaderLeftTo]);

    return (
      <div ref={tabsRef} className={classNames("tabs", className)}>
        <div className="tabs__inner">
          <div
            ref={headerRef}
            className={classNames("tabs__header", {
              "tabs__header_scroll-md": headerScroll && headerScroll.md,
            })}
          >
            <div className="tabs__header-inner">
              <AppearOnScroll overflow={false}>
                <ViewTransitionItem tag="ul" overflow={false} className="tabs__controls list">
                  {React.Children.map(children, (child, i) => {
                    const { id, label } = child.props;

                    const isActive = id === activeTabId;

                    return (
                      <li
                        key={id}
                        style={{ zIndex: i }}
                        ref={(el) => {
                          if (isActive) {
                            activeControlContainerRef.current = el;
                          }
                        }}
                        className={classNames("tabs__control-container", {
                          container: innerPadding,
                        })}
                      >
                        <button
                          className={classNames("tabs__control", {
                            active: isActive,
                          })}
                          ref={(el) => {
                            if (isActive) {
                              activeControlRef.current = el;
                            }
                          }}
                          onClick={() => onChange(id)}
                        >
                          <span
                            ref={(el) => {
                              if (isActive) {
                                activeControlLabelRef.current = el;
                              }
                            }}
                            className="tabs__control-label"
                          >
                            {label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ViewTransitionItem>
              </AppearOnScroll>

              <div ref={slidingLineRef} className="tabs__sliding-line" />
            </div>
          </div>
          <div className="tabs__body">
            <div
              className={classNames("tabs__body-inner", {
                container: innerPadding,
              })}
            >
              <ul className="tabs__list list">
                {React.Children.map(children, (child) => {
                  const isActive = child.props.id === activeTabId;

                  return React.cloneElement(child, {
                    key: child.props.id,
                    active: isActive,
                    ref: (el) => {
                      if (isActive) {
                        if (tabRef) {
                          tabRef.current = el;
                        }

                        activeTabRef.current = el;
                      }
                    },
                  });
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Tabs;
