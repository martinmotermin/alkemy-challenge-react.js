import axios from "axios";

export const { REACT_APP_API_KEY, REACT_APP_SPOONACULAR_API_URL } = process.env;

export const getMenusByName = async (name = "", limit = 20, page = 0) => {
  if (name == "") {
    return [];
  }
  name = name.toLowerCase();

  const res = await axios.get(
    `${REACT_APP_SPOONACULAR_API_URL}complexSearch?query=${name}&apiKey=${REACT_APP_API_KEY}&number=${limit}&addRecipeInformation=true&offset=${
      page * limit
    }`
  );

  const results = res.data.results;

  return results;
};
