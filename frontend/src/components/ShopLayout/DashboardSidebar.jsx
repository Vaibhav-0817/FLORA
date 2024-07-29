import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import {VscNewFile} from 'react-icons/vsc'
import {CiMoneyBill, CiSettings} from 'react-icons/ci'
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 1 ? "text-pink-500" : "text-gray-900"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 2 ? "text-pink-500" : "text-gray-900"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage
            size={30}
            color={`${active === 3 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 3 ? "text-pink-500" : "text-gray-900"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-product" className="w-full flex items-center">
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 4 ? "text-pink-500" : "text-gray-900"
            }`}
          >
            Add Product
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 5 ? "text-pink-500" : "text-gray-900"
            }`}
          >
            Events
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 6 ? "text-pink-500" : "text-gray-900"
            }`}
          >
           Add Event
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-withdraw-money" className="w-full flex items-center">
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 7 ? "text-pink-500" : "text-gray-900"
            }`}
          >
           Withdraw Money
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 8 ? "text-pink-500" : "text-gray-900"
            }`}
          >
           Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 9 ? "text-pink-500" : "text-gray-900"
            }`}
          >
           Discount Codes
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 10 ? "text-pink-500" : "text-gray-900"
            }`}
          >
           Refunds
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#ec4899" : "#111827"}`}
          />
          <h5
            className={`800px:block hidden pl-3 text-[18px] font-[400] font-Roboto ${
              active === 11 ? "text-pink-500" : "text-gray-900"
            }`}
          >
           Settings
          </h5>
        </Link>
      </div>

    </div>
  );
};

export default DashboardSidebar;
