import React from "react";

import "./Button.css";

const Button = ({ classname, value, icon, action }) => {
  return (
    <button className={`btn ${classname}`} type={action}>
      {icon}
      {value}
    </button>
  );
};
export default Button;
