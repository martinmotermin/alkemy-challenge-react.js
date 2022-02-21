import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuModal } from "../Modals/menuModal";

export const MenuContext = createContext([]);

export const MenuContextProvider = ({ children }) => {
  let myMenu = JSON.parse(localStorage.getItem("myMenu")) || [];
  const [myMenuList, setMyMenuList] = useState(myMenu);
  const [error, setError] = useState({ error: false, errorMsg: "" });

  const navigate = useNavigate();

  const addMenuHandler = (menu) => {
    const isInMyMenu = myMenuList.some((element) => element.id === menu.id);

    const veganMenues = myMenuList.filter((menu) => menu.vegan === true);
    const notVeganMenues = myMenuList.filter((menu) => menu.vegan !== true);

    if (!isInMyMenu) {
      if (myMenuList.length < 4) {
        if (veganMenues.length < 2 && menu.vegan) {
          setMyMenuList([...myMenuList, menu]);
          MenuModal.fire({
            icon: "success",
            title: `${menu.title} agregado a tu menu!`,
          });
        } else if (notVeganMenues.length < 2 && !menu.vegan) {
          setMyMenuList([...myMenuList, menu]);
          MenuModal.fire({
            icon: "success",
            title: `${menu.title} agregado a tu menu!`,
          });
        } else {
          MenuModal.fire({
            icon: "error",
            title: "Solo puedes tener dos menues veganos y dos que no lo sean!",
          });
        }
      } else {
        MenuModal.fire({
          icon: "error",
          title:
            "Ya tienes 4 platos en tu menu!, elimina alguno para agregar uno nuevo!",
        });
      }
    } else {
      setError({ error: true, errorMsg: "Este plato ya esta en tu menu!" });
      MenuModal.fire({
        icon: "error",
        title: error.errorMsg,
      });
    }
  };

  const deleteMenuHandler = (menu) => {
    setMyMenuList(myMenuList.filter((element) => element.id !== menu.id));

    MenuModal.fire({
      icon: "success",
      title: `${menu.title} eliminado de tu menu!`,
    });
  };

  const detailMenuHandler = (menu) => {
    navigate(`/search/${menu.id}`);
  };

  useEffect(() => {
    localStorage.setItem("myMenu", JSON.stringify(myMenuList));
  }, [myMenuList]);

  return (
    <MenuContext.Provider
      value={{
        addMenuHandler,
        deleteMenuHandler,
        detailMenuHandler,
        myMenuList,
        error,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
