import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";
import { MdOutlineAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { LoginModal } from "../Modals/loginModal";
import Swal from "sweetalert2";

import "./LoginScreen.css";

export const LoginScreen = () => {
  const { dispatch } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const changeFormHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Ingresando...",
      html: "Por favor, aguarde",
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post("http://challenge-react.alkemy.org/", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((res) => {
        if (res.statusText === "OK") {
          LoginModal.fire({
            icon: "success",
            title: "Ingreso exitoso, bienvenido!",
          });
          const { token } = res.data;

          //Execute login function and save data
          dispatch({
            type: types.login,
            payload: { token: token, email: loginData.email },
          });

          //User send to home
          navigate("/", {
            replace: true,
          });
        } else {
        }
      })
      .catch((error) => {
        //Seting error from the api

        LoginModal.fire({
          icon: "error",
          title: "Datos incorrectos",
        });
      });
  };
  return (
    <>
      <div className="container form__container">
        <form onSubmit={handleLogin} onChange={changeFormHandler}>
          <div className="input_loggin-container">
            <MdOutlineAlternateEmail className="at_icon" />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="input_loggin-container">
            <MdOutlinePassword className="at_icon" />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="loginBtn btn">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};
