import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMenusByName } from "../helpers/getMenusByName";
import { MenuCard } from "../MenuCard/MenuCard";
import { MdSearch } from "react-icons/md";

import "./SearchScreen.css";
import { Form, Formik, Field } from "formik";
import { MenuModal } from "../Modals/menuModal";

const INITIAL_PAGE = 0;
const lastSearch = JSON.parse(sessionStorage.getItem("lastSearch")) || [];

export const SearchScreen = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(lastSearch);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(INITIAL_PAGE);

  const handleSubmit = (search) => {
    getMenusByName(search)
      .then((res) => {
        if (res.length < 1) {
          MenuModal.fire({
            icon: "error",
            title: `No se encontraron resultados para tu busqueda con: ${search}`,
          });
          navigate(`/search`);
        }
        sessionStorage.setItem("lastSearch", JSON.stringify(res));
        setResults(res);
        //Definimos la busqueda en los params
        navigate(`?q=${search}`);
      })
      .catch((err) => {
        MenuModal.fire({
          icon: "error",
          title: `No se pudo realizar la busqueda: ${err.message}`,
        });
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values) {
      errors.searchValue = "No puedes realizar una busqueda vacia";
      MenuModal.fire({
        icon: "error",
        title: errors.searchValue,
      });
    } else if (values.length < 3) {
      errors.searchValue = "Debes ingresar mas de 2 caracteres";
      MenuModal.fire({
        icon: "error",
        title: errors.searchValue,
      });
    }

    return errors;
  };

  const moreResultsHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page === INITIAL_PAGE) return;

    getMenusByName(searchKeyword, 20, page).then((nextResults) => {
      setResults((prevResults) => prevResults.concat(nextResults));
    });
  }, [page]);

  return (
    <div className="container">
      <Formik
        initialValues={{ searchValue: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={({ searchValue }) => validate(searchValue)}
        onSubmit={({ searchValue }) => {
          handleSubmit(searchValue);
          setSearchKeyword(searchValue);
        }}
      >
        {(props) => (
          <Form className="searchForm" onSubmit={props.handleSubmit}>
            <div className="input_search-container">
              <MdSearch className="search__icon" />
              <Field
                name="searchValue"
                autoComplete="off"
                className="form-control"
                placeholder="Buscar un menu"
                type="text"
                value={props.values.searchValue}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </div>
            <button type="submit" className="btn searchButton">
              Buscar
            </button>
          </Form>
        )}
      </Formik>

      <div className="search__results">
        {results.length > 0 ? (
          <>
            <h2>Resultados de tu ultima busqueda:</h2>
            {results.map((menu) => (
              <MenuCard menu={menu} key={menu.id} />
            ))}
            <button className="btn searchButton" onClick={moreResultsHandler}>
              Mostrar mas
            </button>
          </>
        ) : (
          <h2>Realiza una busqueda!</h2>
        )}
      </div>

      {/* <div className="search__results">
        <h2>Resultados de tu ultima busqueda:</h2>
        {results.length > 0
          ? results.map((menu) => <MenuCard menu={menu} key={menu.id} /> )
          : null}

        <button className="btn moreResults__btn" onClick={moreResultsHandler}>
          Mostrar mas
        </button>
      </div> */}
    </div>
  );
};
