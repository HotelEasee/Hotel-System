import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <h1>Profile Page</h1>
        <p>This page will contain user profile management and booking history.</p>
        <Link to="/hotels" className="btn btn-primary">Browse Hotels</Link>
      </div>
    </div>
  );
};

export default ProfilePage;

