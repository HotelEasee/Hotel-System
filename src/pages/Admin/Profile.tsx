import React, { useState } from 'react';
import './Profile.css';

const Profile: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="logo">HotelEase</div>
        <div className="profile-icon" onClick={toggleDropdown}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Profile"
            className="profile-avatar"
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button>Edit Profile</button>
              <button>Payment Info</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </header>

      <main className="profile-main">
        <section className="profile-info">
          <h2>Your Details</h2>
          <form className="profile-form">
            <label>Name</label>
            <input type="text" placeholder="John Doe" />
            <label>Email</label>
            <input type="email" placeholder="john@example.com" />
            <label>Address</label>
            <input type="text" placeholder="123 Main St" />
            <label>Country</label>
            <input type="text" placeholder="South Africa" />
            <label>Phone</label>
            <input type="text" placeholder="+27 00 000 0000" />
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </section>

        <section className="bookings-section">
          <h2>Your Bookings</h2>
          <div className="booking-card">No active bookings.</div>
        </section>

        <section className="favorites-section">
          <h2>Your Favorites</h2>
          <div className="favorite-card">No favorites yet.</div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
