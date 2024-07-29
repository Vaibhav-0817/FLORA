import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar'
import CreateEvent from '../components/CreateEvent.jsx'

const ShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex items-center justify-between w-full'>
            <div className='w-18 800px:w-[330px]'>
                <DashboardSidebar active={6} />
            </div>
            <div className='w-full flex justify-center'>
                <CreateEvent />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents