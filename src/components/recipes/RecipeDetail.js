import React, { useEffect, useState } from 'react';
import RecipeService from '../../services/RecipeService';

const RecipeDetail = ({ recipe, userId, showAddToFavorite = true }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        // Fetch the user's favorites
        RecipeService.getFavoritesByUserId(userId).then(response => {
            const favorites = response.data;
            if (favorites.length > 0) {
                const userFavorite = favorites[0]; // Assuming only one favorite entry per user
                setFavoriteId(userFavorite.id);
                setIsFavorite(userFavorite.recipeIds.includes(recipe.id));
            }
        });
    }, [userId, recipe.id]);

    const handleAddToFavorite = () => {
        if (favoriteId) {
            // Update existing favorites list
            RecipeService.getFavoritesByUserId(userId).then(response => {
                const favoriteData = response.data[0]; // Assuming one favorite entry per user
                if (!favoriteData.recipeIds.includes(recipe.id)) {
                    const updatedFavorite = {
                        ...favoriteData,
                        recipeIds: [...favoriteData.recipeIds, recipe.id]
                    };
                    RecipeService.updateFavorite(favoriteId, updatedFavorite).then(() => {
                        setIsFavorite(true);
                    });
                }
            });
        } else {
            // Add a new favorite entry
            RecipeService.addFavorite(userId, recipe.id).then(() => {
                setIsFavorite(true);
            });
        }
    };

    return (
        <div>
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Chef:</strong> {recipe.chefName}</p>
            {showAddToFavorite && !isFavorite && (
                <button onClick={handleAddToFavorite}>Add to Favorite</button>
            )}
        </div>
    );
};

export default RecipeDetail;
