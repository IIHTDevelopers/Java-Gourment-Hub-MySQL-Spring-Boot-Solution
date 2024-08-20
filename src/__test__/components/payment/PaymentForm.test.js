const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/payment/PaymentForm.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('PaymentFormComponent boundary should contain card number input field', () => {
        expect(fileContent).toMatch(/cardNumber/);
    });

    test('PaymentFormComponent boundary should contain expiry date input field', () => {
        expect(fileContent).toMatch(/expiryDate/);
    });

    test('PaymentFormComponent boundary should contain CVV input field', () => {
        expect(fileContent).toMatch(/cvv/);
    });

    test('PaymentFormComponent boundary should contain form submission handler', () => {
        expect(fileContent).toMatch(/handleSubmit/);
    });

    test('PaymentFormComponent boundary should contain pay button', () => {
        expect(fileContent).toMatch(/Pay/);
    });
});
