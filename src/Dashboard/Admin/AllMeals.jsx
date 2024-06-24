import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import useMeal from "../../Hooks/useMeal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AllMeals = () => {

    const [meals, loading, refetch] = useMeal();
    const [mealsData, setMealsData] = useState([meals]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch('http://localhost:5000/allMeals')
            .then(res => res.json())
            .then(data => setMealsData(data))
    }, [])

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
                    if (loading) {
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
    // console.log(mealsData)
    const handleSort = e => {
        const filter = e.target.value;
        console.log(filter);
        if (filter === 'all') {
            setMealsData(meals);
        }
        else if (filter === 'likes') {
            const sortedData = meals.sort((a, b) => b.likes - a.likes);
            refetch();
            setMealsData(sortedData)
        }
        else if (filter === 'reviews') {
            const sortedData = meals.sort((a, b) => b.reviews - a.reviews);
            refetch();
            setMealsData(sortedData)
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-52 mx-auto mt-16">All Meals</h1>

            <div className="flex gap-4 w-20 mx-auto text-gray-500 mt-14 border-2 p-1 border-teal-900">
                <p>Sort</p>
                <select onChange={handleSort} className="text-black" name="" id="">
                    <option value="all">All</option>
                    <option value="likes">Likes</option>
                    <option value="reviews">Reviews</option>
                </select>
            </div>

            <div className="overflow-x-auto ml-52 mr-8 mt-12">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr className="bg-green-800 text-gray-300">
                            <th></th>
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
                                    <th>{idx + 1}</th>
                                    <td>{meal.title}</td>
                                    <td>{meal.admin_name}</td>
                                    <td>{meal.likes}</td>
                                    <td>{meal.reviews}</td>
                                    <td><Link to={`/dashboard/updateMeal/${meal._id}`}><button className="btn flex justify-center"><FaEdit></FaEdit></button></Link></td>
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

export default AllMeals;