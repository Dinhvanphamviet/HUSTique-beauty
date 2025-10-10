import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import { dummyOrdersData } from '../assets/data'


const MyOrders = () => {
  const { currency, user } = useAppContext()
  const [orders, setOrders] = useState([])

  const loadOrdersData = () => {
    setOrders(dummyOrdersData)
  };

  useEffect(() => {
    if (user) {
      loadOrdersData()
    }
  }, [user])


  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      <Title title1={"Thông tin"} title2={"Vận chuyển"} titleStyles={"pb-10"} />
      {orders.map((order) => (
        <div key={order._id} className='bg-white p-2 mt-3 rounded-2xl'>
          {/* Order Items */}
          {order.items.map((item, idx) => (
            <div key={idx} className='text-gray-600 flex flex-col lg:flex-row gap-4 mb-3'>
              <div className='flex flex-[2] gap-x-3'>
                <div className='flexCenter bg-primary rounded-xl'>
                  <img src={item.product.images[0]} alt="" className='max-h-20 max-w-20 object-contain' />
                </div>
                <div className='block w-full'>
                  <h5 className='h5 uppercase line-clamp-1'>{item.product.title}</h5>
                  <div className='flex flex-wrap gap-3 max-sm:gap-y-1 mt-1'>
                    <div className='flex items-center gap-x-2'>
                      <h5 className='medium-14'>Gái:</h5>
                      <p>{currency}{item.product.price[item.size]}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <h5 className='medium-14'>Số lượng:</h5>
                      <p>{item.quantity}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <h5 className='medium-14'>Size:</h5>
                      <p>{item.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Order Summary*/}
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3">
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-x-2'>
                <h5 className='medium-14'>Size:</h5>
                <p className='text-gray-400 text-xs break-all'>{order._id}</p>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Trạng thái thanh toán</h5>
                  <p className='text-gray-400 text-sm'>{order.isPaid ? "Done" : "Pending"}</p>
                  <div className='flex items-center gap-x-2'>
                    <h5 className='medium-14'>Phương thức:</h5>
                    <p className='text-gray-400 text-xs break-all'>{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Ngày:</h5>
                  <p className='text-gray-400 text-sm'>{new Date(order.createdAt).toDateString()}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Tổng tiền:</h5>
                  <p className='text-gray-400 text-xs break-all'>{currency}{order.amount}</p>
                </div>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex items-center gap-2'>
                <h5 className='medium-14'>Trạng thái:</h5>
                <div className='flex items-center gap-1'>
                  <span className='min-w-2 h-2 rounded-full bg-green-500' />
                <p>{order.status}</p>
                </div>
              </div>
              <button className='btn-secondary !py-1 !text-xs rounded-sm'>Theo dõi đơn hàng </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders