import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
      <div className="container">
        <div className="register-container">
          <div className="register-form">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join HotelEase today</p>

            <form className="form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" className="register-btn">
                Create Account
              </button>

              <div className="divider">
                <span>Or continue with</span>
              </div>

              <button type="button" className="google-btn">
                <FaGoogle />
                Sign up with Google
              </button>
            </form>

            <p className="login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>

          <div className="register-image">
            <img src="/hotel-room.jpg" alt="Luxury hotel room" />
            <div className="image-overlay">
              <h2>Start Your Journey</h2>
              <p>Join thousands of travelers who trust HotelEase for their accommodation needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

