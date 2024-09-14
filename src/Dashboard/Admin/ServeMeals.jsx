import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaServer } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";

const ServeMeals = () => {
    const [username, setusername] = useState([]);
    const [useremail, setuseremail] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data: reqMeals = [], refetch } = useQuery({
        queryKey: ['reqMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/requestedMeals');
            setUsersData(res.data);
            return res.data;
        }
    })

    console.log(reqMeals);

    const { data: usersNameData = [] } = useQuery({
        queryKey: ['/usersNameData', username],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedMeals/${username}`);
            setUsersData(res.data);
            return res.data;
        }
    })

    const { data: usersEmailData = [] } = useQuery({
        queryKey: ['/usersEmailData', useremail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedMealsEmail/${useremail}`);
            console.log(res.data);
            setUsersData(res.data);
            return res.data;
        }
    })

    console.log(usersNameData);
    console.log(usersEmailData);

    const handleServe = async (data) => {

        console.log(data);
        const serveStatus = 'served';
        const serveData = {
            user_name: data.user_name,
            user_email: data.user_email,
            title: data.title,
            category: data.category,
            image: data.image,
            ingredients: data.ingredients,
            description: data.description,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            post_time: data.post_time,
            likes: parseInt(data.likes),
            reviews: parseInt(data.reviews),
            reviewText: data.reviewText,
            status: serveStatus,
            admin_name: data.admin_name,
            admin_email: data.admin_email
        }

        const res = await axiosSecure.patch(`/requestedMeals/${data._id}`, serveData);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is Served Successfully.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const uname = e.target.username.value;
        if (uname) {
            setusername(uname);
        }

    }

    const handleSubmitEmail = e => {
        e.preventDefault();
        const uemail = e.target.useremail.value;
        console.log(uemail)
        if (uemail) {
            setuseremail(uemail);
        }
    }

    return (
        <>
            <SectionTitle
                subHeading="meals"
                heading="All Requested Meals"
            ></SectionTitle>
            <div className="w-9/12 mx-auto">
                <div className="flex justify-evenly">
                    <form onSubmit={handleSubmit} className="" action="">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" name="username" placeholder="Search by Username" className="bg-gray-300 rounded-lg p-2 border-none my-2 w-full" />

                            <button type="submit" className=""><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg></button>
                        </label></form>
                    <form onSubmit={handleSubmitEmail} className="" action="">
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" name="useremail" placeholder="Search by Useremail" className="bg-gray-300 rounded-lg p-2 border-none my-2 w-full" />
                            <button type="submit" className=""><svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg></button>
                        </label>
                    </form>
                </div>

                <div className="overflow-x-auto mt-8">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead className="text-gray-950 p-2">
                            <tr className="bg-emerald-950 text-gray-300">
                                <td></td>
                                <td>Title</td>
                                <td>User Name</td>
                                <td>User Email</td>
                                <td>Status</td>
                                <td>Serve</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersData?.map((meal, idx) =>
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{meal.title}</td>
                                        <td>{meal.user_name}</td>
                                        <td>{meal.user_email}</td>
                                        <td className="text-red-700">{meal.status}</td>
                                        <td><button onClick={() => handleServe(meal)} className="btn flex justify-center"><FaServer></FaServer></button></td>
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

export default ServeMeals;