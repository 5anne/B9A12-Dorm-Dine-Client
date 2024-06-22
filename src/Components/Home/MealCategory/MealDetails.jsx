import { Helmet } from "react-helmet";
import Footer from "../../Shared/Footer";
import { useContext } from "react";
import Navbar from "../../Shared/Navbar";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLoaderData } from "react-router-dom";


const MealDetails = () => {
    const { users } = useContext(AuthContext);
    // const [details, setDetails] = useState([]);
    // const { _id } = useParams();
    // console.log(_id);
    const details = useLoaderData();


    // useEffect(() => {
    //     fetch(`http://localhost:5000/mealJson/${_id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setDetails(data);
    //         })
    // }, [_id])

    const { _id, title, image, admin, description, ingredients, post_time, rating, likeCount, review } = details;

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

                fetch(`http://localhost:5000/mealJson/${_id}`, {
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

    const handleLike = e => {
        console.log(e);
        e.preventDefault();
        if (users) {
            const upLike = {
                _id,
                likeCount: likeCount + 1
            }
            fetch(`http://localhost:5000/mealJson/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(upLike)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
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
                            <button onClick={handleLike} className="w-10 hover:font-bold p-1 rounded-lg flex gap-2 items-center">Like<img src="https://i.postimg.cc/h4MS6ZmF/direction-14871509.png" alt="" />{likeCount}</button>
                            <button className="btn bg-red-800 text-white">Request</button>
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