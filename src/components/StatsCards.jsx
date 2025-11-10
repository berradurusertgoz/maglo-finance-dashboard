import { Wallet, CreditCard, AppWindow } from "lucide-react"
import api from "../api/api";
import { useState, useEffect } from "react";

function StatsCards() {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const getSummary = async () => {
            try {
                const res = await api.get("/financial/summary");
                setSummary(res.data.data)
            } catch (error) {
                console.log("Summary error", error)
            }
        }
        getSummary();
    }, [])

    const cards = [
        {
            icon: Wallet,
            label: "Total Balance",
            value: summary?.totalBalance ? `${summary.totalBalance.amount}` : "0 TRY",
            currency: summary?.totalBalance ? `${summary.totalBalance.currency}` : "0 TRY",
            active: true,
        },
        {
            icon: CreditCard,
            label: "Total spending",
            value: summary?.totalExpense ? `${summary.totalExpense.amount}` : "0 TRY",
            currency: summary?.totalExpense ? `${summary.totalExpense.currency}` : "0 TRY",
            active: false,
        },
        {
            icon: AppWindow,
            label: "Total saved",
            value: summary?.totalSavings ? `${summary.totalSavings.amount}` : "0 TRY",
            currency: summary?.totalSavings ? `${summary.totalSavings.currency}` : "0 TRY",
            active: false,
        }


    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => {
                return (
                    <div
                        key={index}
                        className={`rounded-[10px] flex items-center justify-between px-5 py-6 flex-1 ${card.active
                            ? "bg-[#363A3F] text-white" :
                            "bg-[#F8F8F8] text-[#1B212D]"
                            }`}>
                        <div className={`flex items-center justify-center p-3 rounded-full ${card.active ? "bg-[#4A4D52]" : "bg-[#EBE8E8]"}`}>
                            <card.icon className="w-5 h-5" />
                        </div>
                        <div className="text-right">
                            <p className={`text-[14px font-semibold ${card.active ? "text-[#D1D5DB]" : "text-[#929EAE]"}]`}>{card.label}</p>
                            <h2 className={`text-[24px] font-semibold ${card.active} ? 
                       "text-white : text[#1B212D]`}>{card.value}</h2>
                        <p className={`text-[12px] font-medium ${card.active ? "text-gray-200" : "text-[#929EAE]"}`}>
    {card.currency}
  </p>
                        </div>

                    </div>
                )
            })}

        </div>


    )
}

export default StatsCards
