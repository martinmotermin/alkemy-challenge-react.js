import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenuById } from "../helpers/getMenuById";
import { MenuContext } from "../menuContext/MenuContextProvider";
import { MenuModal } from "../Modals/menuModal";
import { MdVerified, MdCancel } from "react-icons/md";

import "./MenuCardInfo.css";
import "./MenuCardDetail.css";

export const MenuCardInfo = () => {
  const [menu, setMenu] = useState({});
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { myMenuList } = useContext(MenuContext);

  const isInMyMenu = myMenuList.filter((myMenu) => myMenu.id == menuId);

  useMemo(() => {
    isInMyMenu.length > 0
      ? setMenu(isInMyMenu[0])
      : getMenuById(menuId)
          .then((res) => {
            setMenu(res);
          })
          .catch((error) => {
            MenuModal.fire({
              icon: "error",
              title: "No se ha encontrado este menu!",
            });
            return navigate("/search");
          });
  }, [menuId]);

  return (
    <div className="container menuInfo__content">
      <img
        src={menu.image}
        alt={menu.title}
        className="menu__content-img animate__animated animate__fadeInLeft"
      />
      <div className="menu__content-data animate__animated animate__fadeIn">
        <h3>{menu.title}</h3>
        <ul className="responsive-table">
          <li className="table-row">
            <div className="rowTitle">Tipo de dieta</div>
            <div className="rowValue">{menu.diets}</div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Gluten free</div>
            <div className="rowValue">
              {menu.glutenFree ? (
                <MdVerified className="verified" />
              ) : (
                <MdCancel className="notVerified" />
              )}
            </div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Precio por persona</div>
            <div className="rowValue">${menu.pricePerServing}</div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Receta para</div>
            <div className="rowValue">{menu.servings} personas</div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Listo en</div>
            <div className="rowValue">{menu.readyInMinutes} minutos.</div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Link a la receta</div>
            <div className="rowValue">
              {<a href={`${menu.sourceUrl}`}>{menu.title}</a>}
            </div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Vegano</div>
            <div className="rowValue">
              {menu.vegan ? (
                <MdVerified className="verified" />
              ) : (
                <MdCancel className="notVerified" />
              )}
            </div>
          </li>
          <li className="table-row">
            <div className="rowTitle">Vegetariano</div>
            <div className="rowValue">
              {menu.vegan ? (
                <MdVerified className="verified" />
              ) : (
                <MdCancel className="notVerified" />
              )}
            </div>
          </li>
        </ul>
        <button className="btn searchButton" onClick={() => navigate(-1)}>
          VOLVER
        </button>
      </div>
    </div>
  );
};
