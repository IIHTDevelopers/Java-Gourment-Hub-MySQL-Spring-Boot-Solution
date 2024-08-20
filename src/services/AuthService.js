import axios from 'axios';

const API_URL = 'http://localhost:4000';

const AuthService = {
    login: async (credentials) => {
        try {
            const response = await axios.get(`${API_URL}/users`, {
                params: {
                    email: credentials.email
                }
            });

            const user = response.data.find(u => u.email === credentials.email);

            if (!user || user.password !== credentials.password) {
                throw new Error('Invalid email or password');
            }

            // You might want to use some form of token or session in a real app
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        } catch (error) {
            throw new Error(error.message || 'Failed to login');
        }
    },

    signup: async (user) => {
        try {
            const response = await axios.post(`${API_URL}/users`, user);
            const userWithoutPassword = { ...response.data };
            delete userWithoutPassword.password;

            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        } catch (error) {
            throw new Error(error.message || 'Failed to sign up');
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default AuthService;
