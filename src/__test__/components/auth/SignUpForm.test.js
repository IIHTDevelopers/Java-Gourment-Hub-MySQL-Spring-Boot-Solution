const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/auth/SignUpForm.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('SignUpFormComponent boundary should contain username input field', () => {
        expect(fileContent).toMatch(/<input[^>]+name="username"/);
    });

    test('SignUpFormComponent boundary should contain email input field', () => {
        expect(fileContent).toMatch(/<input[^>]+name="email"/);
    });

    test('SignUpFormComponent boundary should contain password input field', () => {
        expect(fileContent).toMatch(/<input[^>]+name="password"/);
    });

    test('SignUpFormComponent boundary should contain form submission handler', () => {
        expect(fileContent).toMatch(/handleSubmit/);
    });

    test('SignUpFormComponent boundary should contain form change handler', () => {
        expect(fileContent).toMatch(/handleChange/);
    });

    test('SignUpFormComponent boundary should contain error message display logic', () => {
        expect(fileContent).toMatch(/{error && <p>{error}<\/p>}/);
    });

    test('SignUpFormComponent boundary should contain signup button', () => {
        expect(fileContent).toMatch(/<button[^>]*>Sign Up<\/button>/);
    });
});
