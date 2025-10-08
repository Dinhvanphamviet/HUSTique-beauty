import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/data'

const Cart = () => {

  const { navigate, products, currency, cartItems } = useAppContext()
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, products, cartItems)

  const increment = (id, size) => {

  }

  const decrement = (id, size) => {

  }

  return products && cartItems ? (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        {/*Left Side*/}
        <div className='flex flex-[2] flex-col gap-2 text-[95%]'>
          <Title title1={"Cart"} title2={"Overview"} titleStyles={"pb-5"} />
          <div className='grid grid-cols-[6fr_2fr_11fr] font-medium bg-white p-2 rounded-xl'>
            <h5 className='h5 text-left'> Product Details</h5>
            <h5 className='h5 text-center'> Subtotal</h5>
            <h5 className='h5 text-center'> Action</h5>
          </div>
          {cartData.map((item, i) => {
            const product = products.find((product) => product._id === item._id)
            const quantity = cartItems[item._id][item.size]
            return (
              <div key={i} className='grid grid-cols-[6fr_2fr_1fr] items-center bg-white p-2 rounded-xl'>
                <div className='flex items-center md:gap-6 gap-3'>
                  <div className='flex bg-primary rounded-xl'>
                    <img src={product.images[0]} alt="" className='w-20' />
                  </div>
                  <div >
                    <h5 className='hidden sm:block h5 line-clamp-1'>{product.title}</h5>
                    <div className='bold-14 flexStart gap-2 mb-1'>Size: <p>{item.size}</p></div>
                    <div className='flexBetween'>
                      <div className='flex items-center ring-1 ring-slate-900/15 rounded-full overflow-hidden bg-primary'>
                        <button onClick={()=>decrement(item._id,item.size)} className='p-1.5 bg-secondary text-white rounded-full shadow-md cursor-point'> <img src={assets.minus} alt="" width={11} className='invert' /> </button>
                        <p className='px-2'>{quantity}</p>
                        <button onClick={()=>increment(item._id,item.size)} className='p-1.5 bg-secondary text-white rounded-full shadow-md cursor-point'> <img src={assets.plus} alt="" width={11} className='invert' /> </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center bold-16'>
                  {currency}{product.price[item.size] * quantity}.00</div>
                <button className='cursor-pointer mx-auto'><img src={assets.cartRemove} alt="" width={22} /></button>
              </div>
            )
          })}
        </div>
        {/*Left Side*/}
        <div className='flex flex-1 flex-col'>
          <div className='max-w-[379px] w-full bg-white p-5 py-10 max-md:mt-16 rounded-xl'>
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Cart