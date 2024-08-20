import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RecipeService from "../../services/RecipeService";
import AuthService from "../../services/AuthService";
import PaymentForm from "../payment/PaymentForm";
import RecipeDetail from "./RecipeDetail";
import RecipeForm from "./RecipeForm";
import SearchBar from "../search/SearchBar";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeService.getAllRecipes();
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercasedSearchTerm) ||
        recipe.ingredients.toLowerCase().includes(lowercasedSearchTerm) ||
        recipe.chefName.toLowerCase().includes(lowercasedSearchTerm) ||
        recipe.instructions.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  const handleGetDetails = (recipe) => {
    const user = AuthService.getCurrentUser();
    const currentUser = AuthService.getCurrentUser();

    if (!user) {
      history.push("/login");
      return;
    }

    if (!recipe.isPaid) {
      // If the recipe is free, show details directly
      setSelectedRecipe(recipe);
      setShowPaymentForm(false);
    } else {
      // If the recipe is paid, check if the user is the chef or if they have purchased the recipe
      if (
        currentUser.role === "chef" &&
        recipe.chefName === currentUser.username
      ) {
        setSelectedRecipe(recipe);
        setShowPaymentForm(false);
      } else if (
        currentUser.purchasedRecipes &&
        currentUser.purchasedRecipes.includes(recipe.id)
      ) {
        setSelectedRecipe(recipe);
        setShowPaymentForm(false);
      } else {
        // If the user hasn't purchased the recipe, show the payment form
        setSelectedRecipe(recipe);
        setShowPaymentForm(true);
      }
    }
  };

  // const handlePaymentSuccess = (recipeId) => {
  //     const user = AuthService.getCurrentUser();
  //     user.purchasedRecipes.push(recipeId);
  //     localStorage.setItem('user', JSON.stringify(user));
  //     setShowPaymentForm(false);
  //     setSelectedRecipe(recipes.find((recipe) => recipe.id === recipeId));
  // };
  const handlePaymentSuccess = async (recipeId) => {
    const user = AuthService.getCurrentUser();

    try {
      // Assume we have a way to determine the amount for the recipe
      const recipe = await RecipeService.getRecipeById(recipeId);
      const amount = recipe.data.price || 0; // Set the price according to your logic

      // Update user's purchased recipes
      await RecipeService.addPurchasedRecipe(user.id, recipeId);

      // Record the payment
      await RecipeService.addPayment(user.id, recipeId, amount);

      // Update local storage
      user.purchasedRecipes.push(recipeId);
      localStorage.setItem("user", JSON.stringify(user));

      // Hide the payment form and show the recipe details
      setShowPaymentForm(false);
      setSelectedRecipe(recipe.data);
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  };

  const handleAddRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
    setFilteredRecipes([...recipes, newRecipe]);
    setShowRecipeForm(false);
  };

  const user = AuthService.getCurrentUser();

  return (
    <div>
      <h1>Recipe List</h1>
      {user && user.role === "chef" && (
        <button onClick={() => setShowRecipeForm(true)}>Add a Recipe</button>
      )}
      {showRecipeForm && <RecipeForm onAddRecipe={handleAddRecipe} />}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients.substring(0, 5)}...</p>
            <button onClick={() => handleGetDetails(recipe)}>
              Get Details
            </button>
            {selectedRecipe &&
              selectedRecipe.id === recipe.id &&
              showPaymentForm && (
                <PaymentForm
                  recipe={recipe}
                  onSuccess={() => handlePaymentSuccess(recipe.id)}
                />
              )}
            {selectedRecipe &&
              selectedRecipe.id === recipe.id &&
              !showPaymentForm && (
                <RecipeDetail recipe={recipe} userId={user.id} />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
