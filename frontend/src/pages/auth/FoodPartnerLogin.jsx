import React from 'react';
import '../../styles/auth-shared.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FoodPartnerLogin = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)

            const email = e.target.email.value;
            const password = e.target.password.value;

            const res = await axios.post("http://localhost:3000/api/v1/user/food-partner/login", {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                console.log(res.data)
                navigate("/create-food")
            }
        } catch (error) {
            console.log("login error", error)
        } finally {
            setLoading(false)
        }

    };



    return (
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="partner-login-title">
                <header>
                    <h1 id="partner-login-title" className="auth-title">Partner login</h1>
                    <p className="auth-subtitle">Access your dashboard and manage orders.</p>
                </header>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
                    </div>
                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
                    </div>
                    <button className="auth-submit" type="submit">
                        {
                            loading ? "Loading..." : "Sign In"
                        }
                    </button>
                </form>
                <div className="auth-alt-action">
                    New partner? <a href="/food-partner/register">Create an account</a>
                </div>
            </div>
        </div>
    );
};

export default FoodPartnerLogin;