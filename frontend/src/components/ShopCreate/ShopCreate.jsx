import React,{useState} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png"
import Loader from '../Layout/Loader.jsx';

const ShopCreate = () => {
  const [loading,setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState();
  const[phoneNumber,setPhoneNumber] = useState('');
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState('');

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`${server}/shop/create-shop`, {name,email,password,avatar,zipCode,address,phoneNumber})
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setAddress('');
        setZipCode('');
        setPhoneNumber('');
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setAddress('');
        setZipCode('');
        setPhoneNumber('');
        setLoading(false)
      });
  };

  return (
    <>
    {loading ? (<Loader />) : (<><Link to="/">
              <img
                src={logo}
                className="absolute top-[21px] left-[37vw] h-[55px] w-[26vw] object-contain"
                alt="logo"
              />
            </Link>
            <div className="min-h-screen bg-gray-900 bg-[url('./assets/bglgsu.jpg')] bg-contain flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="lg:mt-16 mt-6 text-center text-2xl 800px:text-3xl font-extrabold text-white font-Roboto">
          Seller Registration
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto opacity-90 sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10 w-11/12 mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-medium text-gray-900"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  required
                  value={name}
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block shadow-sm rounded-md border border-gray-400 w-full px-3 py-2 placeholder-gray-700 focus:outline-none ring-0 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>
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
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  required
                  value={phoneNumber}
                  type="text"
                  name="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block shadow-sm rounded-md border border-gray-400 w-full px-3 py-2 placeholder-gray-700 focus:outline-none ring-0 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  required
                  value={address}
                  type="address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block shadow-sm rounded-md border border-gray-400 w-full px-3 py-2 placeholder-gray-700 focus:outline-none ring-0 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-900"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  required
                  value={zipCode}
                  type="text"
                  name="zipcode"
                  onChange={(e) => setZipCode(e.target.value)}
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
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-900"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-900 bg-white hover:border-pink-600"
                >
                  <span>Upload a file</span>
                  <input
                    required
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
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
              <h4>Already have a account?</h4>
              <Link
                to="/shop-login"
                className="text-pink-500 hover:text-pink-700  pl-2"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div></>)}
    </>
  );
};

export default ShopCreate;