import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const { users, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center mt-20"><span className="loading loading-ring loading-lg"></span></div>
    }
    if (users && isAdmin) {
        return children;
    }
    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default AdminRoute;