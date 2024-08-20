import React, { useState } from 'react';
import RecipeService from '../../services/RecipeService';
import AuthService from '../../services/AuthService';

const RecipeForm = ({ onAddRecipe }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isPaid, setIsPaid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        const newRecipe = {
            title,
            ingredients,
            instructions,
            isPaid,
            chefName: user.username
        };

        try {
            const response = await RecipeService.addRecipe(newRecipe);
            onAddRecipe(response.data);
            setTitle('');
            setIngredients('');
            setInstructions('');
            setIsPaid(false);
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div>
            <h2>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <input
                        type="text"
                        id="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="instructions">Instructions:</label>
                    <input
                        type="text"
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="isPaid">Paid Recipe:</label>
                    <input
                        type="checkbox"
                        id="isPaid"
                        checked={isPaid}
                        onChange={(e) => setIsPaid(e.target.checked)}
                    />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default RecipeForm;
