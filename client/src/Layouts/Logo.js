import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assets/Images/logo.png";
const Logo = ({ className }) => {
  return (
    <div>
      <NavLink to="/">
        <img
          // src="https://seeklogo.com/images/K/klook-logo-6A91946E9B-seeklogo.com.png"
          src={logo}
          alt=""
          className={className}
        />
      </NavLink>
    </div>
  );
};

export default Logo;
