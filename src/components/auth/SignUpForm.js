import React, { useState } from 'react';
import AuthService from '../../services/AuthService';

const SignUpForm = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.signup(user);
            window.location.href = '/'; // Redirect to home page after successful signup
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
