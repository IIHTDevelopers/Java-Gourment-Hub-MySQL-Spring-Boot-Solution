const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/auth/LoginForm.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('LoginFormComponent boundary should contain email input field', () => {
        expect(fileContent).toMatch(/<input[^>]+name="email"/);
    });

    test('LoginFormComponent boundary should contain password input field', () => {
        expect(fileContent).toMatch(/<input[^>]+name="password"/);
    });

    test('LoginFormComponent boundary should contain form submission handler', () => {
        expect(fileContent).toMatch(/handleSubmit/);
    });

    test('LoginFormComponent boundary should contain form change handler', () => {
        expect(fileContent).toMatch(/handleChange/);
    });

    test('LoginFormComponent boundary should contain login button', () => {
        expect(fileContent).toMatch(/<button[^>]*>Login<\/button>/);
    });
});
