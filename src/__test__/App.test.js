const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../src/App.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('AppComponent boundary should contain "Home" route for /', () => {
        expect(fileContent).toMatch(/Home/);
    });

    test('AppComponent boundary should contain "RecipeList" route for /recipes', () => {
        expect(fileContent).toMatch(/RecipeList/);
    });

    test('AppComponent boundary should contain "RecipePage" route for /recipes/:id', () => {
        expect(fileContent).toMatch(/RecipePage/);
    });

    test('AppComponent boundary should contain "LoginPage" route for /login', () => {
        expect(fileContent).toMatch(/LoginPage/);
    });

    test('AppComponent boundary should contain "FavoriteRecipes" route for /favorites', () => {
        expect(fileContent).toMatch(/FavoriteRecipes/);
    });
});
