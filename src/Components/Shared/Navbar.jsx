import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logoImg from "../../assets/takeaway_1392728.png";
import { FaBars, FaUser } from "react-icons/fa";
import { FaList } from "react-icons/fa6";


const Navbar = () => {
    const { users, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error);
            })
    }

    const links = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/meals">Meals</NavLink>
        <NavLink to="/upcomingMeals">Upcoming Meals</NavLink>
    </>

    return (
        <div>
            <div className="navbar fixed z-10 opacity-70 text-white justify-between bg-[#480607] w-screen">
                <div>
                    <img className="w-12 rounded-full" src={logoImg} alt="" />
                    <a className="btn btn-ghost text-2xl font-display">Dorm Dine</a>
                </div>
                <div className="dropdown dropdown-bottom dropdown-end md:hidden">
                    <div tabIndex={0} role="button" className=""><FaBars></FaBars></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-black rounded-box z-[1] w-60 p-2 shadow">
                        <li className="text-blue-800"><a>{links}</a></li>
                    </ul>
                </div>
                <div className="hidden md:flex gap-6">
                    {links}
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </div>
                        </div>
                    </div>
                    {
                        users ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={users?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-rose-100 rounded-box w-52">
                                    <li><a className="text-black text-lg font-semibold hover:underline px-4 uppercase"><FaUser></FaUser>{users?.displayName}</a></li>
                                    <Link to="/dashboard/userProfile"><a className="text-black text-lg font-semibold hover:underline px-4 flex items-center gap-2"><FaList></FaList>Dashboard</a></Link>
                                    <Link to="/login"><div className="flex justify-center border-t-2 border-black border-dashed mx-4 mt-4 pt-2"><button onClick={handleLogOut} className="px-4 font-bold text-lg text-red-700 hover:underline">Log Out</button></div></Link>
                                </ul>
                            </div> :
                            <Link to="/login"><button className="border-4 px-3 py-2 text-white rounded-xl ml-4 hover:font-extrabold">Join Us</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;