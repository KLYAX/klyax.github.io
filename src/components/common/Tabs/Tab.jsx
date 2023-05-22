import React, { forwardRef } from "react";
import classNames from "classnames";

const Tab = forwardRef(({ children, active, label, id, isActive, className }, ref) => {
  return (
    <li
      ref={ref}
      className={classNames("tabs__content", active ? "active" : "disabled", className)}
    >
      <div className="tabs__content-inner">{children}</div>
    </li>
  );
});

export default Tab;
