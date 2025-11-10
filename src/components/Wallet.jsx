import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import api from "../api/api"
import { MoreHorizontal, ChevronRight } from "lucide-react"
import CardChip from "../assets/CardChip.png"
import Volume from "../assets/Volume.png"
import International from "../assets/International.png"
import Visa from "../assets/Visa.png"


function Wallet() {
  const { token } = useAuth();
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    if (!token) return;

    const getWallet = async () => {
      try {
        const response = await api.get("/financial/wallet", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setWallet(response.data.data.cards)
      }
      catch (error) {
        console.log("Transactions error", error)
      }
    }


    getWallet();
  }, [token])


  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-3">
        <h1 className="font-semibold text-[#1B212D] text-[18px]">Wallet</h1>
        <MoreHorizontal className="w-5 h-5 text-[#929EAE]" />
      </div>
      <div className="relative w-full h-80 mb-10 overflow-visible">
        <div
          class="relative z-20 w-[354px] h-[210px] bg-linear-to-r from-[#4A4A49] to-[#20201F] rounded-xl shadow-md
            flex flex-col justify-between p-4 left-0 top-0"
        >
          <div class="flex items-center m-4">
            <h1 className="text-white font-bold text-[16px] mr-2">{wallet[0]?.bank}</h1>
          </div>
          <div class="flex justify-between items-center m-2">
            <img src={CardChip} />
            <img src={Volume} />
          </div>
          <div class="flex">
            <h1 class="text-[#FFFFFF] font-bold text-[17px] tracking-widest">
              {wallet[0]?.cardNumber}
            </h1>
          </div>
          <div className="flex justify-end">
            <img src={International} />
          </div>
        </div>

        <div
          class="absolute z-40 w-[324px] h-[172px] 
            left-[15px] top-[150px]
            bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.1)_100%)]
            rounded-xl shadow-lg
            backdrop-blur-md
            flex flex-col justify-between p-2"
        >
          <div class="flex items-center">
            <h1 className="text-white font-bold text-[16px] mr-2">{wallet[1]?.bank}</h1>
          </div>
          <div class="flex justify-between items-center mt-4">
            <img src={CardChip} />
            <img src={Volume} />
          </div>
          <div class="flex">
            <h1 class="text-[#1B212D] font-bold text-[16px] tracking-widest">
              {wallet[1]?.cardNumber}
            </h1>
          </div>
          <div className="flex justify-between mb-3">
            <p className="text-[12px] font-medium text-[#929EAE]">{wallet[1]?.expiryMonth + "/" + wallet[1]?.expiryYear}</p>
            <img src={Visa} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;


