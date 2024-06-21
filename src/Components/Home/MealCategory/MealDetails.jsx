import { Helmet } from "react-helmet";
import Footer from "../../Shared/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


const MealDetails = () => {
    const [details, setDetails] = useState([]);
    const [singleMeal, setSingleMeal] = useState([]);
    const { id } = useParams();
    const idInt = parseInt(id);

    useEffect(() => {
        fetch('/meal.json')
            .then(res => res.json())
            .then(data => {
                setDetails(data);
                const tempDetails = details?.find(detail => detail.id === idInt);
                setSingleMeal(tempDetails);
            })
    }, [details, idInt])

    return (
        <div>
            <Helmet>
                <title>Dorm Dine ~ Meal Details || {`singleMeal?.title`}</title>
            </Helmet>
            <Navbar></Navbar>

            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.postimg.cc/QM6rKQtw/sushi-rolls-table-with-mokc-up-23-2148373268.avif)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content">
                    <div className="max-w-md mt-32">
                        <h1 className="text-2xl mb-4">{singleMeal?.title}</h1>
                        <img src={singleMeal?.image} alt="" />
                        <p className="text-gray-400 mt-4"><span className="text-gray-200 font-semibold">Admin:</span> {singleMeal?.admin}</p>
                        <p className="text-gray-400"><span className="text-gray-200 font-semibold">Description:</span> {singleMeal?.description}</p>
                        <p className="text-gray-400"><span className="text-gray-200 font-semibold">Ingredients:</span>
                            {
                                singleMeal?.ingredients?.map((ingradient, idx) => <ul key={idx}><li className="ml-14">{idx + 1}) {ingradient}</li></ul>)
                            }</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-gray-400"><span className="text-gray-200 font-semibold">Posted At:</span> {singleMeal?.post_time}</p>
                            <p className="text-gray-400"><span className="text-gray-200 font-semibold">Rating:</span> {singleMeal?.rating}
                            <Rating style={{ width: 60 }} value={singleMeal?.rating}  readOnly/>
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="w-10 hover:font-bold p-1 rounded-lg flex gap-2 items-center">Like<img src="https://i.postimg.cc/h4MS6ZmF/direction-14871509.png" alt="" /></button>
                            <button className="btn bg-red-800 text-white">Request</button>
                        </div>
                        <div className="mb-10">
                            <h2 className="my-4">Total Review:</h2>
                            <input type="text" placeholder="Write Review:" className="input input-bordered input-lg w-full bg-opacity-20 h-32" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default MealDetails;