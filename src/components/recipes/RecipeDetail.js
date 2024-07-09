import React from 'react';

const RecipeDetail = ({ recipe }) => {
    return (
        <div>
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Chef:</strong> {recipe.chefName}</p>
        </div>
    );
};

export default RecipeDetail;
