import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { FaUser, FaHeart } from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>HotelEase</h1>
          </Link>

          {/* Navigation */}
          <nav className="nav">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="nav-link">
                  <FaUser />
                  Profile
                </Link>
                <Link to="/profile?tab=favorites" className="nav-link">
                  <FaHeart />
                  Favorites
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
                <Link to="/login" className="nav-link">
                  Sign-in
                </Link>
                <Link to="/hotels" className="nav-link book-btn">
                  Book
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

