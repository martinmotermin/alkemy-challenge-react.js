import axios from "axios";

import {
  REACT_APP_API_KEY,
  REACT_APP_SPOONACULAR_API_URL,
} from "./getMenusByName";

export const getMenuById = async (id) => {
  const res = await axios.get(
    `${REACT_APP_SPOONACULAR_API_URL}${id}/information?apiKey=${REACT_APP_API_KEY}&includeNutrition=false`
  );

  const menu = res.data;
  return menu;
};
