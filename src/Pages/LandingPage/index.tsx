import React, { useEffect, useState } from "react";
import { searchRecipes } from "../../utils/api";

const LandingPage: React.FC = () => {
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

  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [hits, setHits] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isTyping, setIsTyping] = useState<Boolean>(false);

  const handleGetStarted = () => {
    setShowLandingPage(false);
    setShowSearchBar(true);
  };

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  const handleAddToFavorites = (recipe: Recipe) => {
    // Check if the recipe is already in favorites
    if (!favorites.some((favRecipe) => favRecipe.uri === recipe.uri)) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      // Store updated favorites in local storage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (query.length > 0 && isTyping === false) {
      setLoading(true);
      handleSearch(query).then(() => {
        setLoading(false);
      });
    } else setHits([]);
  }, [isTyping, query]);

  const handleSearch = async (query: string) => {
    try {
      const response = await searchRecipes(query);
      setHits(response.hits.map((hit: any) => hit.recipe));
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div
        className={`text-white text-center landing-page ${
          showLandingPage ? "" : "hidden"
        }`}
      >
        <h1 className="text-4xl font-extrabold mb-4">
          Recipe Finder Application
        </h1>
        <p className="text-lg mb-8">
          Find, save, and cook delicious recipes with ease!
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-full hover-bg-green-600"
        >
          Get Started
        </button>
      </div>

      <div
        className={`search-bar ${
          showSearchBar
            ? "visible w-full flex flex-col items-center py-10 justify-center"
            : "w-0"
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isTyping) {
              setIsTyping(true);
            }

            const lastTypingTime = new Date().getTime();
            const timerLength = 500;
            setTimeout(() => {
              const timeNow = new Date().getTime();
              const timeDiff = timeNow - lastTypingTime;
              if (timeDiff >= timerLength && isTyping) {
                setIsTyping(false);
              }
              return setIsTyping(false);
            }, timerLength);
          }}
          placeholder="Search for recipes..."
          className="border border-gray-300 rounded-full px-4 py-2 w-[95%] md-w-2/3 lg-w-1/2 text-lg focus-outline-none focus-border-green-500 focus-ring-2 focus-ring-green-500"
        />
        <div className="flex flex-wrap justify-center mt-10">
          {loading || isTyping ? (
            "Loading recipes..."
          ) : hits.length > 0 ? (
            hits.map((recipe) => (
              <div
                className="recipe-card m-4 p-4 rounded-lg bg-white shadow-lg"
                key={recipe.uri}
              >
                <img
                  src={recipe.images.SMALL.url}
                  alt={recipe.label}
                  className="object-cover w-64 h-48 rounded-t-lg"
                />
                <div className="p-4 w-64 text-center">
                  <h3 className="text-lg text-clip font-semibold">
                    {recipe.label}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => handleCardClick(recipe)}>
                    View Details
                  </button>
                  <button onClick={() => handleAddToFavorites(recipe)}>
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">No recipes found.</p>
          )}
        </div>
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="flex items-center justify-center h-[90vh] overflow-y-scroll">
            <div className="modal-overlay absolute inset-0 bg-gray-600 opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md-max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                <button onClick={handleCloseModal}>Close</button>
              </div>
              <div className="modal-content py-4 text-left px-6 pt-10">
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
      {!showLandingPage && (
        <>
          <div className="fixed bottom-20 right-7 z-[51] bg-white px-2 rounded-full">
            {" "}
            {favorites.length}
          </div>
          <a
            href="/favorites"
            className="fixed bottom-8 right-8 cursor-pointer p-4 rounded-full bg-black hover:bg-gray-800 shadow-lg duration-200"
          >
            <img src="/heart.svg" className="h-10 w-10" />
          </a>
        </>
      )}
    </div>
  );
};

export default LandingPage;
