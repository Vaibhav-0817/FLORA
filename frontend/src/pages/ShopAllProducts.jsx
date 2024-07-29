import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar'
import AllProducts from '../components/AllProducts.jsx'

const ShopAllProducts = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex justify-between w-full'>
            <div className='w-18 800px:w-[330px]'>
                <DashboardSidebar active={3} />
            </div>
            <div className='w-10/12 flex justify-center pl-2 pr-2'>
                <AllProducts />
            </div>
        </div>
    </div>
  )
}

export default ShopAllProducts