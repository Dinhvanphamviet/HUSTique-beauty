import React, { use, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { useEffect } from 'react'

const CartTotal = () => {
  const { navigate, currency, cartItems, setCartItems, method, setMethod, delivery_charges, addToCart, getCartCount, updateQuantity, getCartAmount, axios, user, getToken } = useAppContext()

  const [addresses, setAddresses] = useState([])
  const [showAddress, setShowAddress] = useState(false)
  const [selectAddress, setSelectAddress] = useState(null)


  const getAddress = async () => {
    if (user) {
      try {
        const { data } = await axios.get("/api/addresses", { headers: { Authorization: `Bearer ${await getToken()}` } });
        if (data.success) {
          setAddresses(data.addresses);
          if (data.addresses.length > 0) {
            setSelectAddress(data.addresses[0]);
          }
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    if(user) {
      getAddress()
    }
  }, [user])
  

  return (
    <div>
      <h3 className='bold-22'> Chi tiết đơn hàng <span className='bold-14 text-secondary'>({getCartCount()}) sản phẩm</span></h3>
      <hr className='border-gray-300 my-5' />
      {/*Payment & Address*/}
      <div className='mb-5'>
        <div className='my-5'>
          <h4 className='h4 mb-5'>Giao hàng đến đâu?</h4>
          <div className='relative flex justify-between items-start mt-2'>
            <p>{selectAddress
              ? `${selectAddress.street}, ${selectAddress.country},${selectAddress.state}, ${selectAddress.city}`
              : "No address found"} </p>
            <button onClick={() => setShowAddress(!showAddress)} className='text-secondary medium-14 hover:underline cursor-pointer'> Thay đổi</button>
            {showAddress && (
              <div className='absolute top-10 py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full'>
                {addresses.map((address, index) => (
                  <p key={index} onClick={() => { setSelectAddress(address); setShowAddress(false)}} className='p-2 cursor-pointer hover:bg-gray-100 medium-14'>
                    {address.street}, {address.city}, {address.state}, {address.country}
                  </p>
                ))}
                <p onClick={() => { navigate('/address-form'); scrollTo(0, 0) }} className='p-2 text-center cursor-pointer hover:bg-tertiary hover:text-white'> Thêm địa chỉ mới</p>
              </div>
            )}
          </div>
        </div>
        <hr className='border-gray-300 mt-5' />
        <div className='my-6'>
          <h4 className='h4 mb-5'>Phương thức thanh toán</h4>
          <div className='flex gap-3'>
            <div onClick={() => setMethod("COD")} className={`${method === "COD" ? "btn-secondary":"btn-outline"} !py-1 text-xs cursor-pointer text-center`}>
              Thanh toán khi nhận hàng
            </div>
            <div onClick={() => setMethod("Stripe")} className={`${method === "Stripe" ? "btn-secondary":"btn-outline"} !py-1 text-xs cursor-pointer text-center`}>
              Thanh toán qua Stripe
            </div>
          </div>
        </div>
        <hr className='border-gray-300 mt-5' />
      </div>
      <div className='mt-4 space-y-2'>
        <div className='flex justify-between'>
          <h5 className='h5'> Giá sản phẩm</h5>
          <p className='font-bold'>{currency}{getCartAmount()}</p>
        </div>
        <div className='flex justify-between'>
          <h5 className='h5'> Phí vận chuyển</h5>
          <p className='font-bold'>{currency}{getCartAmount() === 0? "0.00" : `${delivery_charges}.00`}</p>
        </div>
        <div className='flex justify-between'>
          <h5 className='h5'> Thuế(2%)</h5>
          <p className='font-bold'>{currency}{(getCartAmount()*2)/100}</p>
        </div>
        <div className='flex justify-between'>
          <h4 className='h4'> Tổng thanh toán:</h4>
          <p className='bold-18'>{currency}{getCartAmount() === 0? "0.00" : getCartAmount()+ delivery_charges+(getCartAmount()*2)/100}</p>
        </div>
      </div>
      <button className="btn-secondary w-full mt-8 !rounded-md">
            Tiến hành đặt hàng
      </button>
    </div>
  )
}

export default CartTotal