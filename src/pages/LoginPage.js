import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            {isLogin ? (
                <>
                    <h1>Login</h1>
                    <LoginForm />
                    <p>
                        Don't have an account? <button onClick={toggleForm}>Sign Up</button>
                    </p>
                </>
            ) : (
                <>
                    <h1>Sign Up</h1>
                    <SignUpForm />
                    <p>
                        Already have an account? <button onClick={toggleForm}>Login</button>
                    </p>
                </>
            )}
        </div>
    );
};

export default LoginPage;
