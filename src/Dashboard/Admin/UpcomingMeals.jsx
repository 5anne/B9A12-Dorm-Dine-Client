import { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdPublish } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpcomingMeals = () => {

    const [mealsData, setMealsData] = useState([]);
    const { register, handleSubmit } = useForm();
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const result = await axiosPublic.get('/upcomingMeals');
            setMealsData(result.data);
            return result.data;
        }
    })

    console.log(mealsData);

    const handleSort = e => {
        const filter = e.target.value;
        if (filter === 'all') {
            setMealsData(meals);
        }
        else if (filter === 'likes') {
            const sortedData = meals?.sort((a, b) => b.likes - a.likes);
            setMealsData(sortedData);
        }
    }

    const handlePublish = async (meal) => {
        const mealData = {

            title: meal.title,
            category: meal.category,
            image: meal.image,
            ingredients: meal.ingredients,
            description: meal.description,
            price: parseFloat(meal.price),
            rating: parseFloat(meal.rating),
            post_time: meal.post_time,
            likes: parseInt(meal.likes),
            reviews: parseInt(meal.reviews),
            reviewText: meal.reviewText,
            status: meal.status,
            admin_name: meal.admin_name,
            admin_email: meal.admin_email
        }

        const res = await axiosSecure.post('/allMeals', mealData);
        console.log(res.data);
        const response = await axiosSecure.delete(`/upcomingMeals/${meal._id}`);
        console.log(response.data);
        if (res.data.insertedId && response.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${meal.title} has been added to the All Meals.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const result = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const mealData = {

            title: data.title,
            category: data.category,
            image: result.data.data.url,
            ingredients: data.ingredients,
            description: data.description,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            post_time: data.postTime,
            likes: parseInt(data.likes),
            reviews: parseInt(data.reviews),
            reviewText: data.reviewText,
            status: data.status,
            admin_name: data.adminName,
            admin_email: data.adminEmail
        }

        const res = await axiosSecure.post('/upcomingMeals', mealData);
        console.log(res.data);
        if (res.data.insertedId) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is added to the Upcoming Meals.`,
                showConfirmButton: false,
                timer: 1500
            });

        }
    }


    return (
        <div className="w-10/12 md:w-9/12 mx-auto pt-8">
            <h1 className="text-center font-semibold md:text-4xl border-y-2 border-teal-900 border-dashed py-4 md:w-96 mx-auto">Upcoming Meals</h1>

            <div className="flex gap-4 w-20 mx-auto text-gray-500 my-8 border-2 p-1 border-teal-900">
                <p>Sort</p>
                <select onChange={handleSort} className="text-black bg-[#b94e48] bg-opacity-30" name="" id="">
                    <option value="all">All</option>
                    <option value="likes">Likes</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-green-900 text-gray-300">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Admin</th>
                            <th>Category</th>
                            <th>Likes</th>
                            <th>Price($)</th>
                            <th>Publish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mealsData?.map((meal, idx) => <tr key={meal._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={meal.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{meal.title}</div>
                                            <div className="text-sm opacity-50">{meal.ingredients}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {meal.admin_name}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{meal.admin_email}</span>
                                </td>
                                <td>
                                    {meal.category}
                                </td>
                                <td>{meal.likes}</td>
                                <td>{meal.price}</td>
                                <th>
                                    <button onClick={() => handlePublish(meal)} className="btn border-none text-xl bg-[#b94e48] bg-opacity-30 hover:bg-[#b94e48]"><MdPublish /></button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-10"><button className="btn bg-green-900 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Upcoming Meal</button></div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost bg-black text-white absolute right-2 top-2">✕</button>
                    </form>
                    <h1 className="text-center font-semibold md:text-2xl border-y-2 border-yellow-500 border-dashed py-4 md:w-96 mx-auto mt-8">Add an Upcoming Meal</h1>
                    <div className="mt-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Title <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category <span className="text-red-700">*</span></span>
                                        </label>
                                        <select {...register("category", { required: true })} type="text" className="input input-bordered rounded-none border-teal-900">
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Image <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("image", { required: true })} type="file" placeholder="https://i.postimg.cc" className="input input-bordered rounded-none border-teal-900 pt-2" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Ingredients <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("ingredients", { required: true })} type="text" placeholder="e.g - Chicken, Yogurt, Ginger-garlic paste,... etc" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Description <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("description", { required: true })} type="text" placeholder="Description" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price ($)<span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("price", { required: true })} type="number" placeholder="100" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Rating <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("rating", { required: true })} type="number" placeholder="5" className="input input-bordered rounded-none border-teal-900" />
                                    </div>
                                </div>

                                <div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Post Time <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("postTime", { required: true })} type="datetime-local" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Likes <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("likes", { required: true })} type="number" placeholder="Likes" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Reviews <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("reviews", { required: true })} type="number" placeholder="Reviews" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Write Review</span>
                                        </label>
                                        <input {...register("reviewText")} type="text" placeholder="Write reviews" className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Status</span>
                                        </label>
                                        <input {...register("status")} type="text" placeholder="e.g - Available/Unavailable/Added/Upcoming/Requested/Served/..." className="input input-bordered rounded-none border-teal-900" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Admin Name <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("adminName")} defaultValue={users?.displayName} className="input input-bordered rounded-none border-teal-900" readOnly />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Admin Email <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("adminEmail")} defaultValue={users?.email} className="input input-bordered rounded-none border-teal-900" readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <input type="submit" className="btn  bg-teal-950 text-white" />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UpcomingMeals;