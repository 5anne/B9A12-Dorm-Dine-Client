import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";


const CheckoutForm = ({ price }) => {
    const { users } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [badgeData, setBadgeData] = useState([]);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    console.log(price);

    useEffect(() => {
        axios.get('http://localhost:5000/premiumJson')
            .then(data => {
                console.log(data.data);
                const tempData = data?.data?.find(badgeInfo => badgeInfo.price === price);
                console.log(tempData);
                setBadgeData(tempData);
            })
    }, [price])

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment error', error);
            setError(error.message);
        } else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: users?.displayName || 'anonymous',
                    email: users?.email || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction Id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                const payment = {
                    name: users.displayName,
                    email: users.email,
                    transactionId: paymentIntent.id,
                    price: price,
                    date: new Date(),
                    badge: badgeData.badge
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('Payment saved', res);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment successfully done!!!",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }
    };

    return (
        <div className="w-1/2 mx-auto mt-20 shadow-2xl border-2 p-8">
            <form onSubmit={handleSubmit} action="">
                <CardElement
                    options={{
                        style: {
                            base: {
                                backgroundColor: 'wheat',
                                padding: '10px',
                                border: '1px solid black',
                                borderRadius: '4px',
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div>
                    {
                        transactionId && <p className="text-green-900 text-center mt-4">Your Transaction ID: {transactionId}</p>
                    }
                </div>
                <p className="text-red-700 text-center mt-4">{error}</p>
                <div className="flex justify-center">
                    <button type="submit" className="btn bg-blue-950 text-white px-8 mt-8" disabled={!stripe || !clientSecret}>Pay</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;