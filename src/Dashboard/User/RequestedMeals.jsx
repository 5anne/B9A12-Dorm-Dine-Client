// import axios from "axios";
import { useEffect } from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const RequestedMeals = () => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('http://localhost:5000/requestedMeals')
            .then(data => console.log(data.data))
    })

    return (
        <div>
            Hello
        </div>
    );
};

export default RequestedMeals;