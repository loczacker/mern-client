import React, { useEffect, useState } from 'react'
import {PaymentElement, useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUser from '../../../hooks/useUser';
import { Navigate } from 'react-router-dom';

const CheckoutPayment = ({price, cartItem}) => {
    const URL = `http://localhost:5001/payment-info?${cartItem&&`bookId=${cartItem}`}`
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {currentUser, isLoading} = useUser();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState([]);

    if(price < 0 || !price) {
        return <Navigate to='/dashboard/my-selected' replace />
    }

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`).then((res) => {
            const bookId = res.data.map(item => item._id);
            setCart(bookId)
    }).catch((err) => console.log(err))
    },[])

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: price}).then(res => {
            setClientSecret(res.data.clientSecret)
        });
    },[]);

    const handleSubmit =async (event) => {
        setMessage('');
        event.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });
        if(error) {
            console.log(error);
            setMessage(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod)
        }
    };

  return (
    <>
        <div className='text-center justify-center'>
            <h1 className='text-2xl font-bold'>
                Paymnet Amount: <span className='text-secondary'>{price}$</span>
            </h1>
        </div>
        <form onSubmit={handleSubmit}>
            <CardElement options={
                {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    }
                }
            }/>

            <button type='submit' disabled={isLoading || !stripe || !clientSecret}>Pay</button>
            {message && <p className='text-red-500'>{message}</p>}
            {succeeded && <p className='text-green-500'>{succeeded}</p>}
        </form>
    </>
  )
}

export default CheckoutPayment