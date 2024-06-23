import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {

    const isAdmin = true;

    return (
        <div className="flex">
            <div className="drawer lg:drawer-open w-32">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Dashboard</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/adminProfile">Admin Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addMeal">Add Meal</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/allMeals">All Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/allReviews">All Reviews</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/serveMeals">Serve Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/upcomingMeals">Upcoming Meals</NavLink>
                                    </li>
                                </> :
                                <>
                                    <li>
                                        <NavLink to="/">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/userProfile">User Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/requestedMeals">Requested Meals</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/myReviews">My Reviews</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/paymentHistory">Payment History</NavLink>
                                    </li>
                                </>
                        }
                    </ul>

                </div>
            </div>
            <div className="w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;