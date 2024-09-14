import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEdit, FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";


const MyReviews = () => {
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: myData = [], refetch } = useQuery({
        queryKey: ['myData', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/usersAct/${users?.email}`);
            console.log(res.data);
            return res.data;
        }
    })

    const handleEdit = async (e) => {
        e.preventDefault();
        const id = e.target.itemId.value;
        const reviewValue = e.target.editedReview.value;
        console.log(id);
        console.log(reviewValue);
        const updatedReview = { reviewText: reviewValue }
        const res = await axiosSecure.patch(`/usersAct/${id}`, updatedReview);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                title: "Updated",
                text: 'Review has been updated!',
                icon: "success"
            });
        }
    }

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
                    const upReview = {
                        likes: meal.likes,
                        reviews: parseInt(meal.reviews - 1),
                    }
                    const response = await axiosSecure.patch(`/allMeals/${meal.meals_id}`, upReview);
                    console.log(response.data);
                    if (response.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `${meal.title} has been deleted`,
                            icon: "success"
                        });
                    }
                }
            }
        }
        );
    }

    return (
        <>
            <SectionTitle
                subHeading="reviews"
                heading="My Reviewed Meals"
            ></SectionTitle>
            <div className="">
                <div className="overflow-x-auto w-9/12 mx-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr className="bg-emerald-950 text-gray-200">
                                <td></td>
                                <td>Title</td>
                                <td>Likes</td>
                                <td>Reviews</td>
                                <td>My Review</td>
                                <td>Edit</td>
                                <td>Delete</td>
                                <td>View Meal</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myData?.map((data, idx) => <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.likes}</td>
                                    <td>{data.reviews}</td>
                                    <td>{data.reviewText}</td>
                                    <td>
                                        <button className="btn flex justify-center text-green-800" onClick={() => document.getElementById('my_modal_3').showModal()}><FaEdit></FaEdit></button>
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <h3 className="font-semibold text-lg flex items-center gap-2">Edit Review <FaUserEdit></FaUserEdit></h3>
                                                <form onSubmit={handleEdit} action="">
                                                    <input
                                                        type="hidden"
                                                        name="itemId"
                                                        defaultValue={data._id}
                                                    />
                                                    <input
                                                        type="text"
                                                        name="editedReview"
                                                        placeholder="Review"
                                                        defaultValue={data.reviewText}
                                                        className="textarea textarea-bordered textarea-xs w-full mt-2" required></input>
                                                    <div className="flex justify-center mt-3">
                                                        <input type="submit" className="btn  bg-teal-950 text-white" />
                                                    </div>
                                                </form>
                                            </div>
                                        </dialog>
                                    </td>
                                    <td><button onClick={() => handleDelete(data)} className="btn flex justify-center text-red-800"><FaTrashAlt></FaTrashAlt></button></td>
                                    <td><Link to={`/meal/${data.meals_id}`}><button className="btn flex justify-center"><FcViewDetails /></button></Link></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default MyReviews;