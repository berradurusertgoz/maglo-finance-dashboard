import {useState, useEffect} from "react"
import { ChevronRight } from "lucide-react"
import Profile from "../assets/Profile.png"
import Profile2 from "../assets/Ellipse.png"
import { useAuth } from "../hooks/useAuth";
import api from "../api/api";

function ScheduledTransters()
{
    const { token } = useAuth();
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        if(!token) return;
        const getTransfers = async () => {
            try{
                const res = await api.get("/financial/transfers/scheduled", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("Apı scheduled", res.data.data.transfers);
                setTransfers(res.data.data?.transfers || [])
            }
            catch(error){
                console.log("Scheduled Transfers Error:", error)
            }
        }
        getTransfers();
    }, [token])

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="font-semibold text-[#1B212D] text-[18px] m-2">Scheduled Transfers</h1>
                <div className="flex"> <button className="text-[#29A073] cursor-pointer">View All </button>
                    <ChevronRight className="text-[#29A073] w-5 h-5 m-2" /></div>
            </div>
            {transfers.map((item) =>(
<div key={item.id} className="border-b border-[#FAFAFA] flex justify-between items-center py-3.5">
                <div className="flex">
                    <img className="w-9 h-9" src={item.image}/>
                    <div className="pl-2">
                        <h2 className="font-medium text-[14px] text-[#1B212D]">{item.name}</h2>
                        <p className="font-normal text-[12px] text-[#929EAE]">
                            {new Date(item.date).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            </p>
                    </div>
                </div>
                <p className="font-medium text-[14px] text-[#1B212D]">
                    {item.amount < 0 ? "-" : "+"}
                    {Math.abs(item.amount).toLocaleString()} {item.currency}
                </p>
            </div>
            ))}
            

        </div>
    )
}

export default ScheduledTransters
