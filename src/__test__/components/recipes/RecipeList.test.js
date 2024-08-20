const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/recipes/RecipeList.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('RecipeListComponent boundary should fetch all recipes', () => {
        expect(fileContent).toMatch(/RecipeService\.getAllRecipes\(\)/);
    });

    test('RecipeListComponent boundary should contain handleGetDetails function', () => {
        expect(fileContent).toMatch(/const handleGetDetails = \(recipe\) =>/);
    });

    test('RecipeListComponent boundary should contain handlePaymentSuccess function', () => {
        expect(fileContent).toMatch(/const handlePaymentSuccess = \(recipeId\) =>/);
    });

    test('RecipeListComponent boundary should contain handleAddRecipe function', () => {
        expect(fileContent).toMatch(/const handleAddRecipe = \(newRecipe\) =>/);
    });

    test('RecipeListComponent boundary should display RecipeDetail or PaymentForm based on payment status', () => {
        expect(fileContent).toMatch(/selectedRecipe && selectedRecipe.id === recipe.id && showPaymentForm/);
        expect(fileContent).toMatch(/<PaymentForm recipe=\{recipe\} onSuccess=\{.*handlePaymentSuccess.*\} \/>/);
        expect(fileContent).toMatch(/<RecipeDetail recipe=\{recipe\} \/>/);
    });

    test('RecipeListComponent boundary should render search bar', () => {
        expect(fileContent).toMatch(/<SearchBar searchTerm=\{searchTerm\} setSearchTerm=\{setSearchTerm\} \/>/);
    });

    test('RecipeListComponent boundary should render add recipe button for chefs', () => {
        expect(fileContent).toMatch(/user && user.role === 'chef' &&/);
        expect(fileContent).toMatch(/<button onClick=\{\(\) => setShowRecipeForm\(true\)\}>Add a Recipe<\/button>/);
    });
});
