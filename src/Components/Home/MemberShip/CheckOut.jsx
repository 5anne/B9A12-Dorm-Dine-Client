import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { IoBookmarksSharp } from "react-icons/io5";
import Navbar from "../../Shared/Navbar";
import Footer from "../../Shared/Footer";
import SectionTitle from "../DietBlog/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const CheckOut = () => {
    const badgeData = useLoaderData();
    console.log(badgeData);

    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-28">
                <div className="bg-blue-950 md:w-3/4 lg:w-1/2 md:mx-auto mx-4 mb-8 rounded-xl shadow-2xl p-4 text-white">
                    <div className="md:flex gap-8 items-center">
                        <div className="flex justify-center"><img className="h-52 rounded-full mt-6" src={badgeData.image} alt="" /></div>
                        <div>
                            <p className="text-end font-extrabold text-5xl">${badgeData.price}</p>
                            <h1 className="flex gap-2 items-center font-bold font-display text-2xl"><IoBookmarksSharp />Features</h1>
                            <ol>
                                <li className="flex gap-2 items-start my-1"> <span className="text-2xl"><FcCheckmark /></span> <i>Advanced Menu Planning & Customization</i></li>
                                <li className="flex gap-2 items-start my-1"> <span className="text-2xl"><FcCheckmark /></span> <i>Automated Ordering & Pre-Payment</i></li>
                                <li className="flex gap-2 items-start my-1"> <span className="text-2xl"><FcCheckmark /></span> <i>Priority Support & Integrations</i></li>
                                <li className="flex gap-2 items-start my-1"> <span className="text-2xl"><FcCheckmark /></span> <i>Enhanced Communication & Feedback</i></li>
                                <li className="flex gap-2 items-start my-1"> <span className="text-2xl"><FcCheckmark /></span> <i>In-Depth Reporting & Analytics</i></li>
                            </ol>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button className="btn hover:bg-red-400 px-12 rounded-3xl text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white">Purchase</button>
                    </div>
                </div>
                <SectionTitle
                    subHeading={'payment'}
                    heading={'Pay With Stripe'}
                ></SectionTitle>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={badgeData.price} />
                    </Elements>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default CheckOut;