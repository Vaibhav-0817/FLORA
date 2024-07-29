import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../redux/actions/order";
import styles from "../styles/styles";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [deliveredOrder, setDeliveredOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    const orderData =
      orders && orders.filter((item) => item.status === "Delivered");
    setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc,item)=>acc + item.totalPrice,0);
  const availableBalance = (0.9 * totalEarningWithoutTax).toFixed(2)
  return (
    <div className="w-full p-8 h-[90vh] flex">
      <div className="w-full bg-white rounded flex flex-col items-center justify-center">
        <h5 className="text-[20px] pb-4">Available Balance ₹{availableBalance}</h5>
        <div className={`${styles.button} text-white`}>
            Withdraw Money
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
