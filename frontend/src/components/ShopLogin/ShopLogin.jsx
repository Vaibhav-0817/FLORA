import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

const ShopLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/shop/lgn-seller`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate('/dashboard');
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Link to="/">
        <img
          src={logo}
          className="absolute top-[21px] left-[37vw] h-[55px] w-[26vw] object-contain"
          alt="logo"
        />
      </Link>
      <div className="min-h-screen bg-gray-900 bg-[url('./assets/bglgsu.jpg')] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-contain">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-Roboto">
            Login to your Seller account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md opacity-90">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    required
                    value={email}
                    type="email"
                    autoComplete="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block shadow-sm rounded-md border border-gray-400 w-full px-3 py-2 placeholder-gray-700 focus:outline-none ring-0 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    required
                    value={password}
                    type={visible ? "text" : "password"}
                    autoComplete="current-password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block shadow-sm rounded-md border border-gray-400 w-full px-3 py-2 placeholder-gray-700 focus:outline-none ring-0 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      size={25}
                      onClick={() => setVisible(false)}
                      className="absolute top-1.5 right-2 cursor-pointer"
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      size={25}
                      onClick={() => setVisible(true)}
                      className="absolute top-1.5 right-2 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 focus:ring-pink-500  border-gray-400 rounded accent-pink-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium text-pink-500 hover:text-pink-600"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group w-full h-[40px] flex justify-center relative border py-2 px-4 font-medium text-sm text border-transparent text-white rounded-md bg-pink-500 hover:bg-pink-600"
                >
                  Submit
                </button>
              </div>
              <div className={`${styles.normalFlex} w-full`}>
                <h4>Don't have a account?</h4>
                <Link
                  to="/shop-create"
                  className="text-pink-500 hover:text-pink-600  pl-2"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopLogin;
