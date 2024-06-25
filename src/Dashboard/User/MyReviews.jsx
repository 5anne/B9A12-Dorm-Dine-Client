import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyReviews = () => {
    const { users } = useContext(AuthContext);
    const [myData, setMyData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/usersAct')
            .then(data => {
                console.log(data.data);
                const tempData = data.data?.filter(reviewData => reviewData?.user_email === users?.email);
                console.log(tempData);
                setMyData(tempData)
            })
    }, [users?.email])

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
                const res = await axios.delete(`/usersAct/${meal._id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // if (loading) {
                    //     return <div className="flex justify-center mt-20"><span className="loading loading-ring loading-lg"></span></div>
                    // }
                    // refetch();
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
        <div className="mt-16">
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-1/3 mx-auto">My Reviewed Meals</h1>
            <div className="overflow-x-auto mt-14 ml-56 mr-8">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr className="bg-emerald-950 text-gray-200">
                            <th></th>
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
                                <th>{idx + 1}</th>
                                <td>{data.title}</td>
                                <td>{data.likes}</td>
                                <td>{data.reviews}</td>
                                <td>{data.reviewText}</td>
                                <td><Link><button className="btn flex justify-center"><FaEdit></FaEdit></button></Link></td>
                                <td><button onClick={() => handleDelete(data)} className="btn flex justify-center"><FaTrashAlt></FaTrashAlt></button></td>
                                <td><Link><button className="btn flex justify-center"><FcViewDetails /></button></Link></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;