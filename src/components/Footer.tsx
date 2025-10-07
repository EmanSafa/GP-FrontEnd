import { Instagram, PhoneCall } from "lucide-react";
import WhatsAppIcon from "./icons/whatsappIcon";
import FacebookIcon from "./icons/facebookIcon";
import LinkedInIcon from "./icons/linkedInIcon";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black  text-white">
      <div className="flex items-start ml-[120px] mt-[80px] justify-between gap-6 flex-col ">
        <h1 className="cursor-pointer text-2xl my-1  font-medium transation duration-300 ease-in-out  hover:text-gray-200">
          Contact Us
        </h1>
        <div className="flex items-center space-x-2">
          <WhatsAppIcon />
          <div className="flex flex-col items-start">
            <span className=" text-sm ">WhatsApp</span>
            <span>+1 202-918-2132</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneCall />
          <div className="flex flex-col items-start">
            <span className=" text-sm ">Call Us</span>
            <span>+1 202-918-2132</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <FacebookIcon />
          <Instagram />
          <LinkedInIcon />
        </div>
        <div className="grid grid-cols-2 w-[40%] absolute left-3/4 transform -translate-x-1/2 ">
          <div >
            <span className="font-medium text-2xl mb-3 ">Links</span>
            <div className="h-[2px] my-3 w-[8rem] bg-white "></div>
            <ul className="list-disc text-lg  ml-5 space-y-3">
              <li>Home</li>
              <li>Cart</li>
              <li>My Account</li>
              <li>Careers</li>
              <li>About us</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-2xl mb-3 ">Customer Services</span>
            <div className="h-[2px] my-3 w-[12rem] bg-white "></div>
            <ul className="list-disc text-lg  ml-5 space-y-3">
              <li>Order Tracking</li>
              <li>Refund & Return poilcy</li>
              <li>Terms & Privacy Policy</li>
              <li>Contact us</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 py-7">
        <div className="h-[1px] w-[76%] bg-gray-400  mt-[30px]"></div>
        <p className="text-white text-sm font-light">
          {" "}
          © 2025 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
