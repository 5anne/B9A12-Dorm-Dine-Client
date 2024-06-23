import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userInfo');
            return res.data;
        }
    })

    console.log(allUsers);
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
            <div className="flex flex-col">
                <div className="flex justify-evenly w-full my-10">
                    <h2 className="text-center text-black text-3xl">All users</h2>
                    <h2 className="text-center text-black text-3xl">Total Users: {allUsers.length}</h2>
                </div>
                <div className="ml-52 mr-8">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
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
                                    allUsers?.map((user, idx) => <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>Blue</td>
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