const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../pages/Home.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('HomeComponent boundary should contain welcome message', () => {
        expect(fileContent).toMatch(/<h1>Welcome to Gourmet Hub<\/h1>/);
    });

    test('HomeComponent boundary should contain description message', () => {
        expect(fileContent).toMatch(/<p>Your favorite place for delicious recipes!<\/p>/);
    });
});
