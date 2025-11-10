import {useEffect, useState} from "react";
import { CartesianGrid, Tooltip, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import api from "../api/api";
import {useAuth} from "../hooks/useAuth";

function WorkingCapital() {
  const { token } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [currency, setCurrency] = useState("TRY");

  useEffect(() => {
    if(!token) return;
    const getWorkingCapital = async () => {
      try {
        const res = await api.get("/financial/working-capital", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setChartData((res.data.data?.data || []).map((item) => ({
          name: item.month,
          income: item.income,
          expenses: item.expense,
        })))
        setCurrency(res.data.data?.currency || "TRY")
        
      } catch (error) {
        console.log("working capital error", error)
      }
    }
    getWorkingCapital();
  }, [token])
  
  
    return (
        <div>
             <div className="bg-[#FFFF] w-full overflow-x-auto border border-[#F5F5F5] rounded-md p-4">
            <div className="flex justify-between">
                <h1 className="font-semibold text-[#1B212D] text-[18px]">Working Capital</h1>
            </div>
            <div className="flex items-center space-x-6 mt-2 float-end">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#29A073]"></span>
                <p className="text-sm text-[#1B212D]">Income</p>
              </div>
<div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#C8EE44]"></span>
                <p className="text-sm text-[#1B212D]">Expenses</p>
              </div>
            </div>
           <div className='w-full h-[300px] p-4'>
            <ResponsiveContainer width="100%">
              <LineChart data={chartData} margin={{ left: 20, right: 20 }}>
                <CartesianGrid
              vertical={true}
              horizontal={false}
              stroke="#F8E9FF"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[0, 3000, 5000, 7000, 10000]}
              tickFormatter={(v) => `${v / 1000}K`}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            /> <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #EEE",
              }}
              labelStyle={{ fontWeight: "600" }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#29A073"   
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, stroke: "#29A073", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#C8EE44" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, stroke: "#C8EE44", strokeWidth: 2 }}
            />
              </LineChart>
            </ResponsiveContainer>
           </div>
        </div>
        </div>
    )
}

export default WorkingCapital
