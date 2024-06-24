import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const CheckoutForm = ({ price }) => {
    const { users } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    console.log(price);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })

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
                <div className="flex justify-center">
                    <button type="submit" className="btn bg-blue-950 text-white px-8 mt-8" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                    <p className="text-red-700">{error}</p>
                    {transactionId && <p className="text-green-900">Your Transaction ID: {transactionId}</p>}
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;