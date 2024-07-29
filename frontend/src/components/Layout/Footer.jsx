import React from "react";
import logo from "../../assets/logo.png";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {footerProductLinks, footercompanyLinks, footerSupportLinks} from '../../static/data'

const Footer = () => {
  return (
    <div className="text-gray-900">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 py-5 bg-pink-500">
        <h1 className="lg:text-4xl text-xl mb-6 md:mb-0 lg:leading-normal font-semibold md:w-1/2 font-Poppins">
          <span className="text-white">Subscribe</span> us to get news <br />
          events and offers!
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-900 sm:w-72 w-full mr-1 sm:mr-5 mb-4 lg:mb-0 py-2.5 rounded px-2 focus:outline-none placeholder:text-gray-500 placeholder:font-Poppins"
          ></input>
          <button className="bg-gray-900 hover:bg-[#000000] duration-300 px-5 py-2.5 rounded-md text-white sm:w-auto w-full font-Poppins">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 sm:px-8 px-4 py-12 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="h-12 object-contain"
            
          ></img>
          </Link>
          <br />
          <p className="font-Poppins text-white text-sm">
            Your One-Stop Destination for All Your Floral Desires!
          </p>
          <div className="flex items-center mt-[10px] lg:mt-[15px]">
            <AiFillFacebook
              size={25}
              className="cursor-pointer text-white hover:text-pink-500"
            ></AiFillFacebook>
            <AiFillInstagram
              size={25}
              className="cursor-pointer ml-4 text-white hover:text-pink-500"
            ></AiFillInstagram>
            <AiFillYoutube
              size={25}
              className="cursor-pointer ml-4 text-white hover:text-pink-500"
            ></AiFillYoutube>
            <AiOutlineTwitter
              size={25}
              className="cursor-pointer ml-4 text-white hover:text-pink-500"
            ></AiOutlineTwitter>
          </div>
        </ul>
        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-white">Company</h1>
            {footerProductLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-300 hover:text-pink-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-white">Shop</h1>
            {footercompanyLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-300 hover:text-pink-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-white">Support</h1>
            {footerSupportLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-300 hover:text-pink-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-200 text-sm pb-8"
      >
        <span>© 2024 Vaibhav Shukla. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full pr-1">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
