const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/recipes/RecipeDetail.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('RecipeDetailComponent boundary should display recipe title', () => {
        expect(fileContent).toMatch(/<h2>\{recipe\.title\}<\/h2>/);
    });

    test('RecipeDetailComponent boundary should display recipe ingredients', () => {
        expect(fileContent).toMatch(/<p><strong>Ingredients:<\/strong> \{recipe\.ingredients\}<\/p>/);
    });

    test('RecipeDetailComponent boundary should display recipe instructions', () => {
        expect(fileContent).toMatch(/<p><strong>Instructions:<\/strong> \{recipe\.instructions\}<\/p>/);
    });

    test('RecipeDetailComponent boundary should display recipe chef name', () => {
        expect(fileContent).toMatch(/<p><strong>Chef:<\/strong> \{recipe\.chefName\}<\/p>/);
    });
});
