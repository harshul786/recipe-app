import React, { useEffect, useState } from "react";

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

  const [storedFavorites, setFavorites] = React.useState<String>(
    JSON.parse(localStorage.getItem("favorites") || "")
  );
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(
    null
  );

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const [favorites, setCurrFavorites] = useState<Recipe[]>([]);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setCurrFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleRemoveFavorites = (recipe: Recipe) => {
    const updatedFavorites = favorites.filter(
      (favRecipe: any) => favRecipe.uri !== recipe.uri
    );
    setFavorites(JSON.stringify(updatedFavorites));
    setCurrFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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
                <div className="flex justify-between tracking-wider text-black">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="hover:font-medium duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleRemoveFavorites(recipe)}
                    className="hover:font-medium duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">No favorite recipes found.</p>
          )}
        </div>
      </div>
      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="flex items-center justify-center h-[90vh] overflow-y-scroll">
            <div className="modal-overlay absolute inset-0 bg-gray-600 opacity-50"></div>
            <div className="modal-container h-[90vh] bg-white w-11/12 md-max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                <button onClick={handleCloseModal}>Close</button>
              </div>
              <div className="modal-content h-[90vh] py-4 text-left px-6 pt-10">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.label}
                  className="object-cover w-64 h-48 rounded-lg mx-auto"
                />
                <h3 className="text-xl text-clip font-semibold text-center mt-4">
                  {selectedRecipe.label}
                </h3>
                <p>Source: {selectedRecipe.source}</p>
                <h4 className="text-lg font-semibold">Ingredients:</h4>
                <ul>
                  {selectedRecipe.ingredients?.map((ingredient: any, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <div>
                        {" "}
                        {`${ingredient.text} - ${ingredient.quantity} ${
                          ingredient.measure
                            ? ingredient.measure === "<unit>"
                              ? "unit"
                              : ingredient.measure
                            : ""
                        }`}
                      </div>
                      <img
                        src={ingredient.image}
                        alt=""
                        className="h-10 w-10 "
                      />
                    </li>
                  ))}
                </ul>
                <h4 className="text-lg font-semibold">Cooking Instructions:</h4>
                <ol>
                  {selectedRecipe.instructions?.map(
                    (instruction: string, index) => (
                      <li key={index}>{instruction}</li>
                    )
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
