import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UserProfile = () => {
    const { users } = useContext(AuthContext);
    const [badgeInfo, setBadgeInfo] = useState([])
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosSecure.get('http://localhost:5000/userInfo')
            .then(data => {
                console.log(data.data);
                const tempUserData = data.data?.find(singledata => singledata?.email === users?.email);
                setBadgeInfo(tempUserData);
            })
    }, [axiosSecure, users?.email])

    return (
        <div className="py-16">
            <div className="bg-slate-300 shadow-xl p-8 w-1/2 mx-auto">
                <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-52 mx-auto">My Profile</h1>
                <div>
                    <div className="flex justify-center rounded-full my-8">
                        <img className="w-44" src={users?.photoURL} alt="" />
                    </div>
                    <p className="text-center"><span className="font-semibold">Name:</span> {users?.displayName}</p>
                    <p className="text-center"><span className="font-semibold">Email:</span> {users?.email}</p>
                    <p className="text-center"><span className="font-semibold">Badge:</span> {badgeInfo?.userBadge}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
