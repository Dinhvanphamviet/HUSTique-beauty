import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/data'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, currency } = useAppContext()
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalOrders: 0,
    totalRevenue: 0,
  })

  const getDashboardData = () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => {
    if (user) {
      getDashboardData()
    }
  }, [user])

  return (
    <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97px] overflow-y-scroll lg:w-11/12 bg-primary shadow rounded-xl'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <img src={assets.graph} alt="" className='hidden sm:flex w-8' />
          <div>
            <h4 className='h4'>{dashboardData?.totalOrders?.toString().padStart(2, "0")}</h4>
            <h5 className='h5 text-secondary'>Total Sales</h5>
          </div>
        </div>
        <div>
          <img src={assets.dollar} alt="" className='hidden sm:flex w-8' />
          <div>
            <h4 className='h4'>{dashboardData?.totalOrders?.toString().padStart(2, "0")}</h4>
            <h5 className='h5 text-secondary'>Total Sales</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
