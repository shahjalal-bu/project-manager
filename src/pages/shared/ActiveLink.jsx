import React from "react";
import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending " + className
          : isActive
          ? "text-sm text-blue-600 font-bold " + className
          : " " + className
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
