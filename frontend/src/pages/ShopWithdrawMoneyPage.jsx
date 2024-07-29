import React from 'react'
import DashboardSidebar from '../components/ShopLayout/DashboardSidebar'
import DashboardHeader from '../components/ShopLayout/DashboardHeader'
import WithdrawMoney from '../components/WithdrawMoney.jsx'

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-20">
          <DashboardSidebar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  )
}

export default ShopWithdrawMoneyPage