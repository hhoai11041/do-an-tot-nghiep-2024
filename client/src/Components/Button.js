import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ className, to, children, onClick, type }) => {
  if (to && typeof (to === "string")) {
    return (
      <div className="hover:opacity-80 transition-all">
        <NavLink to={to}>
          <div className={className}>
            <button type={type} className="w-full">
              {children}
            </button>
          </div>
        </NavLink>
      </div>
    );
  } else {
    return (
      <div
        className={`hover:opacity-100 opacity-90 transition-all ${className}`}
        onClick={onClick}
      >
        <button className="w-full" type={type}>
          {children}
        </button>
      </div>
    );
  }
};

export default Button;
