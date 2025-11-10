import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import api from "../api/api";
import Group1 from "../assets/Group-41.png"
function RecentTransactions() {
    const { token } = useAuth();
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        if (!token) return;

        const getTransactions = async () => {
            try {
                const response = await api.get("/financial/transactions/recent", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setTransactions(response.data.data.transactions)
            }
            catch (error) {
                console.log("Transactions error", error)
            }
        }


        getTransactions();
    }, [token])


    return (
        <div className="bg-[#FFFF] w-full border border-[#F5F5F5] rounded-md p-4">
            <div className="flex justify-between">
                <h1 className="font-semibold text-[#1B212D] text-[18px]">Recent Transaction</h1>
                <div className="flex"> <button className="text-[#29A073] cursor-pointer">View All </button>
                    <ChevronRight className="text-[#29A073] w-5 h-5 m-2" /></div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-[#929EAE] font-semibold text-[12px]">
                            <th>NAME/BUSINESS</th>
                            <th>TYPE</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                        </tr>

                    </thead>
                    <tbody className="border-b border-slate-200/50">
                    {transactions.map(item => (
<tr key={item.id}>
                            <td className="py-3 flex items-center">
                                <img src={item.image} className="w-10 h-10 rounded" alt="" />
                                <div className="flex flex-col pl-2">
                                    <p className="font-medium text-[14px] text-[#1B212D]">{item.name}</p>
                                    <p className="font-normal text-[12px] text-[#929EAE]">{item.business}</p>
                                </div>
                            </td>
                            <td className="font-normal text-[12px] text-[#929EAE]">
                                {item.type}
                            </td>
                            <td>
                                {item.amount} {item.currency}
                            </td>
                            <td className="font-medium text-[14px] text-[#929EAE]">
                                {new Date(item.date).toLocaleDateString("tr-TR")}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default RecentTransactions
