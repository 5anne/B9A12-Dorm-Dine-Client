import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMeal = () => {
    const { register, handleSubmit } = useForm();
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        console.log(data.image[0]);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data.data.url);
        if (res.data.success) {
            const mealData = {

                title: data.title,
                category: data.category,
                image: res.data.data.url,
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
            const result = await axiosSecure.post('/allMeals', mealData);
            console.log(result.data);
            if (result.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} is added to the All Meals.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div className="flex flex-col pt-16 w-9/12 mx-auto">
            <h1 className="text-center font-semibold text-4xl border-y-2 border-teal-900 border-dashed p-6 md:w-96 mx-auto">Add Meal</h1>
            <div className="mt-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="lg:flex justify-center gap-10">
                        <div className="flex-1">
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

                        <div className="flex-1">

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
                                <input {...register("status")} type="text" placeholder="Added/Upcoming/Requested/Served" className="input input-bordered rounded-none border-teal-900" />
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

                    <div className="flex justify-center my-8">
                        <input type="submit" className="btn  bg-teal-950 text-white" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMeal;