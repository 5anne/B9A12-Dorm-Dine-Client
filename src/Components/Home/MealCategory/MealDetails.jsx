import { Helmet } from "react-helmet";
import Footer from "../../Shared/Footer";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import axios from "axios";


const MealDetails = () => {
    const { users } = useContext(AuthContext);
    const [usersData, setUsersData] = useState(false);
    const [badgeInfo, setBadgeInfo] = useState([])
    const details = useLoaderData();

    const { _id, title, image, admin, description, ingredients, post_time, rating, likeCount, review } = details;

    useEffect(() => {
        axios.get('https://dorm-dine-server-site.vercel.app/userInfo')
            .then(data => {
                console.log(data.data);
                const tempUserData = data.data?.find(singledata => singledata.email === users.email);
                // console.log(tempUserData);
                setBadgeInfo(tempUserData);
                if (tempUserData?.userBadge === 'Platinum' || tempUserData?.userBadge === 'Gold' || tempUserData?.userBadge === 'Silver') {
                    setUsersData(true);
                    // console.log(tempUserData?.userBadge)
                }
                else {
                    setUsersData(false);
                }
            })
    }, [users?.email])
    // console.log(usersData);

    const handleReview = e => {
        e.preventDefault();
        console.log(e.target.review.value);
        const reviewValue = e.target.review.value;
        if (users) {
            if (review) {
                const upReview = {
                    _id,
                    review: review + 1,
                    reviewText: reviewValue
                }

                fetch(`https://dorm-dine-server-site.vercel.app/mealJson/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(upReview)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
            }
        }
    }

    // const handleLike = e => {
    //     console.log(e);
    //     e.preventDefault();
    //     if (users) {
    //         const upLike = {
    //             _id,
    //             likeCount: likeCount + 1
    //         }
    //         fetch(`https://dorm-dine-server-site.vercel.app/mealJson/${_id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             body: JSON.stringify(upLike)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data)
    //             })
    //     }
    // }

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
                        <img src={image} alt="" />
                        <p className="text-gray-400 mt-4"><span className="text-gray-200 font-semibold">Admin:</span> {admin}</p>
                        <p className="text-gray-400"><span className="text-gray-200 font-semibold">Description:</span> {description}</p>
                        <p className="text-gray-400"><span className="text-gray-200 font-semibold">Ingredients:</span>
                            {
                                ingredients?.map((ingradient, idx) => <ul key={idx}><li className="ml-14">{idx + 1}) {ingradient}</li></ul>)
                            }</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-gray-400"><span className="text-gray-200 font-semibold">Posted At:</span> {post_time}</p>
                            <p className="text-gray-400"><span className="text-gray-200 font-semibold">Rating:</span> {rating}
                                <Rating style={{ width: 60 }} value={rating} readOnly />
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="w-10 hover:font-bold p-1 rounded-lg flex gap-2 items-center">Like<img src="https://i.postimg.cc/h4MS6ZmF/direction-14871509.png" alt="" />{likeCount}</button>
                            <div>
                                <button className="btn bg-red-800 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Request</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <h3 className="font-bold bg-red-900 p-4 rounded-lg text-lg">Your Badge: {badgeInfo?.userBadge}</h3>
                                        {
                                            usersData ?
                                                <p className="py-4 flex justify-center"><button className="btn border-red-800">Sent Request</button></p> :
                                                <p className="text-center text-red-800 mt-4">To Sent Request you have to Check Out Premium Package!!</p>
                                        }
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        <div className="mb-10">
                            <form onSubmit={handleReview} action="">
                                <h2 className="my-4">Total Review: {review}</h2>
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