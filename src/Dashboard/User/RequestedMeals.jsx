import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";


const RequestedMeals = () => {
    const [reqDetails, setReqDetails] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { users } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get('http://localhost:5000/requestedMeals')
            .then(data => {
                console.log(data.data);
                const tempData = data?.data?.filter(reqData => reqData?.user_email === users?.email)
                console.log(tempData);
                setReqDetails(tempData);
            })
    })

    const handleCancel = (meal) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/requestedMeals/${meal._id}`);
                console.log(res.data);
                if (res.data?.deletedCount > 0) {
                    Swal.fire({
                        title: "Canceled!",
                        text: `${meal.title} has been canceled`,
                        icon: "success"
                    });
                }
            }
        }
        );
    }

    return (
        <div className="mt-16">
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-1/3 mx-auto">My Requested Meals</h1>
            <div className="overflow-x-auto mt-14 ml-56 mr-8">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr className="bg-emerald-950 text-gray-200">
                            <th></th>
                            <td>Title</td>
                            <td>Likes</td>
                            <td>Reviews</td>
                            <td>Status</td>
                            <td>Cancel</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reqDetails?.map((data, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{data.title}</td>
                                <td>{data.likes}</td>
                                <td>{data.reviews}</td>
                                <td>{data.status}</td>
                                <td><button onClick={() => handleCancel(data)} className="btn flex justify-center"><MdCancel /></button></td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;