import React, { useState, useEffect } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const AddressForm = () => {

  const { navigate, user, getToken, axios } = useAppContext()

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",      // Tỉnh / Thành phố
    state: "",     // Quận / Huyện
    country: "",   // Xã / Phường
    zipcode: "",
    phone: "",
  })

  // Dữ liệu địa phương
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  // Chọn hiện tại
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')

  // Fetch danh sách tỉnh thành
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then(res => res.json())
      .then(setProvinces)
      .catch(err => console.error(err))
  }, [])

  // Khi chọn Tỉnh → fetch Quận
  const handleProvinceChange = async (e) => {
    const code = e.target.value
    setSelectedProvince(code)
    setSelectedDistrict('')
    setSelectedWard('')
    setWards([])
    if (code) {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      const data = await res.json()
      setDistricts(data.districts)
      const provinceName = provinces.find(p => p.code == code)?.name || ''
      setAddress(prev => ({ ...prev, city: provinceName }))
    }
  }

  // Khi chọn Quận → fetch Xã
  const handleDistrictChange = async (e) => {
    const code = e.target.value
    setSelectedDistrict(code)
    setSelectedWard('')
    if (code) {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      const data = await res.json()
      setWards(data.wards)
      const districtName = districts.find(d => d.code == code)?.name || ''
      setAddress(prev => ({ ...prev, state: districtName }))
    }
  }

  // Khi chọn Xã
  const handleWardChange = (e) => {
    const code = e.target.value
    setSelectedWard(code)
    const wardName = wards.find(w => w.code == code)?.name || ''
    setAddress(prev => ({ ...prev, country: wardName }))
  }

  // Xử lý nhập liệu khác
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setAddress((data) => ({ ...data, [name]: value }))
  }

  // Submit form
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
      <div className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        <form onSubmit={onSubmitHandler} className='flex flex-[2] flex-col gap-2 text-[95%]'>
          <Title title1={"Thông tin"} title2={"vận chuyển"} titleStyles={"pb-5"} />

          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={address.firstName} name='firstName' type="text" placeholder="Họ"
              className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
            <input onChange={onChangeHandler} value={address.lastName} name='lastName' type="text" placeholder="Tên"
              className='w-1/2 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          </div>

          <input onChange={onChangeHandler} value={address.email} name='email' type="text" placeholder="Email"
            className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          <input onChange={onChangeHandler} value={address.phone} name='phone' type="text" placeholder="Số điện thoại"
            className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />
          <input onChange={onChangeHandler} value={address.street} name='street' type="text" placeholder="Địa chỉ cụ thể"
            className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />

          {/* Bộ chọn địa chỉ Việt Nam */}
          <div className='flex gap-3'>
            <select onChange={handleProvinceChange} value={selectedProvince}
              className='w-1/3 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm 
              focus:ring-2 focus:ring-rose-200 transition-all cursor-pointer hover:border-rose-300'>
              <option value="">Tỉnh / Thành phố</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>

            <select onChange={handleDistrictChange} value={selectedDistrict} disabled={!selectedProvince}
              className='w-1/3 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm 
              focus:ring-2 focus:ring-rose-200 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:border-rose-300'>
              <option value="">Quận / Huyện</option>
              {districts.map(d => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>

            <select onChange={handleWardChange} value={selectedWard} disabled={!selectedDistrict}
              className='w-1/3 px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm 
              focus:ring-2 focus:ring-rose-200 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:border-rose-300'>
              <option value="">Xã / Phường</option>
              {wards.map(w => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
          </div>

          <input onChange={onChangeHandler} value={address.zipcode} name='zipcode' type="text" placeholder="Mã zip"
            className='px-4 py-2 border border-slate-300/70 rounded-full bg-white outline-none text-sm focus:ring-2 focus:ring-rose-200 transition-all' />

          <button type="submit" className='btn-secondary border border-slate-300/70 rounded-full w-1/2 mt-2'>
            Thêm địa chỉ
          </button>
        </form>

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
