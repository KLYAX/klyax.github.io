import React, { Component, createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Icon, TransitionItem, ViewTransitionItem } from "components/common";
import classNames from "classnames";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useAnimation, usePresence } from "framer-motion";
import { getSlideInOutVariants } from "../SlideInOutOnChange/SlideInOutOnChange";
import Text from "components/common/Text";

/**
 * Компонент создает аккордеон
 */
const Accordion = ({ summary, children, initialOpened = false, minDuration = 0.5 }) => {
  const [open, setOpen] = useState(initialOpened);
  const [isPresent, safeToRemove] = usePresence();
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && !isPresent) {
      setOpen(false);
    }
  }, [open, isPresent]);

  useEffect(() => {
    const bodyElem = bodyRef.current;
    const height = open ? bodyElem.scrollHeight : 0;
    let duration = (height * 1.5) / 1000;

    if (minDuration > duration) {
      duration = minDuration;
    }

    let tween;

    if (!bodyElem.offsetHeight && !isPresent) {
      safeToRemove();
    } else {
      tween = gsap.to(bodyElem, {
        height,
        ease: height ? "ease-out" : "ease-in",
        duration,
        onComplete: () => {
          ScrollTrigger.refresh();

          if (!isPresent) {
            safeToRemove();
          }

          if (open && isPresent) {
            gsap.set(bodyElem, {
              clearProps: "height",
            });
          }
        },
      });
    }

    return () => {
      if (tween) {
        tween.kill();
      }
    };
  }, [open, isPresent, safeToRemove, minDuration]);

  return (
    <motion.div
      layout
      variants={{
        initial: {
          opacity: 0,
        },
        enter: {
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.4,
          },
        },
      }}
      initial="initial"
      animate="enter"
      exit="exit"
      className={classNames("accordion", {
        accordion_opened: open,
      })}
    >
      <div className="accordion__header" onClick={() => setOpen(!open)}>
        <div className="accordion__header-inner">
          <div className="container_overflow-hidden">
            <motion.h3
              variants={getSlideInOutVariants()}
              initial="initial"
              animate="enter"
              exit="exit"
              className="accordion__summary"
            >
              <div>
                <Text>{summary}</Text>
              </div>
            </motion.h3>
          </div>
          <button className="accordion__toggle button container_overflow-hidden" type="button">
            <div className="container_overflow-hidden">
              <div>
                <motion.div
                  variants={getSlideInOutVariants({
                    initial: { y: "-100%" },
                    exit: { y: "100%" },
                  })}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="accordion__toggle-inner button_icon"
                >
                  <Icon name="arrow-down" className="accordion__toggle-icon" />
                </motion.div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="accordion__body" ref={bodyRef} style={{ height: !initialOpened && 0 }}>
        <div className="accordion__body-inner">{children}</div>
      </div>
    </motion.div>
  );
};

export default Accordion;

// class Accordion extends Component {
//   static propType = {
//     /**
//      * Текст который будет располагаться в шапке аккордеона
//      */
//     summary: PropTypes.string.isRequired,
//     /**
//      * Контент аккордеона
//      */
//     children: PropTypes.node,
//     /**
//      * Начальное состояние аккордеона (если true, то аккордеон будет открыт)
//      */
//     initialOpened: PropTypes.bool,
//     /**
//      * Минимальная длительность открытия/закрытия в миллисекундах
//      */
//     minDuration: PropTypes.number,
//   };

//   static defaultProps = {
//     initialOpened: false,
//     minDuration: 0.4,
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       opened: props.initialOpened,
//     };

//     this.body = createRef();

//     this.handleHeaderClick = this.handleHeaderClick.bind(this);
//   }

//   handleHeaderClick(e) {
//     this.setState((prevState) => ({
//       opened: !prevState.opened,
//     }));

//     e.preventDefault();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.opened !== this.state.opened) {
//       const height = this.state.opened ? this.body.current.scrollHeight : 0;
//       const duration = (height * 1.5) / 1000;

//       gsap.to(this.body.current, {
//         height,
//         ease: height !== 0 ? "ease-in" : "ease-out",
//         duration: minDuration > duration ? minDuration : duration,
//         onComplete: () => {
//           ScrollTrigger.refresh();

//           if (this.state.opened) {
//             gsap.set(this.body.current, {
//               clearProps: "height",
//             });
//           }
//         },
//       });
//     }
//   }

//   getBodyStyle() {
//     const result = {
//       maxHeight: 0,
//     };

//     if (this.body.current) {
//       // максимальная высота контента аккордеона
//       const maxHeight = this.state.opened ? this.body.current.scrollHeight : 0;
//       // продолжительность анимации открытия с учетом максимальной высоты
//       let duration = maxHeight * 1.1;

//       if (minDuration > duration) {
//         duration = minDuration;
//       }

//       result.maxHeight = maxHeight;
//       result.transitionDuration = duration + "ms";
//     }

//     return result;
//   }

//   render() {
//     const { summary } = this.props;

//     return (
//       <motion.div
//         variants={{
//           initial: {
//             scaleX: 0,
//             originX: "left",
//           },
//           enter: {
//             scaleX: 1,
//             transition: {
//               duration: 0.6,
//               when: "beforeChildren",
//             },
//           },
//           exit: {
//             scaleX: 0,
//             originX: "right",
//             transition: {
//               duration: 0.6,
//               when: "afterChildren",
//             },
//           },
//         }}
//         className={classNames("accordion", {
//           accordion_opened: this.state.opened,
//         })}
//       >
//         <div className="accordion__header" onClick={this.handleHeaderClick}>
//           <div className="accordion__header-inner">
//             <div className="container_overflow-hidden">
//               <motion.h3
//                 key={summary}
//                 variants={{
//                   initial: {
//                     y: "100%",
//                   },
//                   enter: {
//                     y: 0,
//                     duration: 0.6,
//                   },
//                   exit: {
//                     y: "-100%",
//                     duration: 0.6,
//                   },
//                 }}
//                 initial="initial"
//                 animate="enter"
//                 exit="exit"
//                 className="accordion__summary"
//               >
//                 {summary}
//               </motion.h3>
//             </div>
//             <button className="accordion__toggle button button_icon" type="button">
//               <motion.div
//                 variants={{
//                   initial: {
//                     y: "100%",
//                   },
//                   enter: {
//                     y: 0,
//                     duration: 0.6,
//                   },
//                   exit: {
//                     y: "-100%",
//                     duration: 0.6,
//                   },
//                 }}
//                 initial="initial"
//                 animate="enter"
//                 exit="exit"
//               >
//                 <Icon name="arrow-down" className="accordion__toggle-icon" />
//               </motion.div>
//             </button>
//           </div>
//         </div>

//         <div
//           className="accordion__body"
//           ref={this.body}
//           style={{ height: !initialOpened && 0 }}
//         >
//           <div className="accordion__body-inner">{children}</div>
//         </div>
//       </motion.div>
//     );
//   }
// }

// export default Accordion;
