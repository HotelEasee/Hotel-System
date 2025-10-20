import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';
import './HotelsPage.css';

const HotelsPage: React.FC = () => {
  // Mock data for demonstration
  const hotels = [
    {
      id: '1',
      name: 'Grand Palace Hotel',
      location: 'New York, USA',
      price: 299,
      rating: 4.8,
      image: '/hotel-room.jpg',
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    },
    {
      id: '2',
      name: 'Ocean View Resort',
      location: 'Miami, USA',
      price: 399,
      rating: 4.9,
      image: '/hotel-room.jpg',
      amenities: ['WiFi', 'Pool', 'Beach', 'Restaurant'],
    },
    {
      id: '3',
      name: 'Mountain Lodge',
      location: 'Denver, USA',
      price: 199,
      rating: 4.6,
      image: '/hotel-room.jpg',
      amenities: ['WiFi', 'Spa', 'Restaurant', 'Parking'],
    },
  ];

  return (
    <div className="hotels-page">
      <div className="container">
        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-bar">
            <div className="search-input-group">
              <FaMapMarkerAlt className="search-icon" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="search-input"
              />
            </div>
            <div className="date-inputs">
              <input type="date" className="date-input" />
              <input type="date" className="date-input" />
            </div>
            <div className="guests-input">
              <select className="guests-select">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3+ Guests</option>
              </select>
            </div>
            <button className="search-btn">
              <FaSearch />
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Price Range:</label>
            <select className="filter-select">
              <option>Any Price</option>
              <option>$0 - $100</option>
              <option>$100 - $200</option>
              <option>$200 - $300</option>
              <option>$300+</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Star Rating:</label>
            <select className="filter-select">
              <option>Any Rating</option>
              <option>5 Stars</option>
              <option>4 Stars</option>
              <option>3 Stars</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Amenities:</label>
            <select className="filter-select">
              <option>Any Amenities</option>
              <option>WiFi</option>
              <option>Pool</option>
              <option>Spa</option>
              <option>Restaurant</option>
            </select>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-image">
                <img src={hotel.image} alt={hotel.name} />
                <button className="favorite-btn">
                  <FaHeart />
                </button>
              </div>
              <div className="hotel-info">
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-location">
                  <FaMapMarkerAlt />
                  {hotel.location}
                </p>
                <div className="hotel-rating">
                  <FaStar />
                  <span>{hotel.rating}</span>
                </div>
                <div className="hotel-amenities">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="hotel-footer">
                  <div className="hotel-price">
                    <span className="price">${hotel.price}</span>
                    <span className="price-unit">/night</span>
                  </div>
                  <Link to={`/hotels/${hotel.id}`} className="view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;

