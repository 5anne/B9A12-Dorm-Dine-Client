import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data, e) => {
        e.preventDefault();

        const imageFile = { image: data?.photo[0] }
        const result = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const name = data.name;
        const photo = result.data.data.url;
        const email = data.email;
        const password = data.password;

        setSuccess('');

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Successfully Registered!');

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(async () => {
                        const userInfo = { name, email, photo, userBadge: 'Bronze' };

                        const response = await axiosPublic.post('/userInfo', userInfo);
                        console.log(response.data.insertedId);
                        if (response.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User has been created successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(error => console.error(error))

                e.target.reset();
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                console.log(result.user);
                const name = result?.user?.displayName;
                const email = result?.user?.email;
                const photo = result?.user?.photoURL;
                const userInfo = { name, email, photo, userBadge: 'Bronze' };

                const response = await axiosPublic.post('/userInfo', userInfo);
                console.log(response.data.insertedId);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User has been created successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <div>
            <Helmet>
                <title>Dorm Dine ~ Register</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="px-4 pt-28 md:pt-48">
                <div className="flex justify-center bg-red-950 bg-opacity-50 md:w-1/2 p-8 mx-auto shadow-2xl">

                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <h1 className="text-2xl text-center font-bold">Register Now!</h1> <br />

                        <input {...register("name", { required: true })} type="text" placeholder="Name" className="bg-gray-300 border-2 p-2 border-none my-2 w-full" /> <br />
                        {errors.name && <span className="text-red-700">Name is required</span>}

                        <input {...register("photo", { required: true })} type="file" placeholder="https://i.postimg.cc" className="bg-gray-300 border-2 p-2 border-none my-2 w-full" /> <br />
                        {errors.photo && <span className="text-red-700">photo is required</span>}

                        <input {...register("email", { required: true })} type="email" placeholder="Email" className="bg-gray-300 border-2 p-2 border-none my-2 w-full" /> <br />
                        {errors.email && <span className="text-red-700">Email is required</span>}

                        <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)[a-zA-Z\d]+/ })} type="password" placeholder="******" className="bg-gray-300 border-2 p-2 border-none my-2 w-full" /> <br />
                        {errors.password?.type === 'required' && <p className="text-red-700">Password is Required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-700">Password must be at least 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-700">Password must be less then 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-700">password should contain at least an upper case, lower case and number!</p>}

                        <input className="bg-[#480607] text-white p-2 rounded-2xl hover:bg-[#4806074D] my-2 w-full" type="submit" />
                        <p className="link link-hover text-center text-base font-semibold my-2">Forgot password?</p>
                        <div>
                            {
                                success ? <p className="text-green-700 text-center">{success}</p> : undefined
                            }
                        </div>
                        <div>
                            <button onClick={handleGoogleSignIn} className="bg-[#d3d3d3] w-full py-2 text-black font-semibold text-xs flex justify-center gap-2 items-center"><span className="text-xl"><FcGoogle /></span>LOG IN WITH GOOGLE</button>
                        </div>
                        <p className="text-sm mt-1">Already Have an Account? Please <Link to="/login" className="hover:underline text-blue-700 mt-4">Login</Link></p>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Register;