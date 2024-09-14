import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";

const ManageUsers = () => {
    const [username, setusername] = useState([]);
    const [useremail, setuseremail] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userInfo');
            setUsersData(res.data);
            return res.data;
        }
    })

    const { data: usersNameData = [] } = useQuery({
        queryKey: ['/usersNameData', username],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userInfo/${username}`);
            setUsersData(res.data);
            return res.data;
        }
    })

    const { data: usersEmailData = [] } = useQuery({
        queryKey: ['/usersEmailData', useremail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userInfoEmail/${useremail}`);
            console.log(res.data);
            setUsersData(res.data);
            return res.data;
        }
    })
    console.log(usersNameData);
    console.log(usersEmailData);

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
        <>
            <SectionTitle
                subHeading="users"
                heading="All Users"
            ></SectionTitle>
            <div className="w-9/12 mx-auto">
                <div className="flex flex-col shadow-xl px-4">

                    <div className="flex justify-around mb-8">
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
                    <h1 className="text-center font-semibold text-lg mb-4 uppercase">Total Users: {allUsers.length}</h1>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className="bg-emerald-950 text-white">
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
                                                {user.role === 'admin' ? <p className="font-bold ml-12">Admin</p> : <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#b94e48] border-none text-gray-200 py-1 bg-opacity-60"><FaUser></FaUser> Make Admin</button>}
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default ManageUsers;