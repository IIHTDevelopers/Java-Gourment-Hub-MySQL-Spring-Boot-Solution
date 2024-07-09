const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../pages/LoginPage.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('LoginPageComponent boundary should contain login heading', () => {
        expect(fileContent).toMatch(/<h1>Login<\/h1>/);
    });

    test('LoginPageComponent boundary should contain LoginForm component', () => {
        expect(fileContent).toMatch(/<LoginForm \/>/);
    });

    test('LoginPageComponent boundary should contain sign up prompt', () => {
        expect(fileContent).toMatch(/Don't have an account\? <button onClick=\{toggleForm\}>Sign Up<\/button>/);
    });

    test('LoginPageComponent boundary should contain sign up heading', () => {
        expect(fileContent).toMatch(/<h1>Sign Up<\/h1>/);
    });

    test('LoginPageComponent boundary should contain SignUpForm component', () => {
        expect(fileContent).toMatch(/<SignUpForm \/>/);
    });

    test('LoginPageComponent boundary should contain login prompt', () => {
        expect(fileContent).toMatch(/Already have an account\? <button onClick=\{toggleForm\}>Login<\/button>/);
    });
});
