import React from "react";

import "./MenuCardDetail.css";
const MenuCardDetail = ({ icon, value }) => {
  return (
    <div className="menuCard__detail">
      {icon}
      {value}
    </div>
  );
};

export default MenuCardDetail;
