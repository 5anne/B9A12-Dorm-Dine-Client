import { FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";

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
        <>
            <SectionTitle
                subHeading="reviews"
                heading="All Reviews"
            ></SectionTitle>
            <div>
                <div className="overflow-x-auto w-9/12 mx-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr className="bg-emerald-950 text-gray-300">
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
                                        <td><button onClick={() => handleDelete(meal)} className="btn flex justify-center text-red-800"><FaTrashAlt></FaTrashAlt></button></td>
                                        <td><Link to={`/meal/${meal.meals_id}`}><button className="btn flex justify-center"><FcViewDetails /></button></Link></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllReviews;