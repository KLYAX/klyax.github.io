import { createElement, ReactNode, RefObject, useCallback, useMemo, useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";

const ViewTransition = ({
  tag = "div",
  trigger,
  mode = "out-in",
  className,

  onEnter,
  onExit,

  children,
}) => {
  const viewRef = useRef(null);
  const transitionStateRef = useRef(null);
  const isAppearingRef = useRef(false);

  const handlers = useMemo(
    () => ({
      enter: onEnter,
      exit: onExit,
    }),
    [onEnter, onExit]
  );

  const handleViewTransition = (complete) => {
    const viewElem = viewRef.current;
    const transitionState = transitionStateRef.current;

    const transitionHandler = handlers[transitionState];

    if (transitionHandler) {
      transitionHandler({
        viewElem,
        complete,
        isAppearing: isAppearingRef.current,
      });
    } else {
      complete();
    }
  };

  const handleEnterEvents = useCallback(
    (state) => (isAppearing) => {
      isAppearingRef.current = isAppearing;
      transitionStateRef.current = state;
    },
    []
  );

  const handleExitEvents = useCallback(
    (state) => () => {
      transitionStateRef.current = state;
    },
    []
  );

  return (
    <SwitchTransition mode={mode}>
      <Transition
        nodeRef={viewRef}
        appear={true}
        key={trigger}
        onEnter={handleEnterEvents("enter")}
        onExit={handleExitEvents("exit")}
        addEndListener={handleViewTransition}
      >
        {createElement(tag, { ref: viewRef, className }, children)}
      </Transition>
    </SwitchTransition>
  );
};

export default ViewTransition;
