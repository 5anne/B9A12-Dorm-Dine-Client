import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const AllMeals = () => {

    const [mealsData, setMealsData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMeals');
            setMealsData(res.data);
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
                const res = await axiosSecure.delete(`/allMeals/${meal._id}`);
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

    const handleSort = e => {
        const filter = e.target.value;
        if (filter === 'all') {
            setMealsData(meals);
        }
        else if (filter === 'likes') {
            const sortedData = meals?.sort((a, b) => b.likes - a.likes);
            setMealsData(sortedData)
        }
        else if (filter === 'reviews') {
            const sortedData = meals?.sort((a, b) => b.reviews - a.reviews);
            setMealsData(sortedData)
        }
    }

    return (
        <>
            <SectionTitle
                subHeading="meals"
                heading="All Meals"
            ></SectionTitle>
            <div className="flex flex-col w-10/12 md:w-9/12 mx-auto">
                <div className="flex gap-4 text-gray-500 my-8 border-2 p-1 border-teal-900 w-20 mx-auto">
                    <p>Sort</p>
                    <select onChange={handleSort} className="text-black bg-[#b94e48] bg-opacity-30" name="" id="">
                        <option value="all">All</option>
                        <option value="likes">Likes</option>
                        <option value="reviews">Reviews</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr className="bg-emerald-950 text-gray-300">
                                <td></td>
                                <td>Title</td>
                                <td>Distributor Name</td>
                                <td>Likes</td>
                                <td>Reviews</td>
                                <td>Update</td>
                                <td>Delete</td>
                                <td>View Meal</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mealsData?.map((meal, idx) =>
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{meal.title}</td>
                                        <td>{meal.admin_name}</td>
                                        <td>{meal.likes}</td>
                                        <td>{meal.reviews}</td>
                                        <td><Link to={`/dashboard/updateMeal/${meal._id}`}><button className="btn flex justify-center text-green-900"><FaEdit></FaEdit></button></Link></td>
                                        <td><button onClick={() => handleDelete(meal)} className="btn flex justify-center text-red-800"><FaTrashAlt></FaTrashAlt></button></td>
                                        <td><Link to={`/meal/${meal._id}`}><button className="btn flex justify-center"><FcViewDetails /></button></Link></td>
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

export default AllMeals;