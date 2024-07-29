import React from "react";
import styles from "../styles/styles";
import ShopInfo from '../components/ShopInfo.jsx'
import ShopProfileData from '../components/ShopProfileData.jsx'

const ShopHomePage = () => {
  return (
    <div className={`${styles.section}`}>
      <div className="w-full flex py-10 justify-between flex-col 800px:flex-row">
        <div className="800px:w-1/4 bg-white rounded-[4px] shadow-sm overflow-y-scroll 800px:h-[90vh] h-[80vh] 800px:sticky top-10 left-0 z-10 w-full">
          <ShopInfo isOwner={true}/>
        </div>
        <div className="800px:w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
