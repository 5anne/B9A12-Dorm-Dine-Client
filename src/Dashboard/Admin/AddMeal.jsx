
//title, category, image,
// ingredients, description, price, rating, post time, likes, reviews,
// admin name, and email. onSubmit={handleSubmit(onSubmit)}

import { useForm } from "react-hook-form";

const AddMeal = () => {
    const { register, handleSubmit } = useForm()
    return (
        <div className="flex flex-col mt-16">
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-52 mx-auto">Add Meal</h1>
            <div className="mt-12">
                <form >
                    <div className="flex justify-center gap-10">
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("title")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category <span className="text-red-700">*</span></span>
                                </label>
                                <select {...register("category")} className="input input-bordered">
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("image")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Ingredients <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("ingredients")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("description")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("price")} className="input input-bordered" />
                            </div>
                        </div>

                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Rating <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("rating")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Post Time <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("postTime")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Likes <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("likes")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Reviews <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("reviews")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Admin Name <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("adminName")} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Admin Email <span className="text-red-700">*</span></span>
                                </label>
                                <input {...register("adminEmail")} className="input input-bordered" />
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