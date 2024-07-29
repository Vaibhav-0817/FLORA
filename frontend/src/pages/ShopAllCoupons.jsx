import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar'
import AllCoupons from '../components/AllCoupons.jsx'

const ShopAllCoupons = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex justify-between w-full'>
            <div className='w-18 800px:w-[330px]'>
                <DashboardSidebar active={9} />
            </div>
            <div className='w-10/12 flex justify-center pl-2 pr-2'>
                <AllCoupons />
            </div>
        </div>
    </div>
  )
}

export default ShopAllCoupons