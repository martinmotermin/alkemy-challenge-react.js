import React, { useContext } from "react";
import { MenuCard } from "../MenuCard/MenuCard";
import { MenuContext } from "../menuContext/MenuContextProvider";
import { MyAcumulatives } from "../MyAcumulatives/MyAcumulatives";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";

import "./MyMenuScreen.css";

export const MyMenuScreen = () => {
  const { myMenuList } = useContext(MenuContext);

  return (
    <div className="myMenu__content container">
      <MyAcumulatives />
      <h1>
        <MdOutlineRestaurantMenu />
        Mi Menu
      </h1>
      {myMenuList.length ? (
        myMenuList.map((menu) => <MenuCard key={menu.id} menu={menu} />)
      ) : (
        <div className="emptyMenu">
          <h3>
            No tienes ningun menu agregado, puedes buscar tus platos preferidos{" "}
            <Link to="/search">aqui</Link>
          </h3>
        </div>
      )}
    </div>
  );
};
