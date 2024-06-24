// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdPublish } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";


const UpcomingMeals = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('http://localhost:5000/upcomingMeals')
            .then(data => setMeals(data.data))
    }, [axiosSecure])
    console.log(meals);

    const handlePublish = async (meal) => {
        console.log(meal)
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
        const respons = await axiosSecure.delete(`/upcomingMeals/${meal._id}`);
        console.log(respons.data);
        if (res.data.insertedId) {
            if (!loading) {
                setLoading(true);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${meal.title} is added to the All Meals.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    const onSubmit = async (data) => {
        console.log(data);
        const mealData = {

            title: data.title,
            category: data.category,
            image: data.image,
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
        <div>
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-96 mx-auto mt-16">Upcoming Meals</h1>

            <div className="overflow-x-auto ml-52 mt-16">
                <table className="table">
                    {/* head */}
                    <thead className="bg-green-800 text-gray-300">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Admin</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Publish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meals?.map((meal, idx) => <tr key={meal._id}>
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
                                <td>{meal.description}</td>
                                <td>
                                    {meal.category}
                                </td>
                                <td>{meal.status}</td>
                                <td>{meal.price}</td>
                                <th>
                                    <button onClick={() => handlePublish(meal)} className="btn text-xl hover:bg-green-800"><MdPublish /></button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-10"><button className="btn bg-green-800 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Upcoming Meal</button></div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost bg-black text-white absolute right-2 top-2">✕</button>
                    </form>
                    <h1 className="text-center font-semibold text-2xl border-b-2 border-yellow-500 pb-4 w-96 mx-auto mt-8">Add an Upcoming Meal</h1>
                    <div className="mt-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Title <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Category <span className="text-red-700">*</span></span>
                                        </label>
                                        <select {...register("category", { required: true })} type="text" className="input input-bordered">
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Image <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("image", { required: true })} type="url" placeholder="https://i.postimg.cc" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Ingredients <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("ingredients", { required: true })} type="text" placeholder="e.g - Chicken, Yogurt, Ginger-garlic paste,... etc" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Description <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("description", { required: true })} type="text" placeholder="Description" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price ($)<span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("price", { required: true })} type="number" placeholder="100" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Rating <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("rating", { required: true })} type="number" placeholder="5" className="input input-bordered" />
                                    </div>
                                </div>

                                <div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Post Time <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("postTime", { required: true })} type="datetime-local" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Likes <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("likes", { required: true })} type="number" placeholder="Likes" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Reviews <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("reviews", { required: true })} type="number" placeholder="Reviews" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Write Review</span>
                                        </label>
                                        <input {...register("reviewText")} type="text" placeholder="Write reviews" className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Status</span>
                                        </label>
                                        <input {...register("status")} type="text" placeholder="e.g - Available/Unavailable/Added/Upcoming/Requested/Served/..." className="input input-bordered" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Admin Name <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("adminName")} defaultValue={users?.displayName} className="input input-bordered" readOnly />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Admin Email <span className="text-red-700">*</span></span>
                                        </label>
                                        <input {...register("adminEmail")} defaultValue={users?.email} className="input input-bordered" readOnly />
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