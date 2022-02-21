import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";
import {
  MdMenu,
  MdOutlineClose,
  MdRestaurantMenu,
  MdSearch,
} from "react-icons/md";

import "./Navbar.css";
import { MenuContext } from "../../menuContext/MenuContextProvider";

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { myMenuList } = useContext(MenuContext);
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <nav>
        <MdMenu onClick={showSidebar} />
      </nav>
      <aside className={sidebar ? "nav-menu active" : "nav-menu"}>
        <div className="top">
          <MdOutlineClose onClick={showSidebar} />
        </div>

        <div className="sidebar">
          <div className="sidebar__links">
            <NavLink
              className={({ isActive }) =>
                "nav-item nav-link" + (isActive ? " active" : "")
              }
              to="/"
              onClick={showSidebar}
            >
              <MdRestaurantMenu />
              Mi Menu <span className="menu-count">{myMenuList.length}</span>
            </NavLink>
            <NavLink
              className="nav-item nav-link"
              to="/search"
              onClick={showSidebar}
            >
              <MdSearch /> Buscar
            </NavLink>
          </div>
          <div className="sidebar-lastSection">
            <span className="nav-item nav-link text-info">{user.email}</span>
            <button
              className="nav-item nav-link btn logoutBtn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
