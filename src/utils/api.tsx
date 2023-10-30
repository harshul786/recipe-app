import axios from "axios";

const APP_ID = "31bd2b19";
const APP_KEY = "7bccb28ed7866f0d9a869d5d677b3b17";

export const searchRecipes = async (query: String) => {
  try {
    const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
      params: {
        app_id: APP_ID,
        app_key: APP_KEY,
        type: "public",
        q: query,
        beta: true,
        random: true,
        imageSize: "SMALL",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
