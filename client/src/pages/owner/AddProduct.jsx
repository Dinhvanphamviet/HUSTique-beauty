import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/data'
import toast from 'react-hot-toast'

const AddProduct = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  })

  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
  })

  const [sizePrice, setSizePrice] = useState([])
  const [newSize, setNewSize] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [loading, setLoading] = useState(false)

  const allCagegories = ["Chăm sóc tóc", "Chăm sóc cơ thể", "Chăm sóc da mặt"]
  const allTypes = ["Dầu gội", "Sữa tắm", "Sữa rửa mặt", "Kem dưỡng ẩm", "Mặt nạ", "Serum", "Xịt khoáng"]
  const addSizePrice = () => {
    if (!newSize || !newPrice) {
      toast.error("Vui lòng nhập đầy đủ thông tin size và giá")
      return
    }
    if (sizePrices.some((sp) => sp.size === newSize)) {
      toast.error("Kích thước đã tồn tại")
      return
    }
    setSizePrices([...sizePrices, { size: newSize, price: parseFloat(newPrice) }])
    setNewSize("")
    setNewPrice("")
  }

  const removeSizePrice = (size) => {
    setSizePrices(sizePrices.filter((sp) => sp.size !== size))
  }

  return (
    <div>
      <form>
        <div className='w-full'>
          <h5 className='h5'>Tên sản phẩm</h5>
          <input type="text" placeholder='Type here...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-full' />
        </div>
        <div className='w-full'>
          <h5 className='h5'>Mô tả sản phẩm</h5>
          <textarea type="text" placeholder='Type here...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-full' />
        </div>
        <div className='flex gap-4 flex-wrap'>
          <div>
            <h5 className='h5'>Category</h5>
            <select className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-38'>
            <option value=""> Select Category</option>
              {allCagegories.map((cat,index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <h5 className='h5'>Types</h5>
            <select className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-36'>
            <option value=""> Select Type</option>
              {allTypes.map((t,index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct