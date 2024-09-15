import { useContext } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Helmet } from "react-helmet";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import SectionTitle from "../Home/DietBlog/SectionTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";


const UpcomingMealsPage = () => {

    const { users } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeals');
            return res.data;
        }
    })

    const { data: badgeInfo = [] } = useQuery({
        queryKey: ['badgeInfo', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userInfoEmail/${users?.email}`);
            console.log(res.data[0]);
            return res.data[0];
        }
    })

    const handleLike = async (data) => {

        if (badgeInfo?.userBadge === 'Platinum' || badgeInfo?.userBadge === 'Gold' || badgeInfo?.userBadge === 'Silver') {
            console.log('Inside');
            const upLike = {
                title: data.title,
                category: data.category,
                image: data.image,
                ingredients: data.ingredients,
                description: data.description,
                price: parseFloat(data.price),
                rating: parseFloat(data.rating),
                post_time: data.post_time,
                likes: parseInt(data.likes + 1),
                reviews: parseInt(data.reviews),
                reviewText: data.reviewText,
                status: data.status,
                admin_name: data.admin_name,
                admin_email: data.admin_email
            }

            const res = await axiosSecure.patch(`/upcomingMeals/${data._id}`, upLike);
            if (res.data.modifiedCount > 0) {
                refetch();
            }
        }
        else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: 'You have to subscribe our premium package to like meals!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>
            <Helmet>
                <title>Dorm Dine ~ Upcoming Meals Page</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="pt-24"></div>
            <SectionTitle
                subHeading={"upcoming meals"}
                heading={'Rate & Review: Explore Our Upcoming Menu'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 md:pt-24">
                {
                    meals?.map(mealData => <div key={mealData._id} className="p-10 shadow-2xl rounded-2xl border-2 border-red-300">
                        <div className="flex justify-center"><img className="w-full h-60 rounded-2xl" src={mealData.image} alt="" /></div>
                        <p className="mt-4">#admin: {mealData.admin_name}</p>
                        <h1 className="font-bold text-blue-950 font-display text-xl">{mealData.title}</h1>
                        <p><span className="font-semibold text-gray-950">Desciption:</span> {mealData.description}</p>
                        <p><span className="font-semibold text-gray-950">Category:</span> {mealData.category}</p>
                        <p><span className="font-semibold text-gray-950">Price:</span> ${mealData.price}</p>
                        <div className="flex justify-between">
                            <h2 className="font-semibold text-gray-950">Reviews: {mealData.reviews}</h2>
                            <p className="flex gap-2 items-center"><span className="font-semibold text-gray-950">Rating: </span>{mealData.rating}<FaStar /></p>
                        </div>
                        <button onClick={() => handleLike(mealData)} className="font-semibold text-gray-950 flex gap-2 items-center mt-2 hover:font-extrabold"><FaThumbsUp></FaThumbsUp>{mealData.likes}</button>
                    </div>)
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default UpcomingMealsPage;