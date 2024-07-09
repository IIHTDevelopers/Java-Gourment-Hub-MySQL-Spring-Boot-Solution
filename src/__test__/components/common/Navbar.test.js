const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/common/Navbar.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('NavbarComponent boundary should contain "Home" link', () => {
        expect(fileContent).toMatch(/Home/);
    });

    test('NavbarComponent boundary should contain "Recipe List" link', () => {
        expect(fileContent).toMatch(/Recipe List/);
    });

    test('NavbarComponent boundary should contain "Favorite Recipes" link for user role', () => {
        expect(fileContent).toMatch(/Favorite Recipes/);
    });

    test('NavbarComponent boundary should contain "Logout" button when user is logged in', () => {
        expect(fileContent).toMatch(/Logout/);
    });

    test('NavbarComponent boundary should contain "Login" link when user is not logged in', () => {
        expect(fileContent).toMatch(/login/);
    });

    test('NavbarComponent boundary should contain logout handler', () => {
        expect(fileContent).toMatch(/handleLogout/);
    });
});
