import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeService from '../../services/RecipeService';
import AuthService from '../../services/AuthService';
import PaymentForm from '../payment/PaymentForm';
import RecipeDetail from './RecipeDetail';
import RecipeForm from './RecipeForm';
import SearchBar from '../search/SearchBar';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showRecipeForm, setShowRecipeForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await RecipeService.getAllRecipes();
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(lowercasedSearchTerm) ||
            recipe.ingredients.toLowerCase().includes(lowercasedSearchTerm) ||
            recipe.chefName.toLowerCase().includes(lowercasedSearchTerm) ||
            recipe.instructions.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredRecipes(filtered);
    }, [searchTerm, recipes]);

    const handleGetDetails = (recipe) => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            history.push('/login');
            return;
        }

        if (user.role === 'chef' && recipe.chefName === user.username) {
            setSelectedRecipe(recipe);
            setShowPaymentForm(false);
        } else if (user.purchasedRecipes.includes(recipe.id)) {
            setSelectedRecipe(recipe);
            setShowPaymentForm(false);
        } else {
            setSelectedRecipe(recipe);
            setShowPaymentForm(true);
        }
    };

    const handlePaymentSuccess = (recipeId) => {
        const user = AuthService.getCurrentUser();
        user.purchasedRecipes.push(recipeId);
        localStorage.setItem('user', JSON.stringify(user));
        setShowPaymentForm(false);
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
            {user && user.role === 'chef' && (
                <button onClick={() => setShowRecipeForm(true)}>Add a Recipe</button>
            )}
            {showRecipeForm && <RecipeForm onAddRecipe={handleAddRecipe} />}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ul>
                {filteredRecipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.ingredients.substring(0, 5)}...</p>
                        <button onClick={() => handleGetDetails(recipe)}>Get Details</button>
                        {selectedRecipe && selectedRecipe.id === recipe.id && showPaymentForm && (
                            <PaymentForm recipe={recipe} onSuccess={() => handlePaymentSuccess(recipe.id)} />
                        )}
                        {selectedRecipe && selectedRecipe.id === recipe.id && !showPaymentForm && (
                            <RecipeDetail recipe={recipe} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
