import React, { useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { data } from 'react-router-dom'
import { useEffect } from 'react'

const AddressForm = () => {

  const { navigate, user, getToken, axios } = useAppContext()
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = async (e) => {
    const name = e.target.name
    const value = e.target.value
    setAddress((data) => ({ ...data, [name]: value }))
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/addresses/add", { address }, { headers: { Authorization: `Bearer ${await getToken()}` } });
      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  useEffect(() => {
    if (!user) {
      navigate('/cart')
    }
  }, [])

  return (
    <div className='max-padd-container py-16 pt-28 bg-primary'>
      {/*Container*/}
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        {/*Left Side*/}
        <form onSubmit={onSubmitHandler} className='flex flex-[2] flex-col gap-2 text-[95%]'>
          <Title title1={"Thông tin"} title2={"vận chuyển"} titleStyles={"pb-5"} />
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={address.firstName} name='firstName' type="text" placeholder="Họ" className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
            <input onChange={onChangeHandler} value={address.lastName} name='lastName' type="text" placeholder="Tên" className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          </div>
          <input onChange={onChangeHandler} value={address.email} name='email' type="text" placeholder="Email" className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          <input onChange={onChangeHandler} value={address.phone} name='phone' type="text" placeholder="Số điện thoại" className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          <input onChange={onChangeHandler} value={address.street} name='street' type="text" placeholder="Địa chỉ cụ thể" className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={address.city} name='city' type="text" placeholder="Thành phố" className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
            <input onChange={onChangeHandler} value={address.state} name='state' type="text" placeholder="Quận" className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={address.zipcode} name='zipcode' type="text" placeholder="Mã zip" className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
            <input onChange={onChangeHandler} value={address.country} name='country' type="text" placeholder="Nước" className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          </div>
          <button type="submit" className='btn-secondary border border-slate-300/70 rounded-full w-1/2 mt-2'>Thêm địa chỉ</button>
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