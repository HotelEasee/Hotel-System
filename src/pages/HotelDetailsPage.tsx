import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShare, FaMapMarkerAlt, FaStar, FaWifi, FaSwimmingPool, FaCar, FaUtensils } from 'react-icons/fa';
import './HotelDetailsPage.css';

const HotelDetailsPage: React.FC = () => {
  // Mock hotel data
  const hotel = {
    id: '1',
    name: 'Grand Palace Hotel',
    description: 'Experience luxury and comfort at our world-class hotel located in the heart of the city. Our hotel offers exceptional service, modern amenities, and breathtaking views.',
    location: 'New York, USA',
    address: '123 Grand Avenue, New York, NY 10001',
    rating: 4.8,
    pricePerNight: 299,
    images: ['/hotel-room.jpg', '/hotel-room.jpg', '/hotel-room.jpg'],
    amenities: [
      { name: 'Free WiFi', icon: FaWifi },
      { name: 'Swimming Pool', icon: FaSwimmingPool },
      { name: 'Free Parking', icon: FaCar },
      { name: 'Restaurant', icon: FaUtensils },
    ],
    policies: [
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Cancellation: Free cancellation up to 24 hours before check-in',
      'Pet Policy: Pets allowed with additional fee',
    ],
  };

  return (
    <div className="hotel-details-page">
      <div className="container">
        {/* Hotel Header */}
        <div className="hotel-header">
          <div className="hotel-title-section">
            <h1 className="hotel-name">{hotel.name}</h1>
            <div className="hotel-location">
              <FaMapMarkerAlt />
              <span>{hotel.location}</span>
            </div>
            <div className="hotel-rating">
              <FaStar />
              <span>{hotel.rating}</span>
              <span className="rating-text">Excellent</span>
            </div>
          </div>
          <div className="hotel-actions">
            <button className="action-btn favorite">
              <FaHeart />
              Save
            </button>
            <button className="action-btn share">
              <FaShare />
              Share
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={hotel.images[0]} alt={hotel.name} />
          </div>
          <div className="thumbnail-images">
            {hotel.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`${hotel.name} ${index + 2}`} />
            ))}
          </div>
        </div>

        {/* Hotel Info */}
        <div className="hotel-content">
          <div className="hotel-main-info">
            <div className="description-section">
              <h2>About this hotel</h2>
              <p>{hotel.description}</p>
            </div>

            <div className="amenities-section">
              <h2>Hotel amenities</h2>
              <div className="amenities-grid">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <amenity.icon />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="policies-section">
              <h2>Hotel policies</h2>
              <ul className="policies-list">
                {hotel.policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="booking-card">
            <div className="price-section">
              <div className="price">
                <span className="amount">ZAR {hotel.pricePerNight.toLocaleString()}</span>
                <span className="unit">/night</span>
              </div>
              <div className="price-note">Prices may vary by date</div>
            </div>

            <div className="booking-form">
              <div className="form-group">
                <label>Check-in</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Check-out</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select className="form-input">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3+ Guests</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rooms</label>
                <select className="form-input">
                  <option>1 Room</option>
                  <option>2 Rooms</option>
                  <option>3+ Rooms</option>
                </select>
              </div>
              <Link to={`/payment/${hotel.id}`} className="book-btn">
                Reserve
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;

