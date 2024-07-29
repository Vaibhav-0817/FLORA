import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar'
import CreateProduct from '../components/CreateProduct.jsx'

const ShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex items-center justify-between w-full'>
            <div className='w-18 800px:w-[330px]'>
                <DashboardSidebar active={4} />
            </div>
            <div className='w-full flex justify-center'>
                <CreateProduct />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateProduct