import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUsers, FaBed, FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';
import './BookingPage.css';

interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  nights: number;
}

const BookingPage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    rooms: 1
  });

  // Mock hotel data
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "HotelEase",
      location: "176 Paul Kruger Avenue, 0001 Hartbeespoort, South Africa",
      price: 1500,
      rating: 5,
      image: "/a86474919230fead67e6704203aa5fb7.jpg",
      nights: 2
    },
    {
      id: 2,
      name: "The Capital",
      location: "Main Street, Pretoria, South Africa",
      price: 2000,
      rating: 5,
      image: "/premium_photo-1674651240687-92b4ad15d0ea.jpeg",
      nights: 2
    },
    {
      id: 3,
      name: "Max Hotel",
      location: "City Center, Johannesburg, South Africa",
      price: 1800,
      rating: 5,
      image: "/OB-SV549_0504ho_D_20120504033332.jpg",
      nights: 2
    },
    {
      id: 4,
      name: "Hotel Sky",
      location: "Airport Road, Cape Town, South Africa",
      price: 2200,
      rating: 5,
      image: "/a86474919230fead67e6704203aa5fb7.jpg",
      nights: 2
    },
    {
      id: 5,
      name: "Pretoria Hotel",
      location: "Union Street, Pretoria, South Africa",
      price: 1600,
      rating: 5,
      image: "/premium_photo-1674651240687-92b4ad15d0ea.jpeg",
      nights: 2
    },
    {
      id: 6,
      name: "Prime Hotel",
      location: "Business District, Durban, South Africa",
      price: 2500,
      rating: 5,
      image: "/OB-SV549_0504ho_D_20120504033332.jpg",
      nights: 2
    }
  ];

  const handleFilterChange = (field: keyof SearchFilters, value: string | number) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateNights = () => {
    if (searchFilters.checkIn && searchFilters.checkOut) {
      const checkIn = new Date(searchFilters.checkIn);
      const checkOut = new Date(searchFilters.checkOut);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  return (
    <div className="booking-page">
      {/* Hero Section with Background Image */}
      <section className="hero-search-section">
        <div className="hero-background">
          <img src="/photo-1686766619865-0240cdc1bd92.jpeg" alt="Hotel exterior" />
          <div className="hero-overlay"></div>
        </div>
        
        {/* Search Overlay */}
        <div className="search-overlay">
          <div className="search-container">
            <h1 className="search-title">Search</h1>
            <p className="search-subtitle">Let's find you a home away from home</p>
            
            <div className="search-form">
              <div className="search-input-group">
                <div className="input-icon">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  className="destination-input"
                  placeholder="Enter destination"
                  value={searchFilters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                />
              </div>
              
              <div className="date-input-group">
                <div className="date-input">
                  <div className="input-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="date-content">
                    <label>Check-in date</label>
                    <input
                      type="date"
                      value={searchFilters.checkIn}
                      onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <div className="date-buttons">
                      <button className="cancel-btn">Cancel</button>
                      <button className="ok-btn">OK</button>
                    </div>
                  </div>
                </div>
                
                <div className="date-input">
                  <div className="input-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="date-content">
                    <label>Checkout date</label>
                    <input
                      type="date"
                      value={searchFilters.checkOut}
                      onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                      min={searchFilters.checkIn || new Date().toISOString().split('T')[0]}
                    />
                    <div className="date-buttons">
                      <button className="cancel-btn">Cancel</button>
                      <button className="ok-btn">OK</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="guests-section">
                <div className="guest-dropdown">
                  <label>Adults</label>
                  <select
                    value={searchFilters.adults}
                    onChange={(e) => handleFilterChange('adults', parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="guest-dropdown">
                  <label>Children</label>
                  <select
                    value={searchFilters.children}
                    onChange={(e) => handleFilterChange('children', parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="rooms-slider-group">
                <label>Rooms: 0 - 5</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={searchFilters.rooms}
                  onChange={(e) => handleFilterChange('rooms', parseInt(e.target.value))}
                  className="rooms-slider"
                />
                <div className="slider-value">{searchFilters.rooms}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid Section */}
      <section className="hotels-section">
        <div className="container">
          <div className="hotels-grid">
            {hotels.map((hotel) => (
              <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="hotel-card-link">
                <div className="hotel-card">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} />
                    <button 
                      className="favorite-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div className="hotel-stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <p className="hotel-location">
                    <FaMapMarkerAlt /> {hotel.location}
                  </p>
                  <div className="hotel-price">
                    <span>{hotel.nights} nights ZAR {hotel.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="booking-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>HotelEase</h2>
            </div>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;
