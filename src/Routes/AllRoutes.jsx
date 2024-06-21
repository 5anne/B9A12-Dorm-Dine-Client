import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import MealDetails from "../Components/Home/MealCategory/MealDetails";


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
                path: "/meal/:id",
                element: <MealDetails></MealDetails>,
                loader: ({ params }) => fetch(`/meal.json/${params.id}`)
            }
        ]
    },
]);

export default AllRoutes;