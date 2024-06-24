import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const PaymentHistory = () => {
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments, isLoading } = useQuery({
        queryKey: ['/payments', users.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${users.email}`);
            console.log(res.data);
            return res.data;
        }
    })

    return (
        <div className="mt-10">
            <h1 className="text-center font-semibold text-4xl border-b-2 border-yellow-500 pb-4 w-1/3 mx-auto">My Payment History</h1>
            {
                !isLoading ?
                    (
                        payments?.map((payment, idx) =>
                            <div key={payment._id} className="flex flex-col w-1/2 mx-auto shadow-2xl mt-10 p-10 rounded-lg bg-slate-700 text-gray-400">
                                <h1><span className="font-bold text-lg mr-4">Purchase:</span> {idx + 1}</h1>
                                <h1><span className="font-bold text-lg mr-4">User Name:</span>{payment.name}</h1>
                                <h1><span className="font-bold text-lg mr-4">User Email:</span>{payment.email}</h1>
                                <h1><span className="font-bold text-lg mr-4">Transaction ID:</span>{payment.transactionId}</h1>
                                <h1><span className="font-bold text-lg mr-4">Total Payment:</span>${payment.price}</h1>
                                <h1><span className="font-bold text-lg mr-4">Purchase Date:</span>{payment.date}</h1>
                            </div>)
                    ) :

                    (payments?.length === 0 && <div className="flex flex-col w-1/2 mx-auto shadow-2xl mt-10 p-10 rounded-lg bg-slate-700 text-gray-400">
                        <h1 className="text-center">You Have not made any payment Yet!!!</h1>
                    </div>)

            }
        </div>
    );
};

export default PaymentHistory;