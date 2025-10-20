import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { FaUser, FaHeart, FaBars, FaTimes, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/hotels?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleTheme = () => {
    dispatch({ type: 'ui/setTheme', payload: theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <header className={`header ${theme}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>HotelEase</h1>
          </Link>

          {/* Search Bar */}
          <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search hotels, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/hotels" className="nav-link">
              Hotels
            </Link>
            
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
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="header-actions">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="action-btn search-toggle"
            >
              <FaSearch />
            </button>
            
            <button onClick={toggleTheme} className="action-btn theme-toggle">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="action-btn menu-toggle"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

