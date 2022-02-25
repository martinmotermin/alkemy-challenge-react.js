import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/LoginScreen/LoginScreen";
import { MenuContextProvider } from "../components/menuContext/MenuContextProvider";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/** Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        {/** Private Routes */}
        <Route
          path="/*"
          element={
            <MenuContextProvider>
              <PrivateRoute>
                <DashboardRoutes />
              </PrivateRoute>
            </MenuContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
