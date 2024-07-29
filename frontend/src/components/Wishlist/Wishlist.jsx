import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import {IoBagHandleOutline} from 'react-icons/io5'
import {BsCartPlus} from 'react-icons/bs'
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state)=>state.wishlist)
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishlist(false);
    toast.success('Added to cart successfully')
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] z-10">
      <div className="fixed top-0 right-0 z-20 bg-white flex flex-col justify-between min-h-screen shadow-sm w-1/4 min-w-[288px]">
      {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
      <div>
        <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1 size={25} className="cursor-pointer" onClick={()=>setOpenWishlist(false)} />
        </div>
        <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500] font-Poppins">{wishlist && wishlist.length} items</h5>
        </div>
        <br />
        <div className="w-full border-t">
           { wishlist && wishlist.map((i,index)=>{
            return (<WishlistSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler}/>)
           }) }
        </div>
       </div>
       </>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({data,removeFromWishlistHandler,addToCartHandler})=>{
    const [value,setValue] = useState(1);
    const totalPrice = data.discountPrice * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
            <RxCross1 className="cursor-pointer text-xs" onClick={()=>removeFromWishlistHandler(data)} />
            <img src={`${data?.images[0].url}`} alt="" className="w-[80px] h-[80px] ml-2" />
                <div className="pl-[5px] relative">
                  <h1 className="font-Roboto">{data.name}</h1>
                  <h4 className="font-[600] text-[17px] pt-[3px] text-pink-600 font-Roboto">₹{totalPrice}</h4>
                  <BsCartPlus size={20} className="cursor-pointer absolute right-2 top-8" title='Add to cart' onClick={()=>addToCartHandler(data)} />
                </div>
            </div>
        </div>
    )
}

export default Wishlist;