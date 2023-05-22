import { useEffect, useRef } from "react";
import classNames from "classnames";

import $ from "jquery";
import "@fancyapps/fancybox/dist/jquery.fancybox.css";

window.jQuery = window.$ = $;

require("@fancyapps/fancybox");

$.fancybox.defaults.hash = false;

const Fancybox = ({ children, className }) => {
  const fancyboxRef = useRef(null);

  useEffect(() => {
    const fancyboxElem = fancyboxRef.current;
    const media = matchMedia("(min-width: 576px)");

    const initFancybox = () => {
      $(fancyboxElem).find("[data-fancybox]").fancybox();
    };

    const destroyFacnybox = () => {
      $.fancybox.destroy();
    };

    const toggleFancybox = () => {
      if (media.matches) {
        initFancybox();
        console.log("init");
      } else {
        destroyFacnybox();
        console.log("destory");
      }
    };

    toggleFancybox();

    media.addEventListener("change", toggleFancybox);

    return () => {
      media.removeEventListener("change", toggleFancybox);
    };
  }, []);

  return (
    <div ref={fancyboxRef} className={classNames("fancybox", className)}>
      {children}
    </div>
  );
};

export default Fancybox;
