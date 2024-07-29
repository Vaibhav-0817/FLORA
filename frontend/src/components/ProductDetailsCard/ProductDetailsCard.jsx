import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsStarFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import axios from "axios";
import { server } from "../../server";

const ProductDetailsCard = ({ setOpen, data }) => {
  const {cart}  = useSelector((state)=>state.cart)
  const {wishlist}  = useSelector((state)=>state.wishlist)
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const {user,isAuthenticated} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  // const [select, setSelect] = useState(false);
  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);


const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data.shop._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  return (
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 z-40 bg-[#000000da] flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[88vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            ></RxCross1>
            <div className="w-full block 1000px:flex">
              <div className="w-full 1000px:w-6/12">
                <img
                  src={`${data.images[0].url}`}
                  alt=""
                  className="1000px:w-full w-[90%] h-[50vh] mb-2 object-cover"
                ></img>
                 <Link to={`/shop/preview/${data?.shop._id}`} >
                <div className="flex">
                  <img
                    src={`${data.shop.avatar.url}`}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt=""
                  ></img>
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px] flex items-center">
                      {data?.ratings ? data?.ratings : 'No '}
                      {data?.ratings ?
                      <BsStarFill
                        className="cursor-pointer inline ml-1 mr-1"
                        size={20}
                        color="#ec4899"
                      ></BsStarFill> : null}
                      Ratings
                    </h5>
                  </div>
                </div>
                </Link>
                <div
                  className={`${styles.button} mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
              <div className="w-full 1000px:w-6/12 pt-5 pl-[8px] pr-[3px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p className="font-Poppins">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}₹
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "₹" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out h-11 w-10"
                      onClick={() =>
                        count > 1
                          ? setCount(count - 1)
                          : toast.error("Quantity can't be less than 1")
                      }
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span className="bg-gray-200 text-gray-900 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out h-11 w-10"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "#ec4899" : "#ec4899"}
                        title="Remove from wishlist"
                      ></AiFillHeart>
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "#ec4899" : "#111827"}
                        title="Add to wishlist"
                      ></AiOutlineHeart>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 items-center`}
                  onClick={()=>addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
