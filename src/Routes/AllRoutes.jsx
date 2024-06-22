import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import MealDetails from "../Components/Home/MealCategory/MealDetails";
import CheckOut from "../Components/Home/MemberShip/CheckOut";
import Meals from "../Components/Meals/Meals";
import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../Components/Home/UserDashboard/UserDashboard";
import UserProfile from "../Components/Home/UserDashboard/UserProfile";


const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/meal/:_id",
                element: <MealDetails></MealDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/mealJson/${params._id}`)
            },
            {
                path: "/checkout/:package_name",
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
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
        path: "/userDashboard",
        element: <UserDashboard></UserDashboard>,
        children: [
            {
                path: "/userDashboard",
                element: <UserProfile></UserProfile>
            }
        ]
    }
]);

export default AllRoutes;