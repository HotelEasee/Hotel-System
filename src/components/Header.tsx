import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { FaUser, FaHeart, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowProfileMenu(false);
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={() => setShowMobileMenu(false)}>
            <h1>HotelEase</h1>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${showMobileMenu ? 'active' : ''}`}>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                    Admin
                  </Link>
                )}
                <div className="profile-menu-container" ref={profileMenuRef}>
                  <button 
                    className="profile-btn"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div className="profile-avatar">
                      <FaUser />
                    </div>
                    <span className="profile-name">{user?.name || user?.email}</span>
                  </button>
                  
                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setShowMobileMenu(false);
                        }}
                      >
                        <FaUser />
                        <span>My Profile</span>
                      </Link>
                      <Link 
                        to="/profile?tab=bookings" 
                        className="dropdown-item"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setShowMobileMenu(false);
                        }}
                      >
                        <FaCog />
                        <span>My Bookings</span>
                      </Link>
                      <Link 
                        to="/profile?tab=favorites" 
                        className="dropdown-item"
                        onClick={() => {
                          setShowProfileMenu(false);
                          setShowMobileMenu(false);
                        }}
                      >
                        <FaHeart />
                        <span>My Favorites</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button 
                        onClick={handleLogout}
                        className="dropdown-item logout-item"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="nav-link logout-btn mobile-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/profile" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                  Profile
                </Link>
                <Link to="/register" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                  Register
                </Link>
                <Link to="/login" className="nav-link" onClick={() => setShowMobileMenu(false)}>
                  Sign-in
                </Link>
                <Link to="/hotels" className="nav-link book-btn" onClick={() => setShowMobileMenu(false)}>
                  Book
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

