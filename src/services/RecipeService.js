import axios from 'axios';

const API_URL = 'http://localhost:4000';

const getAllRecipes = () => {
    return axios.get(`${API_URL}/recipes`);
};

const getRecipeById = (id) => {
    return axios.get(`${API_URL}/recipes/${id}`);
};

const addRecipe = (recipe) => {
    return axios.post(`${API_URL}/recipes`, recipe);
};

const addFavorite = (userId, recipeId) => {
    return axios.post(`${API_URL}/favorites`, {
        userId: userId,
        recipeIds: [recipeId]
    });
};

const updateFavorite = (favoriteId, updatedFavorite) => {
    return axios.put(`${API_URL}/favorites/${favoriteId}`, updatedFavorite);
};

const getFavoritesByUserId = (userId) => {
    return axios.get(`${API_URL}/favorites?userId=${userId}`);
};

// New method to add purchased recipe to the user
const addPurchasedRecipe = async (userId, recipeId) => {
    try {
        // Fetch the user's current data
        const userResponse = await axios.get(`${API_URL}/users/${userId}`);
        const user = userResponse.data;

        // Update the user's purchased recipes
        const updatedPurchasedRecipes = [...user.purchasedRecipes, recipeId];
        user.purchasedRecipes = updatedPurchasedRecipes;

        // Update the user data on the server
        await axios.put(`${API_URL}/users/${userId}`, user);
    } catch (error) {
        console.error('Error updating purchased recipes:', error);
        throw error;
    }
};

// New method to add a payment record
const addPayment = (userId, recipeId, amount) => {
    const paymentData = {
        userId: userId,
        recipeId: recipeId,
        amount: amount,
        date: new Date().toISOString()
    };
    return axios.post(`${API_URL}/payments`, paymentData);
};

const RecipeService = {
    getAllRecipes,
    getRecipeById,
    addRecipe,
    addFavorite,
    updateFavorite,
    getFavoritesByUserId,
    addPurchasedRecipe,
    addPayment
};

export default RecipeService;
