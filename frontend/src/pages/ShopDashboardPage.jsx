import React from "react";
import DashboardHeader from "../components/ShopLayout/DashboardHeader.jsx";
import DashboardSidebar from "../components/ShopLayout/DashboardSidebar.jsx";
import DashboardHero from '../components/ShopLayout/DashboardHero.jsx'

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="800px:w-[330px] w-18">
          <DashboardSidebar active={1} />
        </div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
