const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../pages/RecipePage.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('RecipePageComponent boundary should contain useParams for recipe id', () => {
        expect(fileContent).toMatch(/const \{ id \} = useParams\(\);/);
    });

    test('RecipePageComponent boundary should contain recipe state', () => {
        expect(fileContent).toMatch(/const \[recipe, setRecipe\] = useState\(null\);/);
    });

    test('RecipePageComponent boundary should contain showPaymentForm state', () => {
        expect(fileContent).toMatch(/const \[showPaymentForm, setShowPaymentForm\] = useState\(false\);/);
    });

    test('RecipePageComponent boundary should contain useEffect to fetch recipe', () => {
        expect(fileContent).toMatch(/useEffect\(\(\) => {/);
        expect(fileContent).toMatch(/const fetchRecipe = async \(\) => {/);
    });

    test('RecipePageComponent boundary should check user authentication in useEffect', () => {
        expect(fileContent).toMatch(/const user = AuthService.getCurrentUser\(\);/);
        expect(fileContent).toMatch(/if \(!user\) {/);
        expect(fileContent).toMatch(/history.push\('\/login'\);/);
    });

    test('RecipePageComponent boundary should fetch recipe by id', () => {
        expect(fileContent).toMatch(/const response = await RecipeService.getRecipeById\(id\);/);
        expect(fileContent).toMatch(/setRecipe\(response.data\);/);
    });

    test('RecipePageComponent boundary should show payment form if recipe is not purchased', () => {
        expect(fileContent).toMatch(/if \(!user.purchasedRecipes.includes\(parseInt\(id\)\)\) {/);
        expect(fileContent).toMatch(/setShowPaymentForm\(true\);/);
    });

    test('RecipePageComponent boundary should contain handlePaymentSuccess function', () => {
        expect(fileContent).toMatch(/const handlePaymentSuccess = \(recipeId\) => {/);
    });

    test('RecipePageComponent boundary should update user\'s purchased recipes on payment success', () => {
        expect(fileContent).toMatch(/user.purchasedRecipes.push\(recipeId\);/);
        expect(fileContent).toMatch(/localStorage.setItem\('user', JSON.stringify\(user\)\);/);
        expect(fileContent).toMatch(/setShowPaymentForm\(false\);/);
    });
});
