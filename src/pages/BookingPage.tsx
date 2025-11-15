import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../store/slices/bookingSlice';
import { allHotels } from './HotelDetailsPage';
import './BookingPage.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RootState } from '@/store';

const BookingPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const hotel = allHotels.find(h => h.id === hotelId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkIn = useSelector((state: RootState) => state.bookings.checkIn);
  const checkOut = useSelector((state: RootState) => state.bookings.checkOut);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('South Africa');
  const [phoneCode, setPhoneCode] = useState('+27');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!hotel) {
    return <div>Hotel not found!</div>;
  }

  // Calculate nights if dates set
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 3600 * 24)
          )
        )
      : 0;

  // Price calculations
  const originalPrice = nights * hotel.pricePerNight;
  // Example discount: fixed 200 if nights > 3 just for illustration
  const discount = nights > 3 ? 200 : 0;
  const totalPrice = originalPrice - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !name || !email || !phoneNumber) {
      setError('Please fill all required fields and select dates.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out must be after check-in.');
      return;
    }
    setError(null);

    const booking = {
      id: `${Date.now()}`,
      hotelId: hotel.id,
      userId: 'user-123', // Change with auth user id
      checkIn,
      checkOut,
      guests: 1, // Can add guests selection if needed
      rooms: 1,  // Can add rooms selection
      totalAmount: totalPrice,
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addBooking(booking));
    navigate(`/payment/${hotel.id}` ); // navigating to the payment page
  };

  return (
    <div className="booking-page-container">
      <div className="steps-indicator">
        <div className="step completed">1 Your selection</div>
        <div className="step current">2 Your details</div>
        <div className="step">3 Finish Booking</div>
      </div>
      <div className="booking-main">
        {/* Left pane: selection summary */}
        <div className="selection-summary">
          <div className="hotel-card">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="hotel-image"
            />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p className="hotel-location">
                <span role="img" aria-label="location">
                  <FaMapMarkerAlt/>
                </span>{' '}
                {hotel.address}, {hotel.location}
              </p>
              <div className="hotel-amenities">
                {/* Example: Static or create icons + labels */}
                <div className="amenities-grid">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <amenity.icon />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
              </div>
              <p className="rating-text">Excellent location – {hotel.rating}</p>
            </div>
          </div>

          <div className="price-summary">
            <h4>Your price summary</h4>
            <div className="price-row">
              <span>Original price</span>
              <span>ZAR {hotel.pricePerNight}</span>
            </div>
            <div className="price-row discount">
              <span>Discount</span>
              <span>ZAR -{discount.toLocaleString()}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>
                ZAR {hotel.pricePerNight}
                <br />
                <small>Includes taxes & charges</small>
              </span>
            </div>
          </div>

          <div className="booking-details-summary">
            <h4>Your booking details</h4>
            <div className="dates-row">
              <div>
                <strong>Check in</strong>
                <div>{checkIn ? new Date(checkIn).toDateString() : '-'}</div>
                <small>From 13:00</small>
              </div>
              <div>
                <strong>Check out</strong>
                <div>{checkOut ? new Date(checkOut).toDateString() : '-'}</div>
                <small>Until 18:00</small>
              </div>
            </div>
            <p>Total length of stay: {nights} night{nights !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Right pane: Enter your details form */}
        <div className="details-form">
          <h3>Enter your details</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                placeholder="Enter Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Address
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label>
              Country
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option>South Africa</option>
                <option>Other</option>
              </select>
            </label>

            <label className="phone-input">
              Phone Number
              <div className="phone-wrapper">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  required
                >
                  <option value="+27">ZA +27</option>
                  <option value="+1">US +1</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="next-btn">
              Finish Booking &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
