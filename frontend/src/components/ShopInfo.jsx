import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import axios from "axios";
import { server } from "../server";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../redux/actions/product";
import Loader from "./Layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${data?.avatar?.url}`}
                alt=""
                className="w-36 h-36 object-cover rounded-full border-[3px] border-pink-500 hover:border-pink-600"
              ></img>
            </div>
            <h3 className="text-center py-2 text-[20px] font-Roboto font-[600]">
              {data.name}
            </h3>
            <p className="text-[16px] text-gray-800 flex items-center p-[10px] font-Poppins">
              {data.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600] font-Roboto">Address:</h5>
            <h4 className="text-gray-800 font-Poppins">{data.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] font-Roboto">Phone Number:</h5>
            <h4 className="text-gray-800 font-Poppins">{data.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] font-Roboto">Total Products:</h5>
            <h4 className="text-gray-800 font-Poppins">{products?.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] font-Roboto">Seller Ratings:</h5>
            <h4 className="text-gray-800 font-Poppins">
              {averageRating}
              <AiFillStar color="#ec4899" className="inline-block" size={22} />
            </h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600] font-Roboto">Joined On:</h5>
            <h4 className="text-gray-800 font-Poppins">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px] hover:bg-pink-600`}
                >
                  <span className="text-white font-Roboto">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] hover:bg-pink-600`}
                onClick={logoutHandler}
              >
                <span className="text-white font-Roboto">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
