const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/recipes/RecipeForm.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('RecipeFormComponent boundary should contain Add a New Recipe as heading', () => {
        expect(fileContent).toMatch(/Add a New Recipe/);
    });

    test('RecipeFormComponent boundary should contain title input field', () => {
        expect(fileContent).toMatch(/title/);
    });

    test('RecipeFormComponent boundary should contain ingredients input field', () => {
        expect(fileContent).toMatch(/ingredients/);
    });

    test('RecipeFormComponent boundary should contain instructions input field', () => {
        expect(fileContent).toMatch(/instructions/);
    });

    test('RecipeFormComponent boundary should contain paid recipe checkbox', () => {
        expect(fileContent).toMatch(/isPaid/);
    });

    test('RecipeFormComponent boundary should contain form submission handler', () => {
        expect(fileContent).toMatch(/handleSubmit/);
    });

    test('RecipeFormComponent boundary should contain add recipe button', () => {
        expect(fileContent).toMatch(/<button[^>]*>Add Recipe<\/button>/);
    });
});
