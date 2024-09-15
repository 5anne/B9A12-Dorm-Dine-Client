import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AdminProfile = () => {
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: badgeInfo = [] } = useQuery({
        queryKey: ['badgeInfo', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userInfoEmail/${users?.email}`);
            return res.data[0];
        }
    })

    const { data: mealCount = [] } = useQuery({
        queryKey: ['mealCount', users?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/allMealsEmail/${users?.email}`);
            console.log(result.data.length);
            return result.data;
        }
    })

    return (
        <div className="py-16">
            <div className="bg-green-950 bg-opacity-40 shadow-xl p-8 w-3/4 lg:w-1/2 mx-auto">
                <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-52 mx-auto">My Profile</h1>
                <div>
                    <div className="flex justify-center rounded-full my-8">
                        <img className="w-44" src={users?.photoURL} alt="" />
                    </div>
                    <p className="text-center"><span className="font-semibold">Name:</span> {users?.displayName}</p>
                    <p className="text-center"><span className="font-semibold">Email:</span> {users?.email}</p>
                    <p className="text-center"><span className="font-semibold">Number of Meals Added:</span> {mealCount.length}</p>
                    <p className="text-center"><span className="font-semibold">Badge:</span> {badgeInfo?.userBadge}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;