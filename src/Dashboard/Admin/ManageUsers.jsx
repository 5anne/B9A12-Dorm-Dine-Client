import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ManageUsers = () => {
    const [username, setusername] = useState([]);
    const [useremail, setuseremail] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userInfo');
            setUsersData(res.data);
            return res.data;
        }
    })
    console.log(errors);

    const { data: usersNameData = [] } = useQuery({
        queryKey: ['/usersNameData', username],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userInfo/${username}`);
            // console.log(res.data);
            setUsersData(res.data);
            return res.data;
        }
    })

    const { data: usersEmailData = [] } = useQuery({
        queryKey: ['/usersEmailData', useremail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userInfo/${useremail}`);
            // console.log(res.data);
            setUsersData(res.data);
            return res.data;
        }
    })
    console.log(usersNameData);
    console.log(usersEmailData);
    // console.log(useremail);
    const onSubmit = (data, e) => {
        e.preventDefault();
        // console.log(data);
        const uname = data.username;
        const uemail = data.useremail;
        // console.log(uemail);
        if (uname) {
            setusername(uname);
        }
        if (uemail) {
            setuseremail(uemail);
        }
    }

    // console.log(allUsers);
    const handleMakeAdmin = user => {
        console.log(user);
        axiosSecure.patch(`/userInfo/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div>
            <div className="flex flex-col bg-slate-300 shadow-xl p-8 w-11/12 mx-auto">
                <div className="flex justify-center w-full my-10">
                    <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-1/3 mx-auto">Total Users: {allUsers.length}</h1>
                </div>
                <div >
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-12 w-10/12 mx-auto ml-80 mb-12" action="">
                        <label className="input input-bordered flex items-center gap-2">
                            <input  {...register("username")} type="text" placeholder="Search by Username" className="bg-gray-300 rounded-lg p-2 border-none my-2 w-full" />
                            <button type="submit" className="btn"><svg
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
                        <label className="input input-bordered flex items-center gap-2">
                            <input  {...register("useremail")} type="email" placeholder="Search by Useremail" className="bg-gray-300 rounded-lg p-2 border-none my-2 w-full" />
                            <button type="submit" className="btn"><svg
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
                <div className="ml-48 mr-8">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subscription Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    usersData?.map((user, idx) => <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userBadge}</td>
                                        <td>
                                            {user.role === 'admin' ? <p className="font-bold ml-12">Admin</p> : <button onClick={() => handleMakeAdmin(user)} className="btn"><FaUser></FaUser> Make Admin</button>}
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;