import { Helmet } from "react-helmet";
import Footer from "../../Shared/Footer";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MealDetails = () => {

    const { users } = useContext(AuthContext);
    const [usersData, setUsersData] = useState(false);
    const [badgeInfo, setBadgeInfo] = useState([])
    const details = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { _id, title, category, image, description, ingredients, price, rating, post_time, likes, reviews, reviewText, status, admin_name, admin_email } = details;

    useEffect(() => {
        axiosSecure.get('http://localhost:5000/userInfo')
            .then(data => {
                const tempUserData = data.data?.find(singledata => singledata?.email === users?.email);
                setBadgeInfo(tempUserData);
                if (tempUserData?.userBadge === 'Platinum' || tempUserData?.userBadge === 'Gold' || tempUserData?.userBadge === 'Silver') {
                    setUsersData(true);
                }
                else {
                    setUsersData(false);
                }
            })
    }, [axiosSecure, users?.email])

    const handleReview = async (e) => {
        e.preventDefault();
        const reviewValue = e.target.review.value;
        if (users) {
            if (reviewValue) {
                const upReview = {
                    title: title,
                    category: category,
                    image: image,
                    ingredients: ingredients,
                    description: description,
                    price: parseFloat(price),
                    rating: parseFloat(rating),
                    post_time: post_time,
                    likes: parseInt(likes),
                    reviews: parseInt(reviews + 1),
                    reviewText: reviewValue,
                    status: status,
                    admin_name: admin_name,
                    admin_email: admin_email
                }

                const postReview = {
                    meals_id: _id,
                    user_name: users.displayName,
                    user_email: users.email,
                    title: title,
                    image: image,
                    ingredients: ingredients,
                    description: description,
                    post_time: post_time,
                    likes: likes,
                    reviews: parseInt(reviews + 1),
                    reviewText: reviewValue,
                    status: status,
                    admin_name: admin_name,
                    admin_email: admin_email
                }

                const res = await axiosSecure.patch(`/allMeals/${_id}`, upReview);
                console.log(res.data);
                const result = await axiosSecure.post('/usersAct', postReview)
                if (res.data.modifiedCount > 0 && result.data.insertedId) {
                    location.reload();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Review posted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }
    }

    const handleLike = async (e) => {
        console.log(e);
        if (users) {
            const upLike = {
                title: title,
                category: category,
                image: image,
                ingredients: ingredients,
                description: description,
                price: parseFloat(price),
                rating: parseFloat(rating),
                post_time: post_time,
                likes: parseInt(likes + 1),
                reviews: parseInt(reviews),
                reviewText: reviewText,
                status: status,
                admin_name: admin_name,
                admin_email: admin_email
            }

            const res = await axiosSecure.patch(`/allMeals/${_id}`, upLike);
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                // e.target.reset();
                location.reload();
            }
        }
        else {
            navigate('/login');
        }
    }

    const handleRequest = () => {
        navigate('/login');
    }

    const handleSentRequest = async (e) => {
        console.log(e);
        const currentStatus = 'requested';
        if (users) {
            const reqMeals = {
                user_name: users.displayName,
                user_email: users.email,
                title: title,
                category: category,
                image: image,
                ingredients: ingredients,
                description: description,
                price: parseFloat(price),
                rating: parseFloat(rating),
                post_time: post_time,
                likes: parseInt(likes),
                reviews: parseInt(reviews),
                reviewText: reviewText,
                status: currentStatus,
                admin_name: admin_name,
                admin_email: admin_email
            }

            const res = await axiosSecure.post('/requestedMeals', reqMeals);
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${title} is added to the Requested Meals.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <Helmet>
                <title>Dorm Dine ~ Meal Details || {`title`}</title>
            </Helmet>
            <Navbar></Navbar>

            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.postimg.cc/QM6rKQtw/sushi-rolls-table-with-mokc-up-23-2148373268.avif)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content">
                    <div className="max-w-md mt-32">
                        <h1 className="text-2xl mb-4">{title}</h1>
                        <img src={details?.image} alt="" />
                        <p className="text-gray-400 mt-4"><span className="text-gray-200 font-semibold">Admin:</span> {admin_name}</p>
                        <p className="text-gray-400"><span className="text-gray-200 font-semibold">Description:</span> {description}</p>
                        <p className="text-gray-400"><span className="text-gray-200 font-semibold">Ingredients: </span>
                            {ingredients}</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-gray-400"><span className="text-gray-200 font-semibold">Posted At:</span> {post_time}</p>
                            <p className="text-gray-400"><span className="text-gray-200 font-semibold">Rating:</span> {rating}
                                <Rating style={{ width: 60 }} value={rating} readOnly />
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button onClick={handleLike} className="w-10 hover:font-bold p-1 rounded-lg flex gap-2 items-center">Like<img src="https://i.postimg.cc/h4MS6ZmF/direction-14871509.png" alt="" />{likes}</button>
                            <div>
                                {
                                    users ?
                                        <button className="btn bg-red-800 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Request</button> :
                                        <button onClick={handleRequest} className="btn bg-red-800 text-white">Request</button>
                                }
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold bg-red-900 p-4 rounded-lg text-lg mt-5">Your Badge: {badgeInfo?.userBadge}</h3>
                                        {
                                            usersData ?
                                                <p className="py-4 flex justify-center"><button onClick={handleSentRequest} className="btn border-red-800">Sent Request</button></p> :
                                                <p className="text-center text-red-800 mt-4">To Sent Request you have to Check Out Premium Package!!</p>
                                        }
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        <div className="mb-10">
                            <form onSubmit={handleReview} action="">
                                <h2 className="my-4">Total Review: {reviews}</h2>
                                <input type="text" name="review" placeholder="Write Review:" className="input input-bordered input-lg w-full bg-opacity-20 h-32" />
                                <div className="flex justify-center mt-8"><button className="btn">Post Review</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default MealDetails;