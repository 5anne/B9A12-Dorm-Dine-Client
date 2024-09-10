import { FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllReviews = () => {

    const axiosSecure = useAxiosSecure();

    const { data: reviewData = [], refetch } = useQuery({
        queryKey: ['reviewData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/usersAct');
            console.log(res.data);
            return res.data;
        }
    })

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
                const res = await axiosSecure.delete(`/usersAct/${meal._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
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
                            <td></td>
                            <td>User Info</td>
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
                            reviewData?.map((meal, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {meal.user_name}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{meal.user_email}</span>
                                    </td>
                                    <td>{meal.title}</td>
                                    <td>{meal.reviewText}</td>
                                    <td>{meal.likes}</td>
                                    <td>{meal.reviews}</td>
                                    <td><button onClick={() => handleDelete(meal)} className="btn flex justify-center"><FaTrashAlt></FaTrashAlt></button></td>
                                    <td><Link to={`/meal/${meal.meals_id}`}><button className="btn flex justify-center"><FcViewDetails /></button></Link></td>
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