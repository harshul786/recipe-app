import React, { useState } from "react";
import { searchRecipes } from "../../utils/api";

const RecipeSearch: React.FC = () => {
  type Recipe = {
    id: number;
    title: string;
    image: string;
    imageType: string;
  };

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearch = async () => {
    try {
      const response = await searchRecipes(query);
      setRecipes(response.results);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSearch;
