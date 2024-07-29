import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import DashboardMessages from '../components/DashboardMessages.jsx'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar.jsx'

const ShopInboxPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSidebar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default ShopInboxPage