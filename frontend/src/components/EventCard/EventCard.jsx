import React from "react";
import styles from "../../styles/styles";
import CountDown from "../CountDown/CountDown.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <div
      className={`w-full block lg:flex bg-white rounded-lg ${
        active ? "mb-8" : "mb-12"
      } p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${data?.images[0].url}`}
          className="object-cover max-h-[350px]"
          alt=""
        ></img>
      </div>
      <div className="w-full flex flex-col justify-center lg:w-3/6">
        <h2 className={`${styles.productTitle} !text-gray-900`}>{data?.name}</h2>
        <p className="font-Poppins">{data?.description}</p>
        <div className="flex justify-between py-2">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-gray-900 pr-3 line-through font-Poppins">
              {data?.originalPrice}₹
            </h5>
            <h5 className="font-bold text-[20px] font-Roboto text-gray-900">
              {data?.discountPrice}₹
            </h5>
          </div>
          <span className="pr-3 text-pink-500 font-[400] text-[17px] font-Poppins">
            {data?.sold_out} Sold
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
