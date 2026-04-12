import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';

const ChooseRegister = () => {

    const baseBtn = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.95rem',
        letterSpacing: '0.4px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    };

    const primaryBtn = {
        ...baseBtn,
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff',
        boxShadow: '0 6px 14px rgba(37,99,235,0.25)'
    };

    const secondaryBtn = {
        ...baseBtn,
        background: '#f1f5f9',
        color: '#111',
        border: '1px solid rgba(0,0,0,0.1)'
    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="choose-register-title">

                <header>
                    <h1 id="choose-register-title" className="auth-title">
                        Register
                    </h1>
                    <p className="auth-subtitle">
                        Pick how you want to join the platform.
                    </p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    <Link
                        to="/user/register"
                        style={primaryBtn}
                    >
                        Register as normal user
                    </Link>

                    <Link
                        to="/food-partner/register"
                        style={secondaryBtn}
                    >
                        Register as food partner
                    </Link>

                </div>

                <div className="auth-alt-action">
                    Already have an account? <Link to="/user/login">Sign in</Link>
                </div>

            </div>
        </div>
    );
};

export default ChooseRegister;