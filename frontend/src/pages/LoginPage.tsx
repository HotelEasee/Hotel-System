import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-form">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account</p>

            <form className="form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="login-btn">
                Sign In
              </button>

              <div className="divider">
                <span>Or continue with</span>
              </div>

              <button type="button" className="google-btn">
                <FaGoogle />
                Sign in with Google
              </button>
            </form>

            <p className="signup-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>

          <div className="login-image">
            <img src="/hotel-room.jpg" alt="Luxury hotel room" />
            <div className="image-overlay">
              <h2>Discover Amazing Hotels</h2>
              <p>Find and book the perfect accommodation for your next trip</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

