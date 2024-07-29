import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../redux/actions/product";
import { getAlleventsShop } from "../redux/actions/event";
import Ratings from "./Ratings";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAlleventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);
  const allReviews =
    products && products.map((product) => product.reviews).flat();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
        <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[600] 800px:text-[20px] text-[16px] ${
              active === 1 ? "text-pink-500" : "text-white"
            } cursor-pointer font-Roboto 800px:pr-5 pr-3`}
          >
            Shop Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`font-[600] 800px:text-[20px] text-[16px] ${
              active === 2 ? "text-pink-500" : "text-white"
            } cursor-pointer font-Roboto 800px:pr-5 pr-3`}
          >
            Running Events
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`font-[600] 800px:text-[20px] text-[16px] ${
              active === 3 ? "text-pink-500" : "text-white"
            } cursor-pointer font-Roboto 800px:pr-5 pr-3`}
          >
            Shop Reviews
          </h5>
        </div>
        </div>
        <div>
          {
            isOwner && (<div>
              <Link to='/dashboard'>
                <div className={`${styles.button} !rounded-[4px] 800px:!h-[42px] !w-28 800px:!w-[150px] font-Poppins hover:bg-pink-600`}>
                  <span className="text-white ">Dashboard</span>
                </div>
              </Link>
            </div>)
          }
        </div>
      </div>

      <br />
      { active===1 && (
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[25px] mb-12 border-0">
        {
          products && products.map((i,index)=>{
            return (
              <ProductCard data={i} key={index} isShop={true} />
            )
          })
        }
      </div>
     ) }

     {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px] text-white">
              No Events Yet!
            </h5>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="w-full text-white">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-4">
                <img
                  src={`${item.user.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="font-[600] pr-2">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p className="font-[400] text-gray-200">{item?.comment}</p>
                  <p className="text-[14px] text-gray-200">{Math.ceil((new Date() - new Date(item.createdAt) )/(1000 * 60 * 60 * 24))} days ago</p>
                </div>
              </div>
            ))}
          {allReviews && allReviews.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Reviews Yet!
            </h5>
          )}
        </div>
      )}

    </div>
  );
};

export default ShopProfileData;
