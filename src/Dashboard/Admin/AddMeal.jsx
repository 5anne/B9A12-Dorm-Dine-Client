import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddMeal = () => {
    const { register, handleSubmit } = useForm();
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        const mealData = {

            title: data.title,
            category: data.category,
            image: data.image,
            ingredients: data.ingredients,
            description: data.description,
            price: data.price,
            rating: data.rating,
            post_time: data.postTime,
            likes: data.likes,
            reviews: data.reviews,
            admin_name: data.adminName,
            admin_email: data.adminEmail
        }

        const res = await axiosSecure.post('/allMeals', mealData);
        console.log(res.data);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.title} is added to the All Meals.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="flex flex-col mt-16">
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-52 mx-auto">Add Meal</h1>
            <div className="mt-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center gap-10">
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
                        </div>

                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("rating", { required: true })} type="number" placeholder="5" className="input input-bordered" />
                            </div>

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
    );
};

export default AddMeal;