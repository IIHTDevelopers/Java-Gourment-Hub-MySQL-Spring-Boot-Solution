import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import PaymentForm from "../payment/PaymentForm";
import RecipeDetail from "../recipes/RecipeDetail";

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [paidRecipeIds, setPaidRecipeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      const user = AuthService.getCurrentUser();

      if (!user) {
        history.push("/login");
        return;
      }

      try {
        // Fetch favorite recipes for the user
        const favoritesResponse = await axios.get(
          `http://localhost:4000/favorites?userId=${user.id}`
        );
        const favoriteRecipeIds = favoritesResponse.data[0]?.recipeIds || [];

        // Fetch payments made by the user
        const paymentsResponse = await axios.get(
          `http://localhost:4000/payments?userId=${user.id}`
        );
        const paidRecipeIds = paymentsResponse.data.map(
          (payment) => payment.recipeId
        );

        setPaidRecipeIds(paidRecipeIds);

        // Fetch all favorite recipes
        const recipesResponse = await axios.get(
          "http://localhost:4000/recipes"
        );
        const favoriteRecipes = recipesResponse.data.filter((recipe) =>
          favoriteRecipeIds.includes(recipe.id)
        );
        setFavoriteRecipes(favoriteRecipes);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, [history]);

  const handlePaymentSuccess = async (recipeId) => {
    const user = AuthService.getCurrentUser();
    try {
      await axios.post("http://localhost:4000/payments", {
        userId: user.id,
        recipeId,
        amount: 5.0,
        date: new Date().toISOString(),
      });

      setPaidRecipeIds([...paidRecipeIds, recipeId]);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <ul>
        {favoriteRecipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            {!recipe.isPaid || paidRecipeIds.includes(recipe.id) ? (
              <RecipeDetail recipe={recipe} showAddToFavorite={false} />
            ) : (
              <PaymentForm
                recipe={recipe}
                onSuccess={() => handlePaymentSuccess(recipe.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteRecipes;
