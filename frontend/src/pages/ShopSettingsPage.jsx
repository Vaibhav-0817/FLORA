import React from 'react'
import Footer from '../components/Layout/Footer'
import ShopSettings from '../components/ShopSettings.jsx';
import DashboardHeader from '../components/ShopLayout/DashboardHeader.jsx';

const ShopSettingsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <ShopSettings />
        <Footer />
    </div>
  )
}

export default ShopSettingsPage