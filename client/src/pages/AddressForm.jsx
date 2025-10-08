import React, { useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const AddressForm =() => {

  const {navigate, user, method, setMethod} = useAppContext()
  const [address, setAddress] =useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      {/*Container*/}
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        {/*Left Side*/}
        <form className='flex flex-[2] flex-col gap-2 text-[95%]'>
          <Title title1={"Thông tin"} title2={"vận chuyển"} titleStyles={"pb-5"} />
          <div className='flex gap-3'>
            <input value={address.firstName} name='firstName' type="text" placeholder="Họ" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
            <input value={address.lastName} name='lastName' type="text" placeholder="Tên" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
          </div>
          <input value={address.email} name='email' type="text" placeholder="Email" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
          <input value={address.phone} name='phone' type="text" placeholder="Số điện thoại" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
          <input value={address.street} name='street' type="text" placeholder="Xã" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
          <input value={address.phone} name='phone' type="text" placeholder="Số điện thoại" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none'/>
          <div className='flex gap-3'>
            <input value={address.city} name='firstName' type="text" placeholder="Thành phố" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
            <input value={address.state} name='lastName' type="text" placeholder="Quận" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
          </div>
          <div className='flex gap-3'>
            <input value={address.zipcode} name='firstName' type="text" placeholder="Mã zip" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
            <input value={address.country} name='lastName' type="text" placeholder="Nước" className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2'/>
          </div>
          <button type="submit" className='btn-dark rounded-md w-1/2 mt-2'>Thêm địa chỉ</button>
        </form>
        {/*Right Side*/}
        <div className='flex flex-1 flex-col'>
          <div className='max-w-[379px] w-full bg-white p-5 py-10 max-md:mt-16 rounded-xl'>
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForm