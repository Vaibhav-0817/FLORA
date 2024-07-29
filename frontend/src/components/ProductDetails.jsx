import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { toast } from "react-toastify";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../redux/actions/product";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { addTocart } from "../redux/actions/cart";
import Ratings from '../components/Ratings.jsx'
import { BsStarFill } from "react-icons/bs";
import axios from "axios";
import { server } from "../server.js";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const { products } = useSelector((state) => state.products);
  const {isAuthenticated, user} = useSelector((state)=>state.user)
  const navigate = useNavigate();
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

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

  return (
    <div>
      {data ? (
        <div className={`${styles.section}`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-1/2">
                <img
                  src={`${data.images[select]?.url}`}
                  alt=""
                  className="h-[26rem] 800px:w-[88%] w-full mb-2 mx-auto"
                />
                <div className="w-4/5 mx-auto flex justify-between">
                  <div
                    className={`${
                      select === 0 ? "ring-2 ring-offset-2 ring-pink-500" : null
                    } cursor-pointer w-[48%]`}
                  >
                    <img
                      src={`${data.images[0].url}`}
                      alt=""
                      className="h-[13rem] w-full object-cover"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "ring-2 ring-offset-2 ring-pink-500" : null
                    } cursor-pointer w-[48%]`}
                  >
                    <img
                      src={`${data.images[1]?.url}`}
                      alt=""
                      className="h-[13rem] w-full object-cover"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-1/2 pt-5">
                <h1 className={`${styles.productTitle} !text-white`}>
                  {data.name}
                </h1>
                <p className="text-white font-Poppins">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice} !text-white`}>
                    ₹{data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price} !text-white`}>
                    ₹{data.originalPrice}
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
                        color={click ? "#ec4899" : "#fff"}
                        title="Add to wishlist"
                      ></AiOutlineHeart>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} hover:bg-pink-600 !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span
                    className="text-white font-Poppins"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    Add to cart
                    <AiOutlineShoppingCart
                      size={20}
                      className="ml-1 inline-block"
                    />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data.shop.avatar.url}`}
                      alt=""
                      className="h-14 w-14 rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1 `}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="text-[1rem] pb-3 text-white">
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
                  <div
                    className={`${styles.button} mt-4 !rounded !h-11 hover:bg-pink-600`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center font-Poppins">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ProductDetailsInfo data={data} products={products} />
            <br />
            <br />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);
  const [active, setActive] = useState(1);
  return (
    <div className="bg-white px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-gray-950 text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] font-Roboto"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? <div className={styles.active_indicator} /> : null}
        </div>
        <div className="relative">
          <h5
            className="text-gray-950 text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] font-Roboto"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? <div className={styles.active_indicator} /> : null}
        </div>
        <div className="relative">
          <h5
            className="text-gray-950 text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px] font-Roboto"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? <div className={styles.active_indicator} /> : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line font-Poppins text-gray-900">
            {data.description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews yet!</h5>
            )}
          </div>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-1/2">
            <Link to={`/shop/preview/${data?.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data.shop.avatar.url}`}
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
                <div className="pl-2">
                  <h3 className={`${styles.shop_name} pb-1 pt-1 `}>
                    {data.shop.name}
                  </h3>
                  <h5 className="text-[1rem] pb-1">
                    {data?.ratings}{" "}
                    <AiFillStar className="inline-block text-pink-600" />{" "}
                    Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2 font-Poppins">{data.shop.description}.</p>
          </div>
          <div className="w-full 800px:w-1/2 mt-5 800px:mt-0 800px:flex flex-col items-end font-Poppins">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on :{" "}
                <span className="font-[500]">
                  {data.shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600]">
                Total Blooms :{" "}
                <span className="font-[500]">{products.length}</span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews : <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] h-[39.5px] mt-3 hover:bg-pink-600 `}
                >
                  <h4 className="text-white">Visit Seller</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
