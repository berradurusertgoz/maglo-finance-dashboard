import SideBar from "../components/SideBar"
import Header from "../components/Header"
import StatsCards from "../components/StatsCards"
import WorkingCapital from "../components/WorkingCapital"
import RecentTransactions from "../components/RecentTransactions"
import Wallet from "../components/Wallet"
import ScheduledTransfers from "../components/ScheduledTransters"
function Dashboard() {
    return (
        <div className="flex h-screen overflow-x-hidden overflow-y-hidden md:overflow-y-auto flex-col md:flex-row">
            <div className="hidden md:block">
                <SideBar/>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
               {/* Header */}
                <Header />
                {/* Main content area */}
                <div className="flex flex-1 overflow-y-auto px-4 md:px-8 flex-col md:flex-row md:space-x-6 py-6 space-y-0">
                {/* Left: main content */}
                <div className="flex-1 space-y-6">
                    <StatsCards />
                    <WorkingCapital/>
                    <RecentTransactions/>
                </div>
                {/* Right: wallet scheduled transfer */}
                <div className="w-full md:w-[340px] shrink-0 space-y-6 overflow-hidden">
                    <Wallet />
                    <ScheduledTransfers />
                </div>
                </div>



            </div>
            
        </div>
    )
}

export default Dashboard
