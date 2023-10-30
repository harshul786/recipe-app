import React from "react";

const FavoritesPage: React.FC = () => {
  type Recipe = {
    uri: string;
    label: string;
    image: string;
    images: {
      THUMBNAIL: {
        url: string;
        width: number;
        height: number;
      };
      SMALL: {
        url: string;
        width: number;
        height: number;
      };
      REGULAR: {
        url: string;
        width: number;
        height: number;
      };
    };
    source: string;
    ingredients: {
      text: string;
      quantity: number;
      measure: string;
      image: string;
    }[];
    instructions: string[];
  };
  const storedFavorites = localStorage.getItem("favorites");

  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-extrabold mb-4">Favorite Recipes</h1>
        <div className="flex flex-wrap justify-center mt-10">
          {favorites.length > 0 ? (
            favorites.map((recipe: Recipe) => (
              <div
                className="recipe-card m-4 p-4 rounded-lg bg-white shadow-lg"
                key={recipe.uri}
              >
                <img
                  src={recipe.image}
                  alt={recipe.label}
                  className="object-cover w-64 h-48 rounded-t-lg"
                />
                <div className="p-4 w-64 text-center text-black">
                  <h3 className="text-lg text-clip font-semibold">
                    {recipe.label}
                  </h3>
                </div>
                {/* Add a button to remove from favorites */}
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">No favorite recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
