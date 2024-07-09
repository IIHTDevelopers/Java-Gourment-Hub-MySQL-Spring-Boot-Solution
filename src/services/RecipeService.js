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

const RecipeService = {
    getAllRecipes,
    getRecipeById,
    addRecipe,
};

export default RecipeService;
