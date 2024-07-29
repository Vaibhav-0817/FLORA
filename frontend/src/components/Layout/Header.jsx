import React, {  useState } from "react";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { categoriesData } from "../../static/data.js";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import Dropdown from "./Dropdown.jsx";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller,seller } = useSelector((state)=>state.seller)
  const {cart} = useSelector((state)=>state.cart)
  const {wishlist} = useSelector((state)=>state.wishlist)
  const {allProducts} = useSelector((state)=>state.products)
  const [searchTerm, SetSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleChange = (e) => {
    const term = e.target.value;
    SetSearchTerm(term);
    const filteredProducts =
      term.length !== 0
        ? allProducts &&
          allProducts.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
          )
        : null;
    setSearchData(filteredProducts);
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 110) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={logo}
                className="h-[50px] max-w-[150px] object-contain"
                alt="logo"
              />
            </Link>
          </div>
          <div className="w-1/2 relative">
            <input
              type="text"
              placeholder="Search flowers..."
              value={searchTerm}
              onChange={handleChange}
              className="h-[40px] w-full px-2 border-[2px] rounded-md outline-none border-pink-500 appearance-none focus:outline-none placeholder:text-gray-500"
            ></input>
            <AiOutlineSearch
              size={30}
              className="absolute right-1 top-1.5 cursor-pointer"
            ></AiOutlineSearch>
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-white shadow-sm shadow-black w-full rounded-md z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i._id;
                    return (
                      <Link to={`/product/${d}`}>
                        <div className="w-full flex items-start py-3 text-gray-900">
                          <img
                            src={`${i.images[0].url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          ></img>
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          { isSeller ? ( <Link to={`/shop/${seller._id}`}>
          <div
            className={`${styles.button} border hover:bg-pink-600 border-transparent`}
          >
            
              <h1 className="text-white flex items-center font-medium">
                Seller Page{" "}
                <IoIosArrowForward className="ml-1"></IoIosArrowForward>
              </h1>
          </div>
          </Link>) : (<Link to="/shop-create">
          <div
            className={`${styles.button} border hover:bg-pink-600 border-transparent`}
          >
            
              <h1 className="text-white flex items-center font-medium">
                Become Seller{" "}
                <IoIosArrowForward className="ml-1"></IoIosArrowForward>
              </h1>
          </div>
          </Link>)}
          
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10 " : null
        } transition hidden 800px:flex items-center justify-between w-full bg-pink-500 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div onClick={() => setDropdown(!dropdown)}>
            <div className="relative h-[60px] hidden lg:block w-[270px] mt-[10px]">
              <BiMenuAltLeft
                size={30}
                color="#111827"
                className="absolute top-3 left-2"
              />
              <button className="select-none h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-gray-900 text-lg font-[500] rounded-t-md ">
                Flower Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
              ></IoIosArrowDown>
              {dropdown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropdown={setDropdown}
                ></Dropdown>
              ) : null}
            </div>
          </div>
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} />
                <span className="absolute right-0 top-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-gray-900 font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} />
                <span className="absolute right-0 top-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-gray-900 font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user.avatar.url}`}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    ></img>
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} />
                  </Link>
                )}
              </div>
            </div>
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10 " : null
        } w-full h-[70px] bg-[#101426] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full h-full items-center flex justify-between">
          <div>
            <BiMenuAltLeft
              color="white"
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={logo}
                className="h-[50px] max-w-[150px] object-contain mt-1 cursor-pointer"
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-5" onClick={()=>setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} color="white" />
              <span className="absolute right-0 top-0 rounded-full bg-pink-500 w-4 h-4 p-0 m-0 text-gray-900 font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          </div>
        </div>
        {open && (
          <div className="fixed w-full z-20 h-full top-0 left-0 bg-[#00000070]">
            <div className="w-3/5 fixed bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="flex w-full pr-3 justify-between">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="ml-3 mt-5" />
                    <span className="absolute right-0 top-0 rounded-full bg-pink-500 w-4 h-4 p-0 m-0 text-gray-900 font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-3 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-11/12 mx-auto h-[40px]">
                <input
                  type="search"
                  placeholder="Search Flowers..."
                  className="h-[40px] w-full px-2 border-pink-500 border-[2px] rounded-md appearance-none outline-none focus:outline-none placeholder-gray-500"
                  onChange={handleChange}
                  value={searchTerm}
                />
                {searchData && (
                  <div className="absolute bg-white w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i._id;
                      return (
                        <Link to={`/product/${d}`}>
                          <div className="flex items-center pb-2">
                            <img
                              src={`${i.images[0].url}`}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              {isSeller ? (<Link to={`/shop/${seller._id}`}>
              <div
            className={`${styles.button} border hover:bg-pink-600 border-transparent ml-4`}
          >
            
              <h1 className="text-white flex items-center font-medium">
                Seller Page{" "}
                <IoIosArrowForward className="ml-1"></IoIosArrowForward>
              </h1>
          </div>
          </Link>) : (<Link to="/shop-create">
              <div
            className={`${styles.button} border hover:bg-pink-600 border-transparent ml-4`}
          >
            
              <h1 className="text-white flex items-center font-medium">
                Become Seller{" "}
                <IoIosArrowForward className="ml-1"></IoIosArrowForward>
              </h1>
          </div>
          </Link>)}
              
          <br />
          <br />
          <br />
          <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-pink-500"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-gray-950 font-Roboto"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-gray-950 font-Roboto"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
