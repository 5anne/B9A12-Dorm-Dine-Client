import { FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useMeal from "../../Hooks/useMeal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AllReviews = () => {
    const [review, setReview] = useState([]);
    const [meals, isPending, refetch] = useMeal();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const result = meals?.filter(meal => meal.reviews > 0)
        setReview(result);
    }, [meals])

    const handleDelete = (meal) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/allMeals/${meal._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    if (isPending) {
                        return <div className="flex justify-center mt-20"><span className="loading loading-ring loading-lg"></span></div>
                    }
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${meal.title} has been deleted`,
                        icon: "success"
                    });
                }
            }
        }
        );
    }

    return (
        <div>
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-96 mx-auto mt-16">All Reviews</h1>

            <div className="overflow-x-auto ml-52 mr-8 mt-12">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr className="bg-green-800 text-gray-300">
                            <th></th>
                            <td>Title</td>
                            <td>Latest Review</td>
                            <td>Likes</td>
                            <td>Reviews</td>
                            <td>Delete</td>
                            <td>View Meal</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            review?.map((meal, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{meal.title}</td>
                                    <td>{meal.reviewText}</td>
                                    <td>{meal.likes}</td>
                                    <td>{meal.reviews}</td>
                                    <td><button onClick={() => handleDelete(meal)} className="btn flex justify-center"><FaTrashAlt></FaTrashAlt></button></td>
                                    <td><Link to={`/meal/${meal._id}`}><button className="btn flex justify-center"><FcViewDetails /></button></Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;