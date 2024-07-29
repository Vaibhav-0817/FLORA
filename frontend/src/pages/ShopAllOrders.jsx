import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar'
import AllOrders from '../components/AllOrders.jsx'

const ShopAllOrders = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex justify-between w-full'>
            <div className='w-18 800px:w-[330px]'>
                <DashboardSidebar active={2} />
            </div>
            <div className='w-10/12 flex justify-center pl-2 pr-2'>
                <AllOrders />
            </div>
        </div>
    </div>
  )
}

export default ShopAllOrders