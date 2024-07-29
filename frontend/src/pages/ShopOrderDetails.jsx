import React from 'react'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import Footer from '../components/Layout/Footer'
import OrderDetails from '../components/OrderDetails.jsx'

const ShopOrderDetails = () => {
  return (
    <div>
    <DashboardHeader />
    <OrderDetails />
    <Footer />
    </div>
  )
}

export default ShopOrderDetails