import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";


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
        axiosSecure.get('/premiumJson')
            .then(data => {
                console.log(data.data);
                const tempData = data?.data?.find(badgeInfo => badgeInfo.price === price);
                console.log(tempData);
                setBadgeData(tempData);
            })
    }, [price, axiosSecure])

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
                const userData = {
                    name: users.displayName,
                    email: users.email,
                    photo: users.photoURL,
                    userBadge: badgeData.badge
                }
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
                const resss = await axiosSecure.patch(`/userInfo/${users.email}`, userData);
                console.log(resss.data);
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Payment successfully done!!! YOU HAVE GOT {${badgeData.badge}} BADGE!!!`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }
        }
    };

    return (
        <div className="md:w-1/2 md:mx-auto mx-4 mt-8 shadow-2xl border-2 rounded-2xl p-8 bg-[url('https://i.postimg.cc/4Nt9FZjK/vintage-grunge-blue-concrete-texture-studio-wall-background-with-vignette-1258-28374.jpg')]">
            <h1 className="text-center mb-4 text-xl text-gray-200 font-bold border-b-[1px] w-1/2 mx-auto pb-2 border-black border-dashed">Card Info</h1>
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
                    <button type="submit" className="btn bg-blue-950 text-white px-8 mt-8 rounded-3xl" disabled={!stripe || !clientSecret}>Pay</button>
                </div>
                <div className="flex justify-center mt-8 gap-1 items-center">
                    <img className="w-14 h-8" src="https://i.postimg.cc/dt4YFZbg/OIP-16.jpg" alt="" />
                    <img className="w-14 h-8" src="https://i.postimg.cc/K8WhkSvN/amazon-pay-Startup-Talky.jpg" alt="" />
                    <img className="w-14 h-8" src="https://i.postimg.cc/Qx6RwG53/apple-pay-icon-isolated-in-black-editorial-mobile-payment-app-logo-free-vector.jpg" alt="" />
                    <img className="w-14 h-8" src="https://i.postimg.cc/L52cKmNH/Font-Paypal-Logo-768x501.jpg" alt="" />
                    <img className="w-14 h-8" src="https://i.postimg.cc/3xVzrXnf/Visa-Logo-1992-2000-453x255.png" alt="" />
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;