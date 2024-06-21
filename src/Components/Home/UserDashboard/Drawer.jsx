import { Link } from "react-router-dom";


const Drawer = () => {
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open Dashboard</label>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a>My Profile</a></li>
                        <li><a>Requested Meals</a></li>
                        <li><a>My Reviews</a></li>
                        <li><a className="border-b-2">Payment History</a></li>
                        <Link to="/"><li><a>Home</a></li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Drawer;