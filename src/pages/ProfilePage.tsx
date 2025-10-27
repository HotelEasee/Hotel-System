import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaHeart, 
  FaEdit, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaHotel, 
  FaDollarSign,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaBed
} from 'react-icons/fa';
import './ProfilePage.css';

interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface Favorite {
  id: string;
  hotelId: string;
  hotelName: string;
  location: string;
  price: number;
  image: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'favorites'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get active tab from URL query params
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'bookings' || tab === 'favorites') {
      setActiveTab(tab);
    }

    // Mock data - in real app, fetch from API
    setBookings([
      {
        id: '1',
        hotelId: '1',
        hotelName: 'Ocean View Resort',
        checkIn: '2024-03-15',
        checkOut: '2024-03-18',
        guests: 2,
        rooms: 1,
        totalPrice: 897,
        status: 'confirmed',
        createdAt: '2024-02-10',
      },
    ]);

    setFavorites([
      {
        id: '1',
        hotelId: '1',
        hotelName: 'Ocean View Resort',
        location: 'Miami Beach, FL',
        price: 299,
        image: '/premium_photo-1674651240687-92b4ad15d0ea.jpeg',
      },
    ]);
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = () => {
    // In real app, save to API
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));
      alert('Booking cancelled successfully!');
    }
  };

  const handleRemoveFavorite = (favoriteId: string) => {
    setFavorites(favorites.filter(fav => fav.id !== favoriteId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="status-badge confirmed"><FaCheckCircle /> Confirmed</span>;
      case 'pending':
        return <span className="status-badge pending"><FaClock /> Pending</span>;
      case 'cancelled':
        return <span className="status-badge cancelled"><FaTimesCircle /> Cancelled</span>;
      default:
        return null;
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-cover">
            <div className="profile-avatar-section">
              <div className="profile-avatar-large">
                <FaUser />
              </div>
              <div className="profile-info-header">
                <h1>{user.name || 'User Profile'}</h1>
                <p>{user.email}</p>
                {user.role === 'admin' && <span className="role-badge admin">Admin</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser />
            Profile
          </button>
          <button 
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaCalendarAlt />
            Bookings
          </button>
          <button 
            className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FaHeart />
            Favorites
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-tab-content">
              <div className="profile-section-header">
                <h2>Personal Information</h2>
                {!editMode && (
                  <button className="edit-btn" onClick={() => setEditMode(true)}>
                    <FaEdit />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!editMode}
                  />
                </div>

                {editMode && (
                  <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Security Section */}
              <div className="profile-section">
                <h3>Security</h3>
                <div className="security-options">
                  <button className="security-btn">
                    Change Password
                  </button>
                  <button className="security-btn">
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="profile-tab-content">
              <h2>My Bookings</h2>
              {bookings.length > 0 ? (
                <div className="bookings-list">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-header">
                        <div className="booking-hotel">
                          <FaHotel />
                          <h3>{booking.hotelName}</h3>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="booking-details">
                        <div className="booking-detail">
                          <FaCalendarAlt />
                          <div>
                            <span className="detail-label">Check-in</span>
                            <span className="detail-value">{formatDate(booking.checkIn)}</span>
                          </div>
                        </div>
                        <div className="booking-detail">
                          <FaCalendarAlt />
                          <div>
                            <span className="detail-label">Check-out</span>
                            <span className="detail-value">{formatDate(booking.checkOut)}</span>
                          </div>
                        </div>
                        <div className="booking-detail">
                          <FaUsers />
                          <div>
                            <span className="detail-label">Guests</span>
                            <span className="detail-value">{booking.guests}</span>
                          </div>
                        </div>
                        <div className="booking-detail">
                          <FaBed />
                          <div>
                            <span className="detail-label">Rooms</span>
                            <span className="detail-value">{booking.rooms}</span>
                          </div>
                        </div>
                      </div>

                      <div className="booking-footer">
                        <div className="booking-price">
                          <FaDollarSign />
                          <span>Total: ${booking.totalPrice}</span>
                        </div>
                        {booking.status !== 'cancelled' && (
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaCalendarAlt />
                  <h3>No bookings yet</h3>
                  <p>Start exploring and book your first hotel!</p>
                  <button className="btn btn-primary" onClick={() => navigate('/hotels')}>
                    Browse Hotels
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="profile-tab-content">
              <h2>My Favorites</h2>
              {favorites.length > 0 ? (
                <div className="favorites-grid">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="favorite-card">
                      <div className="favorite-image">
                        <img src={favorite.image} alt={favorite.hotelName} />
                        <button 
                          className="remove-favorite-btn"
                          onClick={() => handleRemoveFavorite(favorite.id)}
                          title="Remove from favorites"
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                      <div className="favorite-info">
                        <h3>{favorite.hotelName}</h3>
                        <p><FaMapMarkerAlt /> {favorite.location}</p>
                        <div className="favorite-price">
                          ${favorite.price} <span>/night</span>
                        </div>
                        <button className="btn btn-primary" onClick={() => navigate(`/hotels/${favorite.hotelId}`)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaHeart />
                  <h3>No favorites yet</h3>
                  <p>Start adding hotels to your favorites!</p>
                  <button className="btn btn-primary" onClick={() => navigate('/hotels')}>
                    Browse Hotels
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
