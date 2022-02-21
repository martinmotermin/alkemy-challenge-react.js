import React, { useReducer, useEffect } from "react";
import { authReducer } from "./components/auth/authReducer";
import { AppRouter } from "./routers/AppRouter";
import { AuthContext } from "./components/auth/authContext";

import "./App.css";

const init = () => {
  return JSON.parse(sessionStorage.getItem("user")) || { logged: false };
};

const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;

    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
