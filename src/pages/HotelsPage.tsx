import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUsers, FaBed, FaMapMarkerAlt, FaStar, FaFilter } from 'react-icons/fa';
import './HotelsPage.css';

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
  description: string;
  amenities: string[];
  availableRooms: number;
}

const HotelsPage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1
  });

  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock hotel data - in a real app, this would come from an API
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "Ocean View Resort",
      location: "Miami Beach, FL",
      price: 299,
      rating: 4.8,
      image: "/premium_photo-1674651240687-92b4ad15d0ea.jpeg",
      description: "Luxury resort with stunning ocean views and private beach access.",
      amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Parking"],
      availableRooms: 15
    },
    {
      id: 2,
      name: "City Center Hotel",
      location: "New York, NY",
      price: 199,
      rating: 4.5,
      image: "/OB-SV549_0504ho_D_20120504033332.jpg",
      description: "Modern hotel in the heart of the city with easy access to attractions.",
      amenities: ["Free WiFi", "Fitness Center", "Business Center", "Room Service"],
      availableRooms: 8
    },
    {
      id: 3,
      name: "Downtown Plaza",
      location: "Los Angeles, CA",
      price: 179,
      rating: 4.3,
      image: "/a86474919230fead67e6704203aa5fb7.jpg",
      description: "Contemporary hotel with excellent amenities and city views.",
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Concierge"],
      availableRooms: 12
    },
    {
      id: 4,
      name: "Mountain Lodge",
      location: "Denver, CO",
      price: 159,
      rating: 4.6,
      image: "/premium_photo-1674651240687-92b4ad15d0ea.jpeg",
      description: "Cozy mountain retreat with breathtaking views and outdoor activities.",
      amenities: ["Free WiFi", "Hot Tub", "Hiking Trails", "Restaurant"],
      availableRooms: 6
    },
    {
      id: 5,
      name: "Beachfront Inn",
      location: "San Diego, CA",
      price: 229,
      rating: 4.7,
      image: "/OB-SV549_0504ho_D_20120504033332.jpg",
      description: "Charming beachfront property with direct beach access.",
      amenities: ["Free WiFi", "Beach Access", "Pool", "Restaurant"],
      availableRooms: 10
    },
    {
      id: 6,
      name: "Historic Grand Hotel",
      location: "Boston, MA",
      price: 189,
      rating: 4.4,
      image: "/a86474919230fead67e6704203aa5fb7.jpg",
      description: "Elegant historic hotel with modern amenities in downtown Boston.",
      amenities: ["Free WiFi", "Historic Tours", "Restaurant", "Concierge"],
      availableRooms: 20
    }
  ];

  useEffect(() => {
    setFilteredHotels(hotels);
  }, []);

  const handleSearch = () => {
    let filtered = hotels;

    // Filter by destination
    if (searchFilters.destination) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchFilters.destination.toLowerCase())
      );
    }

    // Filter by available rooms
    filtered = filtered.filter(hotel => hotel.availableRooms >= searchFilters.rooms);

    setFilteredHotels(filtered);
  };

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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTotalGuests = () => {
    return searchFilters.adults + searchFilters.children;
  };

  return (
    <div className="hotels-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <h1>Find Your Perfect Hotel</h1>
          <p>Search and book hotels worldwide</p>
        </div>

        {/* Search Filters */}
        <div className="search-filters">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="destination">
                <FaMapMarkerAlt />
                Destination
              </label>
              <input
                type="text"
                id="destination"
                placeholder="Where are you going?"
                value={searchFilters.destination}
                onChange={(e) => handleFilterChange('destination', e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="checkIn">
                <FaCalendarAlt />
                Check-in
              </label>
              <input
                type="date"
                id="checkIn"
                value={searchFilters.checkIn}
                onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="checkOut">
                <FaCalendarAlt />
                Check-out
              </label>
              <input
                type="date"
                id="checkOut"
                value={searchFilters.checkOut}
                onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                min={searchFilters.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="guests">
                <FaUsers />
                Guests
              </label>
              <select
                id="guests"
                value={getTotalGuests()}
                onChange={(e) => {
                  const total = parseInt(e.target.value);
                  const adults = Math.min(total, searchFilters.adults);
                  const children = total - adults;
                  setSearchFilters(prev => ({
                    ...prev,
                    adults,
                    children: Math.max(0, children)
                  }));
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="rooms">
                <FaBed />
                Rooms
              </label>
              <select
                id="rooms"
                value={searchFilters.rooms}
                onChange={(e) => handleFilterChange('rooms', parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} Room{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button className="search-btn" onClick={handleSearch}>
              <FaSearch />
              Search Hotels
            </button>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="advanced-filters-toggle">
            <button 
              className="toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Advanced Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="advanced-filters">
              <div className="guest-details">
                <h4>Guest Details</h4>
                <div className="guest-controls">
                  <div className="guest-group">
                    <label>Adults</label>
                    <div className="number-control">
                      <button 
                        onClick={() => handleFilterChange('adults', Math.max(1, searchFilters.adults - 1))}
                        disabled={searchFilters.adults <= 1}
                      >
                        -
                      </button>
                      <span>{searchFilters.adults}</span>
                      <button 
                        onClick={() => handleFilterChange('adults', searchFilters.adults + 1)}
                        disabled={getTotalGuests() >= 8}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-group">
                    <label>Children</label>
                    <div className="number-control">
                      <button 
                        onClick={() => handleFilterChange('children', Math.max(0, searchFilters.children - 1))}
                        disabled={searchFilters.children <= 0}
                      >
                        -
                      </button>
                      <span>{searchFilters.children}</span>
                      <button 
                        onClick={() => handleFilterChange('children', searchFilters.children + 1)}
                        disabled={getTotalGuests() >= 8}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Summary */}
        {(searchFilters.destination || searchFilters.checkIn || searchFilters.checkOut) && (
          <div className="search-summary">
            <h3>Search Results</h3>
            <div className="summary-info">
              {searchFilters.destination && (
                <span className="summary-item">
                  <FaMapMarkerAlt />
                  {searchFilters.destination}
                </span>
              )}
              {searchFilters.checkIn && searchFilters.checkOut && (
                <span className="summary-item">
                  <FaCalendarAlt />
                  {formatDate(searchFilters.checkIn)} - {formatDate(searchFilters.checkOut)}
                  {calculateNights() > 0 && ` (${calculateNights()} night${calculateNights() > 1 ? 's' : ''})`}
                </span>
              )}
              <span className="summary-item">
                <FaUsers />
                {getTotalGuests()} guest{getTotalGuests() > 1 ? 's' : ''}, {searchFilters.rooms} room{searchFilters.rooms > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Hotels Grid */}
        <div className="hotels-grid">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="hotel-badge">
                    {hotel.availableRooms} rooms available
                  </div>
                </div>
                <div className="hotel-info">
                  <h3>{hotel.name}</h3>
                  <p className="hotel-location">
                    <FaMapMarkerAlt />
                    {hotel.location}
                  </p>
                  <p className="hotel-description">{hotel.description}</p>
                  
                  <div className="hotel-amenities">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="amenity-tag more">
                        +{hotel.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="hotel-rating">
                    <FaStar />
                    <span className="rating">{hotel.rating}</span>
                    <span className="rating-text">Excellent</span>
                  </div>

                  <div className="hotel-price">
                    <span className="price">${hotel.price}</span>
                    <span className="price-period">/night</span>
                    {calculateNights() > 0 && (
                      <div className="total-price">
                        Total: ${(hotel.price * calculateNights() * searchFilters.rooms).toLocaleString()}
                      </div>
                    )}
                  </div>

                  <Link 
                    to={`/payment/${hotel.id}`} 
                    className="book-btn"
                    state={{ 
                      searchFilters,
                      nights: calculateNights(),
                      totalPrice: hotel.price * calculateNights() * searchFilters.rooms
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No hotels found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p>Showing {filteredHotels.length} of {hotels.length} hotels</p>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;