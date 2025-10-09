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
    <div>
      <Title title1={"Thông tin"} title2={"Vận chuyển"} titleStyles={"pb-10"} />
      {orders.map((order) => (
        <div key={order._id}>
          {/* Order Items */}
          {order.items.map((item, idx) => (
            <div key={idx}>
              <div>
                <div>
                  <img src={item.product.images[0]} alt="" className='max-h-20 max-w-20 object-contain'/>
                </div>
                <div className='block w-full'>
                  <h5 className='h5 uppercase line-clamp-1'>{item.product.title}</h5>
                  <div>
                    <div className='flex items-center gap-x-2'>
                      <h5>Price:</h5>
                      <p>{currency}{item.product.price[item.size]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MyOrders