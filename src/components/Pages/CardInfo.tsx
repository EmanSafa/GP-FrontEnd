import img1 from "../../assets/cardInfo/cardinfoimg1.png";
import img2 from "../../assets/cardInfo/cardinfoimg2.png";
import img3 from "../../assets/cardInfo/cardinfoimg3.png";
import img from "../../assets/cardInfo/cardinfo.png";
import color1 from "../../assets/phoneWhite.png";
import color2 from "../../assets/phoneBlack.png";
import { Heart, Minus, Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../ui/button";
import ShippingsIcon from "../ui/icons/shippingsIcon";
import DeliverIcon from "../ui/icons/deliverIcon";
import CardTable from "./CardTable";
const CardInfo = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div className="mt-[55px] lg:h-[627px] h-auto flex flex-col lg:flex-row gap-5 w-full items-start lg:items-center justify-between">
        <div className="flex flex-row gap-8 md:gap-3 w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col  items-center lg:w-[30%] w-1/3 justify-between gap-5 ml-0 lg:ml-9">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-[140px] flex items-center justify-center h-[190px] bg-[#F5F5F5]"
              >
                <img
                  src={i === 0 ? img1 : i === 1 ? img2 : img3}
                  alt={`img${i + 1}`}
                />
              </div>
            ))}
          </div>
          <div className=" lg:w-[70%] md:w-[60%] w-full lg:h-[627px] h-auto flex items-center justify-center bg-[#F5F5F5]">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="flex flex-col mx-5 gap-2 w-full lg:w-1/2 ">
          <h1 className=" text-start text-xl font-bold text-[#777777] ">
            Realme
          </h1>
          <div className="flex items-center justify-between">
            <h2 className="sm:text-3xl text-lg  font-bold text-[#404040] max-w-[438px] ">
              Realme 14 Dual Sim – 256GB , 12GB RAM,5G
            </h2>
            <Heart className="text-[#5D0505] md:mr-20 sm:mr-6 lg:mr-1" />
          </div>
          <div className="flex items-center flex-wrap justify-start gap-2">
            <span className="sm:text-[24px]/[171%] font-normal text-[20px]  ">
              18,390 EGP
            </span>
            <span className="text-[#9D0000] text-[16px]/[171%] font-normal line-through">
              21,666EGP
            </span>
            <span className="h-[26px] bg-black w-[1px]"></span>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-[#D50000] w-3 h-3" />
            ))}
            <span className="text-[#9D0000]">(32 reivews)</span>
          </div>
          <div className="text-[#414141] font-normal sm:text-[24px] text-[15px]">
            12 month  Warranty by Local Agent
          </div>
          <div className="h-[1px] w-[85%] bg-[#5D0505] my-3"></div>
          <div className="flex flex-col gap-2">
            <span className="text-[#414141] font-normal text-[15px]">
              Color
            </span>
            <div className="flex items-center justify-start gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center border-1 border-black w-[50px] h-[65px] rounded-lg"
                >
                  <img
                    src={i === 1 ? color1 : i === 2 ? color1 : color2}
                    alt={`color${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start text-[15px] font-normal text-[#414141]">
            <label htmlFor=""> Whats in the box?</label>
            <ul className="list-disc ml-6">
              <li>Adaptor</li>
              <li>Cable Type C</li>
              <li>Mental Pin</li>
              <li>User Manual</li>
            </ul>
          </div>
          <div className="flex items-start justify-start gap-5 mx-auto w-full flex-col lg:flex-row">
            <div className="flex items-center justify-center gap-3 border-1 border-[#D79898] h-[50px] w-[130px] rounded-full">
              <div onClick={() => setCounter((prev) => prev - 1)}>
                <Minus />
              </div>
              {counter > 0 ? <span>{counter}</span> : <span>0</span>}
              <div onClick={() => setCounter((prev) => prev + 1)}>
                <Plus />
              </div>
            </div>
            <Button
              variant={"auth"}
              className="rounded-full lg:w-[355px] sm:w-[90%]   sm:h-[50px] h-[40px] py-[16px] px-[24px] font-semibold text-[15px] sm:text-[18px] "
            >
              Add to Cart
            </Button>
          </div>
          <div className="flex items-start justify-start mt-2 ">
            <Button
              variant={"authOutline"}
              className="rounded-full lg:w-[500px]  w-[90%] sm:h-[50px] h-[35px] py-[16px] px-[24px] font-semibold text-[18px] "
            >
              Buy Now
            </Button>
          </div>
          <div className="flex flex-col max-md:mt-4 gap-3 items-start justify-start">
            <div className="flex gap-5 items-center justify-start">
              <ShippingsIcon />
              <span className="text-[14px] font-normal text-[#424242]">
                Free worldwide shipping on all orders over $100
              </span>
            </div>
            <div className="flex gap-5 items-center justify-start">
              <DeliverIcon />
              <span className="text-[14px] font-normal text-[#424242]">
                Delivers in: 3-7 Working Days Shipping & Return
              </span>
            </div>
          </div>
        </div>
      </div>
      <CardTable />
    </>
  );
};

export default CardInfo;
