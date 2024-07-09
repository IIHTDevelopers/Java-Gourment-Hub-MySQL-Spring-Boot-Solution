import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeDetail from '../components/recipes/RecipeDetail';
import PaymentForm from '../components/payment/PaymentForm';
import RecipeService from '../services/RecipeService';
import AuthService from '../services/AuthService';

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const user = AuthService.getCurrentUser();
                if (!user) {
                    history.push('/login');
                    return;
                }

                const response = await RecipeService.getRecipeById(id);
                setRecipe(response.data);

                if (!user.purchasedRecipes.includes(parseInt(id))) {
                    setShowPaymentForm(true);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id, history]);

    const handlePaymentSuccess = (recipeId) => {
        const user = AuthService.getCurrentUser();
        user.purchasedRecipes.push(recipeId);
        localStorage.setItem('user', JSON.stringify(user));
        setShowPaymentForm(false);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Recipe Details for Recipe ID: {id}</h1>
            {showPaymentForm ? (
                <PaymentForm recipe={recipe} onSuccess={() => handlePaymentSuccess(parseInt(id))} />
            ) : (
                <RecipeDetail recipe={recipe} />
            )}
        </div>
    );
};

export default RecipePage;
