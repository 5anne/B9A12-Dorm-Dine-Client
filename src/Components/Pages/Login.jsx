import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    console.log(errors);
    console.log(watch("fname"))
    const firstname = watch("fname");
    console.log(firstname)
    return (
        <div>
            <Helmet>
                <title>Dorm Dine ~ Login</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="pt-48">
                <form onSubmit={handleSubmit((data) => { console.log(data) })}>
                    <input {...register("fname", { required: true })} placeholder="first name" className="bg-gray-500" /> <br />
                    <input {...register("lname", { required: true })} placeholder="last name" className="bg-gray-500" />
                    <input type="submit" />
                    <p>Do Not Have an Account? Please <Link to="/register" className="hover:underline text-blue-700">Register</Link></p>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;