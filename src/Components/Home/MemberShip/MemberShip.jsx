import { Link } from "react-router-dom";
import SectionTitle from "../DietBlog/SectionTitle";
import { useEffect, useState } from "react";


const MemberShip = () => {
    const [premium, setPremium] = useState([])
    useEffect(() => {
        fetch('https://dorm-dine-server-site.vercel.app/premiumJson')
            .then(res => res.json())
            .then(data => setPremium(data))
    }, [])
    console.log(premium);
    return (
        <div className="max-w-6xl mx-auto">
            <SectionTitle
                subHeading="Membership"
                heading="Our Premium Packages"
            ></SectionTitle>
            <div className="grid grid-cols-3 gap-8 my-20">
                {
                    premium?.map(pack =>
                        <Link key={pack.id} to={`/checkout/${pack?.badge}`}>
                            <div className="shadow-2xl p-8 hover:border-y-8 border-x-8 rounded-2xl border-red-800">
                                <img className="" src={pack?.image} alt="" />
                                <p className="text-center text-red-700 font-extrabold text-2xl my-4">${pack?.price}.00</p>
                                <div className="flex justify-center"><button className="btn bg-red-950 text-white w-full">Ckeck Out</button></div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default MemberShip;