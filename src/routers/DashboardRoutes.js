import React from "react";
import { Route, Routes } from "react-router-dom";
import { MenuCardInfo } from "../components/MenuCard/MenuCardInfo";
import { MenuContextProvider } from "../components/menuContext/MenuContextProvider";
import { MyMenuScreen } from "../components/MyMenuScreen/MyMenuScreen";
import { SearchScreen } from "../components/SearchScreen/SearchScreen";
import { Navbar } from "../components/UI/NavBar/Navbar";

export const DashboardRoutes = () => {
  return (
    <>
      <MenuContextProvider>
        <Navbar />
        <div className="main__content">
          <Routes>
            <Route path="" element={<MyMenuScreen />} />
            <Route path="search" element={<SearchScreen />} />
            <Route path="search/:menuId" element={<MenuCardInfo />} />
          </Routes>
        </div>
      </MenuContextProvider>
    </>
  );
};
