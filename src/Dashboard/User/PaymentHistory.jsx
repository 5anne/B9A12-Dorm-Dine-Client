import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Home/DietBlog/SectionTitle";


const PaymentHistory = () => {
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', users?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${users?.email}`);
            console.log(res.data.length);
            return res.data;
        }
    })

    return (
        <>
            <div className="min-h-screen">
                <SectionTitle
                    subHeading="payment"
                    heading="My Payment History"
                ></SectionTitle>
                <div className="my-10">
                    {
                        payments?.length > 0 ?
                            (
                                payments?.map((payment, idx) =>
                                    <div key={payment._id} className="flex flex-col w-11/12 md:w-3/4 lg:w-1/2 mx-auto shadow-2xl mt-10 p-10 rounded-lg bg-emerald-950 text-gray-400">
                                        <h1><span className="font-bold text-lg mr-4">Purchase:</span> {idx + 1}</h1>
                                        <h1><span className="font-bold text-lg mr-4">User Name:</span>{payment.name}</h1>
                                        <h1><span className="font-bold text-lg mr-4">User Email:</span>{payment.email}</h1>
                                        <h1><span className="font-bold text-lg mr-4">Package Name:</span>{payment.badge}</h1>
                                        <h1><span className="font-bold text-lg mr-4">Transaction ID:</span>{payment.transactionId}</h1>
                                        <h1><span className="font-bold text-lg mr-4">Total Payment:</span>${payment.price}</h1>
                                        <h1><span className="font-bold text-lg mr-4">Purchase Date:</span>{payment.date}</h1>
                                    </div>)
                            ) :

                            <div className="flex flex-col w-11/12 md:w-1/2 mx-auto shadow-2xl mt-10 p-10 rounded-lg bg-slate-300 text-gray-400">
                                <h1 className="text-center text-red-900">You Have not made any payment Yet!!!</h1>
                            </div>

                    }
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;