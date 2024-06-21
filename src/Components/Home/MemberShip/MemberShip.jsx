import { Link } from "react-router-dom";
import SectionTitle from "../DietBlog/SectionTitle";
import { useEffect, useState } from "react";


const MemberShip = () => {
    const [premium, setPremium] = useState([])
    useEffect(() => {
        fetch('/premium.json')
            .then(res => res.json())
            .then(data => setPremium(data))
    }, [])
    const { platinum, gold, silver } = premium;
    return (
        <div className="max-w-6xl mx-auto">
            <SectionTitle
                subHeading="Membership"
                heading="Our Premium Packages"
            ></SectionTitle>
            <div className="grid grid-cols-3 gap-8 my-20">
                <Link to={`/checkout/${platinum}`}>
                    <div className="shadow-2xl p-8 hover:border-y-8 border-x-8 rounded-2xl border-red-800">
                        <img className="" src="https://i.postimg.cc/br70wpv6/Night-of-Hope-Platinum-Sponsor.jpg" alt="" />
                        <p className="text-center text-red-700 font-extrabold text-2xl my-4">$100.00</p>
                        <div className="flex justify-center"><button className="btn bg-red-950 text-white w-full">Ckeck Out</button></div>
                    </div>
                </Link>
                <Link to={`/checkout/${gold}`}>
                    <div className="shadow-2xl p-8 hover:border-y-8 border-x-8 rounded-2xl border-red-800">
                        <img className="" src="https://i.postimg.cc/xCtnQ162/OIP-9.jpg" alt="" />
                        <p className="text-center text-red-700 font-extrabold text-2xl my-4">$80.00</p>
                        <div className="flex justify-center"><button className="btn bg-red-950 text-white w-full">Ckeck Out</button></div>
                    </div>
                </Link>
                <Link to={`/checkout/${silver}`}>
                    <div className="shadow-2xl p-8 hover:border-y-8 border-x-8 rounded-2xl border-red-800">
                        <img className="" src="https://i.postimg.cc/mD2WmGB6/Silver-Sponsor.png" alt="" />
                        <p className="text-center text-red-700 font-extrabold text-2xl my-4">$60.00</p>
                        <div className="flex justify-center"><button className="btn bg-red-950 text-white w-full">Ckeck Out</button></div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MemberShip;