import React, { useContext } from "react";
import MenuCardDetail from "./MenuCardDetail";

import {
  MdVerified,
  MdCancel,
  MdAccessTimeFilled,
  MdHealthAndSafety,
  MdPeople,
  MdStarHalf,
  MdStar,
  MdOutlineAddCircle,
} from "react-icons/md";

import "./MenuCard.css";
import { MenuContext } from "../menuContext/MenuContextProvider";

export const MenuCard = ({ menu }) => {
  const { addMenuHandler, deleteMenuHandler, myMenuList, detailMenuHandler } =
    useContext(MenuContext);

  const isInMyMenu = myMenuList.some((element) => element.id === menu.id);

  return (
    <div className="menu__card animate__animated animate__fadeIn">
      <img className="card-img" src={`${menu.image}`} alt={menu.title} />
      <div className="card__body">
        <h2 className="card-title">{`${menu.title}`}</h2>
        <div className="divition"></div>
        <div className="menu__card-details">
          <MenuCardDetail
            value={"Vegano"}
            icon={
              menu.vegan ? (
                <MdVerified className="verified" />
              ) : (
                <MdCancel className="notVerified" />
              )
            }
          />
          <MenuCardDetail
            value={`${menu.readyInMinutes}min.`}
            icon={<MdAccessTimeFilled />}
          />
          <MenuCardDetail
            value={`${menu.healthScore}pts.`}
            icon={
              <MdHealthAndSafety
                className={menu.healthScore < 50 ? "lowScore" : "highScore"}
              />
            }
          />
          <MenuCardDetail
            value={`${menu.servings}p.`}
            icon={<MdPeople className="peopleIcon" />}
          />
          <MenuCardDetail
            value={menu.spoonacularScore}
            icon={menu.spoonacularScore < 50 ? <MdStarHalf /> : <MdStar />}
          />
        </div>
        <div className="menuCard__btns">
          {isInMyMenu ? (
            <>
              <button
                className="btn menuCard_btn--delete"
                onClick={() => deleteMenuHandler(menu)}
              >
                Eliminar
              </button>
              <button
                className="btn menuCard_btn--detail"
                onClick={() => detailMenuHandler(menu)}
              >
                Detalle
              </button>
            </>
          ) : (
            <>
              <button
                className="btn menuCard_btn--add"
                onClick={() => addMenuHandler(menu)}
              >
                Agregar
              </button>

              <button
                className="btn menuCard_btn--detail"
                onClick={() => detailMenuHandler(menu)}
              >
                Detalle
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
