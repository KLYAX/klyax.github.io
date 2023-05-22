const { enableBodyScroll, disableBodyScroll } = require("body-scroll-lock");
const { useEffect, useCallback } = require("react");

const useBodyScrollLocker = (targetElem, options) => {
  const disableScroll = useCallback(() => {
    disableBodyScroll(targetElem, {});
  }, [targetElem, options]);

  const enableScroll = useCallback(() => {
    enableBodyScroll(targetElem);
  }, [targetElem, options]);
};
