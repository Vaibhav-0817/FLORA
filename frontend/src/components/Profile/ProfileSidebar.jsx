import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from 'react-icons/ri'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag} from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {MdOutlineTrackChanges} from 'react-icons/md' 
import {TbAddressBook } from 'react-icons/tb'
import {server} from '../../server'
import axios from 'axios'
import {toast} from 'react-toastify'

const ProfileSidebar = ({ active, setActive }) => {
    const logoutHandler = ()=>{
      axios.get(`${server}/user/logout`,{withCredentials: true}).then((res)=>{
        toast.success(res.data.message);
        window.location.reload(true);
      }).catch((error)=>{
        console.log(error.response.data.message)
      })
    }
    const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-sm shadow-black rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-pink-500" : ""} 800px:block hidden`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-pink-500" : ""} 800px:block hidden`}>
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-pink-500" : ""} 800px:block hidden`}>
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(4) || navigate('/inbox')}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-pink-500" : ""}800px:block hidden`}>
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-pink-500" : ""} 800px:block hidden`}>
          Track Order 
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-pink-500" : ""} 800px:block hidden`}>
          Change Password 
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-pink-500" : ""} 800px:block hidden`}>
          Address 
        </span>
      </div>
      <div
        className=" single_item flex items-center cursor-pointer w-full mb-8 font-Poppins"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#ec4899" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-pink-500" : ""} 800px:block hidden`}>
          Log Out 
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
