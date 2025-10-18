import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'


const MyOrders = () => {
  const { currency, user, getToken, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const loadOrdersData = async () => {
    if (!user) return
    try {
      const { data } = await axios.post("/api/orders/userorders", {}, { headers: { Authorization: `Bearer ${await getToken()}` } });
      if (data.success) {
        setOrders(data.orders.reverse())

      }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (user) {
      loadOrdersData()
    }
  }, [user])


  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      <Title title1={"Đơn hàng"} title2={"Của Tôi"} titleStyles={"pb-10"} />
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
                      <h5 className='medium-14'>Giá:</h5>
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3">
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-x-2'>
                <h5 className='medium-14'>Mã đơn hàng:</h5>
                <p className='text-gray-400 text-sm break-all'>{order._id}</p>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Trạng thái thanh toán:</h5>
                  <p className='text-gray-400 text-sm'>{order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                  <div className='flex items-center gap-x-2'>
                    <h5 className='medium-14'>Phương thức:</h5>
                    <p className='text-gray-400 text-sm break-all'>{order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua Stripe'}</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Ngày:</h5>
                  <p className='text-gray-400 text-sm'>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className='flex items-center gap-x-2'>
                  <h5 className='medium-14'>Tổng tiền:</h5>
                  <p className='text-gray-400 text-sm break-all'>{currency}{order.amount}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">Trạng thái:</span>
                <div className="flex items-center gap-1 text-sm">
                  <span
                    className={`min-w-2 h-2 rounded-full ${order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Out for delivery"
                          ? "bg-blue-500"
                          : order.status === "Shipping"
                            ? "bg-blue-400"
                            : order.status === "Packing"
                              ? "bg-yellow-400"
                              : order.status === "Order Placed"
                                ? "bg-gray-400"
                                : "bg-gray-300"
                      }`}
                  />
                  <p>
                    {order.status === "Delivered"
                      ? "Đã giao hàng thành công"
                      : order.status === "Out for delivery"
                        ? "Đang giao hàng"
                        : order.status === "Shipping"
                          ? "Đang vận chuyển"
                          : order.status === "Packing"
                            ? "Đang chuẩn bị hàng"
                            : order.status === "Order Placed"
                              ? "Đã đặt hàng"
                              : "Không xác định"}
                  </p>
                </div>
              </div>

              <button className="btn-secondary !py-1 !text-sm rounded-sm">
                Theo dõi đơn hàng
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders