import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';
import './HotelsPage.css';
import HotelsPageImage from '../assets/Hotel1.jpg';
import HotelsPageImage1 from '../assets/Capital.jpg';
import HotelsPageImage2 from '../assets/Max.jpg';
import HotelsPageImage3 from '../assets/Sky.jpg';
import HotelsPageImage4 from '../assets/Pretoria.jpg';
import HotelsPageImage5 from '../assets/Prime.jpg';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '@/store/slices/favoriteSlice';



const HotelsPage: React.FC = () => {
  const dispatch = useDispatch();
  // Mock data for demonstration
  const hotels = [
    {
      id: '1',
      name: 'Hotel Sky',
      location: 'Qwaqwa, Free-state',
      price: 2000,
      rating: 5.0,
      image: HotelsPageImage,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    },
    {
      id: '2',
      name: 'The Capital',
      location: 'Durban, KZN',
      price: 3000,
      rating: 4.5,
      image: HotelsPageImage1,
      amenities: ['WiFi', 'Pool', 'Restaurant'],
    },
    {
      id: '3',
      name: 'Max Hotel',
      location: 'Badplass, Mpumalanga',
      price: 1900,
      rating: 4.7,
      image: HotelsPageImage2,
      amenities: ['WiFi', 'Spa', 'Restaurant', 'Parking'],
    },
    {
      id: '4',
      name: 'Hotel Sky',
      location: 'Newcastle, KZN',
      price: 2100,
      rating: 4.6,
      image: HotelsPageImage3,
      amenities: ['WiFi', 'Spa', 'Restaurant', 'Parking'],
    },
    {
      id: '5',
      name: 'PKT Hotel',
      location: 'Pretoria, Gauteng',
      price: 1999,
      rating: 4.6,
      image: HotelsPageImage4,
      amenities: ['WiFi', 'Spa', 'Beach', 'Restaurant', 'Parking'],
    },
    {
      id: '6',
      name: 'Prime Hotel',
      location: 'Gemiston, Gauteng',
      price: 2000,
      rating: 4.8,
      image: HotelsPageImage5,
      amenities: ['WiFi', 'Spa', 'Beach', 'Restaurant', 'Parking'],
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
              <option>R0 - R100</option>
              <option>R100 - R200</option>
              <option>R200 - R300</option>
              <option>R300+</option>
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
                
                <button 
                  className="favorite-btn"  
                  onClick={() => dispatch(toggleFavorite(hotel.id))}
                >
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
                <div className="hotel-amenitiese">
                  {hotel.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="hotel-footer">
                  <Link to={`/hotels/${hotel.id}`} className="view-btn">
                    View Details
                  </Link>
                  <div className="hotel-price">
                    <span className="price">R{hotel.price}</span>
                    <span className="price-unit">per night</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination" style={{margin: "5% 35%"}}>
          <a href="#">&laquo;</a>
          <a className="active" href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;


