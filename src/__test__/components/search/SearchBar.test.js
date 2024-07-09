const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/search/SearchBar.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('SearchBarComponent boundary should contain input field for search term', () => {
        expect(fileContent).toMatch(/Search recipes.../);
    });

    test('SearchBarComponent boundary should contain placeholder text for search input', () => {
        expect(fileContent).toMatch(/placeholder="Search recipes..."/);
    });

    test('SearchBarComponent boundary should contain change handler for search input', () => {
        expect(fileContent).toMatch(/onChange=\{handleSearchChange\}/);
    });

    test('SearchBarComponent boundary should contain handleSearchChange function', () => {
        expect(fileContent).toMatch(/const handleSearchChange = \(e\) =>/);
    });
});
