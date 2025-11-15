import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { RootState } from '@/store/index';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import HotelImage from '../assets/Capital.jpg'

const LoginPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      if (email === 'test@example.com' && password === 'password') {
        const user = {
          id: '1',
          email,
          name: 'Test User',
          role: 'user' as const,
        };
        const token = 'fake-jwt-token';

        dispatch(loginSuccess({ user, token }));
        navigate('/hotels'); 
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };



  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-form">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account</p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-group">
                  {/* <FaEnvelope className="input-icon" /> */}
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  {/* <FaLock className="input-icon" /> */}
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {authState.error && <p className="error-message">{authState.error}</p>}
              <button type="submit" className="login-btn" disabled={authState.isLoading}>
                {authState.isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>


            <p className="signup-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>

          <div className="login-image">
            <img src={HotelImage} alt="Luxury hotel room" />
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

