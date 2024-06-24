import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckOut = () => {
    const badgeData = useLoaderData();
    console.log(badgeData);

    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={badgeData.price} />
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;