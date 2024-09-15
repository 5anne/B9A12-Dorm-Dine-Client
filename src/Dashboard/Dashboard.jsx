import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUser, FaUsers } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDashboard, MdFastfood, MdFoodBank, MdLogout, MdNoFood, MdOutlineRateReview, MdPayment, MdRateReview } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import logoImg from "../assets/takeaway_1392728.png";


const Dashboard = () => {
    const { users, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    console.log(isAdmin);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="md:flex">
            <div className="drawer md:drawer-open md:w-1/4">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex items-center justify-around bg-[#800000] bg-opacity-70">
                    <div className="flex items-center md:hidden">
                        <img className="w-8 rounded-full" src={logoImg} alt="" />
                        <a className="btn btn-ghost text-2xl font-display">Dorm Dine</a>
                    </div>
                    <label htmlFor="my-drawer-2" className="btn btn-outline hover:bg-slate-500 my-4 drawer-button md:hidden"><MdDashboard></MdDashboard></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 lg:w-[294px] min-h-screen bg-[#800000] bg-opacity-70 text-white">
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        {
                                            users && isAdmin && <NavLink to="/dashboard/adminProfile"><FaUser></FaUser>Admin Profile</NavLink>
                                        }
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageUsers"><FaUsers></FaUsers>Manage Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addMeal"><IoMdAddCircleOutline />Add Meal</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/allMeals"><MdFastfood />All Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/allReviews"><MdOutlineRateReview />All Reviews</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/serveMeals"><GiHotMeal />Serve Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/upcomingMeals"><IoFastFoodSharp />Upcoming Meals</NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to="/"><FaHome></FaHome>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/meals"><MdNoFood />Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/upcomingMeals"><MdFoodBank />Upcoming Meals</NavLink>
                                    </li>
                                    <li>
                                        <Link to="/login"><div className=""><button onClick={handleLogOut} className="flex items-center gap-2"><MdLogout />Log Out</button></div></Link>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        {
                                            users && !isAdmin && <NavLink to="/dashboard/userProfile"><FaUser></FaUser>User Profile</NavLink>
                                        }
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/requestedMeals"><MdFastfood />Requested Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/myReviews"><MdRateReview />My Reviews</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/paymentHistory"><MdPayment />Payment History</NavLink>
                                    </li>
                                    <div className="divider"></div>
                                    <li>
                                        <NavLink to="/"><FaHome></FaHome>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/meals"><MdNoFood />Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/upcomingMeals"><MdFoodBank />Upcoming Meals</NavLink>
                                    </li>
                                    <li>
                                        <Link to="/login"><div className=""><button onClick={handleLogOut} className="flex items-center gap-2"><MdLogout />Log Out</button></div></Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
            <div className="w-full bg-[#87624c] bg-opacity-50">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;