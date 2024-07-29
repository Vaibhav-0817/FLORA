import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const ShopActivationPage = () => {
  const { activation_token } = useParams();
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);
 
  return <div style={{
     width: "100%",
     height: "100vh",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     color: "white",
  }} className="font-Roboto text-3xl bg-[url('./assets/bglgsu.jpg')] bg-contain ">
  {
    error ? (
        <p>Your token is invalid or has expired</p>
    ) : (
        <p>Your account has been successfully created , kindly go back to the login page</p>
    )
  }

  </div>;
};

export default ShopActivationPage;