import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

//user name, image, email, and badges (Bronze, Gold).
const UserProfile = () => {
    const { users } = useContext(AuthContext);
    const [badgeInfo, setBadgeInfo] = useState([])

    useEffect(() => {
        axios.get('https://dorm-dine-server-site.vercel.app/userInfo')
            .then(data => {
                console.log(data.data);
                const tempUserData = data.data?.find(singledata => singledata?.email === users?.email);
                // console.log(tempUserData);
                setBadgeInfo(tempUserData);
            })
    }, [users?.email])

    return (
        <div className="py-16">
            <div className="bg-slate-300 shadow-xl p-8 w-1/2 mx-auto">
                <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-52 mx-auto">My Profile</h1>
                <div>
                    <div className="flex justify-center rounded-full my-8">
                        <img src={users?.photoURL} alt="" />
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