import { Instagram, PhoneCall } from "lucide-react";
import WhatsAppIcon from "./icons/whatsappIcon";
import FacebookIcon from "./icons/facebookIcon";
import LinkedInIcon from "./icons/linkedInIcon";
import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black z-10 text-white">
      <div className="flex items-start ml-4 md:ml-[120px] mt-8 md:mt-[80px] justify-between gap-6 flex-col ">
        <h1 className="cursor-pointer text-xl md:text-2xl my-1  font-medium transation duration-300 ease-in-out  hover:text-gray-200">
          Contact Us
        </h1>
        <div className="flex items-center space-x-2">
          <WhatsAppIcon />
          <div className="flex flex-col items-start">
            <span className="text-xs md:text-sm">WhatsApp</span>
            <span className="text-sm md:text-base">+1 202-918-2132</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneCall />
          <div className="flex flex-col items-start">
            <span className="text-xs md:text-sm">Call Us</span>
            <span className="text-sm md:text-base">+1 202-918-2132</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="http://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[40%] static md:absolute md:left-3/4 md:transform md:-translate-x-1/2 gap-6 md:gap-0 mt-4 md:mt-0">
          <div>
            <span className="font-medium text-xl md:text-2xl mb-3">Links</span>
            <div className="h-[2px] my-3 w-[8rem] bg-white"></div>
            <ul className="list-disc text-base md:text-lg ml-5 space-y-2 md:space-y-3">
              <Link to="/"><li>Home</li></Link>
              <Link to="/cart"><li>Cart</li></Link>
              <Link to="/account"><li>My Account</li></Link>
              <Link to="/about"><li>About us</li></Link>
            </ul>
          </div>
          <div>
            <span className="font-medium text-xl md:text-2xl mb-3">
              Customer Services
            </span>
            <div className="h-[2px] my-3 w-[12rem] bg-white"></div>
            <ul className="list-disc text-base md:text-lg ml-5 space-y-2 md:space-y-3">
              <li>Order Tracking</li>
              <li>Refund & Return poilcy</li>
              <li>Terms & Privacy Policy</li>
              <li>Contact us</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 md:gap-5 py-4 md:py-7">
        <div className="h-[1px] w-[90%] md:w-[76%] bg-gray-400 mt-4 md:mt-[30px]"></div>
        <p className="text-white text-xs md:text-sm font-light text-center px-4">
          © 2025 All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
