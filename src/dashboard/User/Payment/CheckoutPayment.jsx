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

    console.log(cart)
 
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: price}).then(res => {
            console.log(res.data)
            setClientSecret(res.data.clientSecret)
        });
    },[]);

    const handleSubmit = async (event) => {
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
            card
        });
        if(error) {
            console.log(error);
            setMessage(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod)
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details: {
                    name: currentUser?.name || "Unknown",
                    email: currentUser?.email|| "Anonymous",
                },
            }
        })

        if(confirmError){
            console.log("[Confirm Error]", confirmError)
        } else {
            console.log("[Payment Intent]", paymentIntent)
            if(paymentIntent.status === "succeeded") {
                const transactionId = paymentIntent.id;
                const paymentMethod = paymentIntent.payment_method;
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency;
                const paymentStatus = paymentIntent.status;
                const userName = currentUser?.name;
                const userEmail = currentUser?.email;

                const data = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userEmail,
                    bookId: cartItem ? [cartItem] : cart,
                    date: new Date()
                }
                
                fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(res => {
                    console.log(res)
                    if(res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId) {
                        setSucceeded("Payment Successful, You can now access your book.");
                    } else {
                        setSucceeded('Payment Failed, Please try again..')
                    }
                }).catch(err => console.log(err))
            }
        }

    };

  return (
    <>
        <div className='text-center'>
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

        <button className='mt-5' type='submit' disabled={isLoading || !stripe || !clientSecret}>
        Pay
        </button>
            {message && <p className='text-red-500'>{message}</p>}
            {succeeded && <p className='text-green-500'>{succeeded}</p>}
        </form>
    </>
  )
}

export default CheckoutPayment