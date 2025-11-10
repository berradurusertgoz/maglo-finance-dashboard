import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Logo from "./Logo.jsx";
import { 
    House,
    ChartLine, 
    Settings, 
    BookMarked, 
    Wallet, 
    BadgeQuestionMark, 
    LogOut } from "lucide-react";

const menuItems = [
    {id:"dashboard", icon: House, label: "Dashboard", active: true},
    {id:"transactions", icon: ChartLine, label: "Transactions", active: false,},
    {id:"invoices", icon: BookMarked, label: "Invoices",active: false },
    {id:"wallet", icon: Wallet, label: "Wallet", active: false},
    {id:"settings", icon: Settings, label: "Settings",active: false },
]

function SideBar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate("/signin")
    }

    return (
        <div className="bg-[#FAFAFA] h-screen w-72 flex flex-col justify-between p-5 pt-8">
            <div className="p-6 flex items-center">
                <Logo />
            </div>
            {/* Navigation section*/}
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    return(
<div key={item.id}>
                        <button className={`w-full flex items-center justify-between p-3 rounded-lg transition cursor-pointer ${item.active 
                            ? "bg-[#C8EE44] text-[#1B212D] font-semibold" : 
                            "text-[#929EAE] hover:bg-gray-100"}`}
                            >
                            <div className="flex items-center space-x-3">
                                <item.icon 
                                className={`w-5 h-5 ${item.active ? "text-[#1B212D]" : "text-[#929EAE]"} `}/>
                                <span className="font-semibold text-[14px] leading-[100%] tracking-[0]">{item.label}</span>
                            </div>
                        </button>
                    </div>
                    )
                    
                })}
            </div>
            <div className="p-2 ">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition text-[#929EAE] cursor-pointer">
                    <BadgeQuestionMark className="w-5 h-5"/>
                    <span className="font-semibold text-[14px] leading-[100%] tracking-[0]">Help</span>
                </button>
                <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition text-[#929EAE] cursor-pointer">
                    <LogOut
                    className="w-5 h-5 cursor-pointer"/> 
                    <span className="font-semibold text-[14px] leading-[100%] tracking-[0]">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default SideBar
