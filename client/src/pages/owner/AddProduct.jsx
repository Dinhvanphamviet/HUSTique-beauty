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

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
  })

  const [sizePrices, setSizePrices] = useState([])
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
              {allCagegories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <h5 className='h5'>Types</h5>
            <select className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-36'>
              <option value=""> Select Type</option>
              {allTypes.map((t, index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Size and Price */}
        <div className='w-full mt-4'>
          <h5 className='h5'>Size and Prices</h5>
          <div className='flex gap-4 mt-2'>
            <input onChange={(e) => setNewSize(e.target.value)} value={newSize} type="text" placeholder='Size (e.g. 50ml)...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 w-32' />
            <input onChange={(e) => setNewPrice(e.target.value)} value={newPrice} type="number" placeholder='Price' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 w-32' />
            <button type='button' onClick={addSizePrice} className='btn-secondary font-semibold p-1.5 rounded-lg '>Add</button>
          </div>
          <div className="mt-2">
            {sizePrices.map((sp, index) => (
              <div key={index}>
                <span>{sp.size}: ${sp.price}</span>
                <button type='button' onClick={() => removeSizePrice(sp.size)} className='text-red-500'>Remove</button>
              </div>
            ))}
          </div>
        </div>

        {/*Images*/}
        <div className='flex gap-2 mt-2'>
          {Object.keys(images).map((key) => (
            <label key={key} htmlFor={`productImage${key}`} className='ring-1 ring-slate-900/10 overflow-hidden rounded-lg'>
              <input onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })} type="file" accept='image/* id={`productImage${key}`}' hidden />
              <div className='h-16 w-22 bg-white flexCenter'>
                <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadIcon} alt="" className='w-17 overflow-hidden object-contain' />
              </div>
            </label>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <h5 className="h5">Add to Popular</h5>
          <input type="checkbox" checked={inputs.popular} onChange={(e) => setInputs({ ...inputs, popular: e.target.checked })}/>
          </div>
            <button type="submit" disabled={loading} className='btn-secondary font-semibold mt-3 p-2 max-w-36 sm:w-full rounded-xl'>
              {loading ? "Adding" : "Add Product"}
            </button>
      </form>
    </div>
  )
}

export default AddProduct