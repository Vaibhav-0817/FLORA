import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000070] z-10">
      <div className="fixed top-0 right-0 z-20 bg-white flex flex-col justify-between min-h-screen shadow-sm w-1/4 min-w-[288px] overflow-y-scroll">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
            </div>
            <h5>Cart items are empty!
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500] font-Poppins">
                { cart && cart.length} items
                </h5>
              </div>
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => {
                    return (
                      <CartSingle
                        key={index}
                        data={i}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-pink-500 rounded-[5px] hover:bg-pink-600">
                  <h1 className="text-white text-[18px] font-[600] font-Roboto">
                    Checkout Now {totalPrice}₹
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="bg-pink-500 border-pink-600 border rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full h-[25px] w-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              decrement(data);
            }}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${data?.images[0].url}`}
          alt=""
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px] ">
          <h1 className="font-Roboto">{data.name}</h1>
          <h4 className="font-400 text-[15px] text-[#00000082] font-Poppins">
            ₹{data.discountPrice} * {data.qty}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-pink-600 font-Roboto">
            ₹{totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer text-xs"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
