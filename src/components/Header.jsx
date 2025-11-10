import { Search, Bell, ChevronDown } from "lucide-react"
import Profile from "../assets/Profile.png";
import { useAuth } from "../hooks/useAuth";

function Header() {
    const { user } = useAuth();
    return (
        <div className="bg-white/80 backdrop:blur-xl b px-6 py-4 flex items-center justify-between">
            <div className="hidden md:block">
                <h1 className="font-semibold text-[25px] leading-[100%] tracking-[0]">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-centerspace space-x-6 text-slate-400">
                    <button className="flex items-center justify-center w-9 h-9 mt-2 rounded-full">
                        <Search className="w-6 h-6 hover:text-slate-600 cursor-pointer" />
                    </button>
                    <button className="flex items-center justify-center w-9 h-9 mt-2 rounded-full">
                        <Bell className="w-6 h-6 hover:text-slate-600 cursor-pointer"/>
                    </button>
                    <div className="flex items-center space-x-3 bg-[#FAFAFA] px-3 py-2 rounded-full border border-slate-200 cursor-pointer">
                     <img className="w-9 h-9 rounded-full object-cover" src={Profile} alt="profile" />
                    <div className="hidden md:block">
                        <p className="font-semibold text-[14px] leading-[100%] tracking-[0]">
                            {user?.fullName || "guest"}
                        </p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400 cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
