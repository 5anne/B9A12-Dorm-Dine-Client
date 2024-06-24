import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import MealDetails from "../Components/Home/MealCategory/MealDetails";
import CheckOut from "../Components/Home/MemberShip/CheckOut";
import Meals from "../Components/Meals/Meals";
import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from "../Dashboard/User/UserProfile";
import RequestedMeals from "../Dashboard/User/RequestedMeals";
import MyReviews from "../Dashboard/User/MyReviews";
import PaymentHistory from "../Dashboard/User/PaymentHistory";
import AdminProfile from "../Dashboard/Admin/AdminProfile";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ErrorPage from "../ErrorPage/ErrorPage";
import AddMeal from "../Dashboard/Admin/AddMeal";
import AdminRoute from "./AdminRoute";
import AllMeals from "../Dashboard/Admin/AllMeals";
import UpdateMeal from "../Dashboard/Admin/UpdateMeal";


const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/meal/:_id",
                element: <MealDetails></MealDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/allMeals/${params._id}`)
            },
            {
                path: "/checkout/:badge",
                element: <CheckOut></CheckOut>,
                loader: ({ params }) => fetch(`http://localhost:5000/premiumJson/${params.badge}`)
            },
            {
                path: "/meals",
                element: <Meals></Meals>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            //User
            {
                path: "/dashboard/userProfile",
                element: <UserProfile></UserProfile>
            },
            {
                path: "/dashboard/requestedMeals",
                element: <RequestedMeals></RequestedMeals>
            },
            {
                path: "/dashboard/myReviews",
                element: <MyReviews></MyReviews>
            },
            {
                path: "/dashboard/paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
            //Admin
            {
                path: "/dashboard/adminProfile",
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: "/dashboard/manageUsers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "/dashboard/addMeal",
                element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
            },
            {
                path: "/dashboard/allMeals",
                element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
            },
            {
                path: "/dashboard/updateMeal/:id",
                element: <AdminRoute><UpdateMeal></UpdateMeal></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/allMeals/${params.id}`)
            }
        ]
    },
]);

export default AllRoutes;