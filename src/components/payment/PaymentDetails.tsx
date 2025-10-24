import React, { useState } from 'react';
import { FaCreditCard, FaCalendarAlt, FaQuestionCircle, FaClock, FaCheckCircle } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface BookingData {
  hotel: {
    id: string;
    name: string;
    address: string;
    rating: number;
    image: string;
  };
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  basePrice: number;
  vat: number;
  total: number;
  personalInfo?: any;
}

interface PaymentDetailsProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  onComplete: () => void;
}

interface PaymentInfo {
  paymentMethod: 'card' | 'googlepay';
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
  securePayment: boolean;
  arrivalTime: string;
}

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SK4EeKfsjeetxhkHtYVFBzhUtFiyf4o03PVURBPyUuJH6EJlFXArNq2Cg64kuSDrAJ1JDHJoWpl29hO82hlUjXz00ldCqwN5Y');

const PaymentForm: React.FC<{
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onComplete: () => void;
}> = ({ paymentInfo, setPaymentInfo, onComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Get the CardElement
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: paymentInfo.cardholderName,
        },
      });

      if (error) {
        console.error('Payment method creation failed:', error);
        alert('Payment failed: ' + error.message);
        return;
      }

      console.log('Payment method created:', paymentMethod);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onComplete();
    } catch (error) {
      console.error('Payment processing failed:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label htmlFor="cardholderName">Cardholder's Name *</label>
        <input
          type="text"
          id="cardholderName"
          value={paymentInfo.cardholderName}
          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
          className="form-input"
          placeholder="Name on card"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cardNumber">Card number *</label>
        <div className="card-input-wrapper">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
          <FaCreditCard className="card-icon" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="expiryDate">Expiration date *</label>
        <div className="expiry-input-wrapper">
          <input
            type="text"
            id="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
              }
              setPaymentInfo({ ...paymentInfo, expiryDate: value });
            }}
            className="form-input"
            placeholder="MM/YY"
            maxLength={5}
            required
          />
          <FaCalendarAlt className="calendar-icon" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cvv">CVV *</label>
        <div className="cvv-input-wrapper">
          <input
            type="text"
            id="cvv"
            value={paymentInfo.cvv}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '') })}
            className="form-input"
            placeholder="123"
            maxLength={4}
            required
          />
          <FaQuestionCircle className="help-icon" />
        </div>
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={paymentInfo.saveCard}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, saveCard: e.target.checked })}
          />
          <span className="checkmark"></span>
          Save card
        </label>
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={paymentInfo.securePayment}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, securePayment: e.target.checked })}
            required
          />
          <span className="checkmark"></span>
          Secure payment
        </label>
      </div>

      <div className="arrival-time-section">
        <div className="arrival-info">
          <FaClock className="clock-icon" />
          <span>Your room will be ready for check-in at 3:00 PM</span>
        </div>
        <div className="form-group">
          <label htmlFor="arrivalTime">Add your estimated arrival time (optional)</label>
          <input
            type="time"
            id="arrivalTime"
            value={paymentInfo.arrivalTime}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, arrivalTime: e.target.value })}
            className="form-input"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-complete"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Complete Reservation'}
      </button>
    </form>
  );
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ 
  bookingData, 
  updateBookingData, 
  onNext, 
  onPrevious, 
  currentStep,
  onComplete 
}) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'card',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    securePayment: false,
    arrivalTime: ''
  });

  const handlePaymentMethodChange = (method: 'card' | 'googlepay') => {
    setPaymentInfo({ ...paymentInfo, paymentMethod: method });
  };

  return (
    <div className="payment-details">
      <div className="step-header">
        <h2>Payment</h2>
      </div>

      <div className="payment-methods">
        <h3>How do you want to pay?</h3>
        
        <div className="payment-option">
          <label className="payment-option-label">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentInfo.paymentMethod === 'card'}
              onChange={() => handlePaymentMethodChange('card')}
            />
            <div className="payment-option-content">
              <FaCreditCard className="payment-icon" />
              <span>New card</span>
            </div>
          </label>
        </div>

        <div className="payment-option">
          <label className="payment-option-label">
            <input
              type="radio"
              name="paymentMethod"
              value="googlepay"
              checked={paymentInfo.paymentMethod === 'googlepay'}
              onChange={() => handlePaymentMethodChange('googlepay')}
            />
            <div className="payment-option-content">
              <div className="google-pay-logo">G Pay</div>
              <span>Google Pay</span>
            </div>
          </label>
        </div>
      </div>

      {paymentInfo.paymentMethod === 'card' && (
        <div className="card-payment-section">
          <h4>New card (details section)</h4>
          <Elements stripe={stripePromise}>
            <PaymentForm
              paymentInfo={paymentInfo}
              setPaymentInfo={setPaymentInfo}
              onComplete={onComplete}
            />
          </Elements>
        </div>
      )}

      {paymentInfo.paymentMethod === 'googlepay' && (
        <div className="google-pay-section">
          <div className="google-pay-button">
            <div className="google-pay-content">
              <div className="google-pay-logo-large">G Pay</div>
              <span>Pay with Google Pay</span>
            </div>
          </div>
          <p className="google-pay-note">
            Google Pay integration would be implemented here for production use.
          </p>
        </div>
      )}

      {/* Confirmation Section */}
      <div className="confirmation-section">
        <div className="confirmation-icon">
          <FaCheckCircle />
        </div>
        <div className="confirmation-text">Confirmed</div>
        <div className="payment-provider-logo">PL</div>
      </div>
    </div>
  );
};

export default PaymentDetails;
