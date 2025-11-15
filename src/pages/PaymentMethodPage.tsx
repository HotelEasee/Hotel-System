import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { allHotels } from './HotelDetailsPage';
import { RootState } from '@/store/index';
import './PaymentMethodPage.css';

const PaymentMethodPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const hotel = allHotels.find(h => h.id === hotelId);
  const navigate = useNavigate();

  // Get user/booking form details from Redux or context or props
  const booking = useSelector((state: RootState) => state.bookings);
  const { checkIn, checkOut } = booking; // Replace with your real selectors

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Calculate total in cents
  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24)))
      : 0;
  const totalPrice = hotel ? nights * hotel.pricePerNight : 0;
  const totalCents = Math.round(totalPrice * 100);

  // Get client secret from backend when page mounts
  useEffect(() => {
    if (!totalCents) return;
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalCents }) // Amount in **cents**
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, [totalCents]);

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/booking-confirmation',
        payment_method_data: {
          
        },
      },
      redirect: 'if_required',
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
      setProcessing(false);
    } else if (result.paymentIntent?.status === 'succeeded') {
      setProcessing(false);
      navigate('/booking-confirmation');
    }
  };

  if (!hotel) return <div>Hotel not found!</div>;
  if (!clientSecret) return <div>Loading payment form...</div>;

  return (
    <div className="payment-checkout-container">
      <div className="booking-summary">
        <h3>{hotel.name}</h3>
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          style={{ width: 140, borderRadius: 12, marginBottom: 12 }}
        />
        <p style={{ fontSize: 24, fontWeight: 600, color: '#222', margin: 0 }}>
          ZAR {totalPrice?.toFixed(2)}
        </p>
        <div style={{marginTop: 8, color: '#888'}}>
          {checkIn} — {checkOut}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="stripe-checkout-form">
        <h4 style={{ marginBottom: 12, fontWeight: 600 }}>Or pay with card</h4>
        <PaymentElement />
        {error && <div className="payment-error">{error}</div>}
        <button className="pay-btn" disabled={processing || !stripe}>
          {processing ? "Processing..." : `Pay ZAR ${totalPrice?.toFixed(2)}`}
        </button>
        <div className="powered-by-stripe">Powered by <strong>Stripe</strong></div>
      </form>
    </div>
  );
};

export default PaymentMethodPage;
