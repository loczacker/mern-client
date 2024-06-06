// Payment.jsx

import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPayment from './CheckoutPayment';
import './Payment.css';

const stripePromise = loadStripe("pk_test_51PBwbkGLkrLd9UE1xdqBdETAWtx8hlKmjVLuW37ojuhpXtI74mQuwUHtJley8XZKNEeCL0ymcCNJe0JeSoViV3LG004pwoepwz");

const Payment = () => {
  const location = useLocation();
  const price = location?.state.price;
  const cartItem = location.state?.itemId;

  if (!price) {
    return <Navigate to="/dashboard/my-selected" />;
  }

  return (
      <div className="my-40 flex flex-col p-2 payment-container">
        <Elements stripe={stripePromise}>
          <CheckoutPayment price={price} cartItem={cartItem} />
        </Elements>
      </div>
  );
}

export default Payment;
