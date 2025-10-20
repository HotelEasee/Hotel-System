import React from 'react';
import { Link } from 'react-router-dom';
import './BookingPage.css';

const BookingPage: React.FC = () => {
  return (
    <div className="booking-page">
      <div className="container">
        <h1>Booking Page</h1>
        <p>This page will contain the booking functionality with payment integration.</p>
        <Link to="/hotels" className="btn btn-primary">Back to Hotels</Link>
      </div>
    </div>
  );
};

export default BookingPage;

