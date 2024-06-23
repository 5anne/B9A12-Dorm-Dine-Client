import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeal = () => {
    const axiosPublic = useAxiosPublic();

    const { data: meals = [], isPending: loading, refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allMeals');
            return res.data;
        }
    })


    return [meals, loading, refetch]
}

export default useMeal;