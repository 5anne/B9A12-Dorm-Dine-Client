import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";


const RequestedMeals = () => {
    const [reqDetails, setReqDetails] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { users } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get('/requestedMeals')
            .then(data => {
                const tempData = data?.data?.filter(reqData => reqData?.user_email === users?.email)
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
        <>
            <SectionTitle
                subHeading="Requested Meals"
                heading="My Requested Meals"
            ></SectionTitle>
            <div className="min-h-screen">
                <div className="overflow-x-auto w-9/12 mx-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr className="bg-emerald-950 text-gray-200">
                                <td></td>
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
                                    <td>{idx + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.likes}</td>
                                    <td>{data.reviews}</td>
                                    <td>{data.status}</td>
                                    <td><button onClick={() => handleCancel(data)} className="btn text-red-800 flex justify-center"><MdCancel /></button></td>

                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default RequestedMeals;