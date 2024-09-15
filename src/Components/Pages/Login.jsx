import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [regError, setRegError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    console.log(errors);

    const handleSignIn = (data, e) => {
        e.preventDefault();

        const email = data.email;
        const password = data.password;

        setRegError('');

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                setRegError('Invalid Email-ID or Password!');
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
                <title>Dorm Dine ~ Login</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="px-4 pt-28 md:pt-48">
                <div className="flex justify-center bg-red-950 bg-opacity-50 md:w-1/2 p-8 mx-auto shadow-2xl">

                    <form onSubmit={handleSubmit(handleSignIn)} className="">
                        <h1 className="text-2xl text-center font-bold">Login Now!</h1> <br />

                        <input {...register("email", { required: true })} type="email" placeholder="Email" className="bg-gray-300 border-2 p-2 border-none my-2 w-full" /> <br />
                        {errors.email && <span className="text-red-700">Email is required</span>}

                        <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)[a-zA-Z\d]+/ })} type="password" placeholder="******" className="bg-gray-300 border-2 p-2 border-none my-2 w-full" /> <br />

                        <input className="bg-[#480607] text-white p-2 rounded-2xl hover:bg-[#4806074D] my-2 w-full" type="submit" />
                        <p className="link link-hover text-center text-base font-semibold my-2">Forgot password?</p>
                        <div>
                            {
                                regError && <p className="text-red-700 text-center">{regError}</p>
                            }
                        </div>
                        <div>
                            <button onClick={handleGoogleSignIn} className="bg-[#d3d3d3] w-full py-2 text-black font-semibold text-xs flex justify-center gap-2 items-center"><span className="text-xl"><FcGoogle /></span>LOG IN WITH GOOGLE</button>
                        </div>
                        <p className="text-sm mt-1">Do Not Have an Account? Please <Link to="/register" className="hover:underline text-blue-700">Register</Link></p>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;