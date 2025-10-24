import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Smart Hotel Booking Made Simple
          </h1>
          <p className="hero-description">
            Experience a seamless way to discover, book, and manage hotel stays. 
            Our Hotel Management System connects users with the best hotels.
          </p>
        </div>
        <div className="hero-image">
          <img src="/a86474919230fead67e6704203aa5fb7.jpg" alt="City street view" />
        </div>
      </section>

      {/* Feature Description Section */}
      <section className="feature-section">
        <div className="feature-content">
          <p className="feature-text">
            Browse through available hotels, compare prices, view room details, 
            and confirm bookings instantly — all from one platform.
          </p>
          <p className="feature-text">
            Our platform ensures smooth navigation, secure account management, 
            and an intuitive interface for guests.
          </p>
        </div>
      </section>

      {/* Supporting Images Section */}
      <section className="images-section">
        <div className="image-container">
          <img src="/premium_photo-1674651240687-92b4ad15d0ea.jpeg" alt="Luxury hotel room with ocean view" className="supporting-image" />
          <img src="/OB-SV549_0504ho_D_20120504033332.jpg" alt="Hotel neon sign" className="supporting-image" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;