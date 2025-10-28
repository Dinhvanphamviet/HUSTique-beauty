import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/data'
import toast from 'react-hot-toast'
import MDEditor from '@uiw/react-md-editor'

const AddProduct = () => {

  const { axios, getToken } = useAppContext()

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
      toast.error("Vui lòng nhập đầy đủ thông tin dung tích và giá.")
      return
    }
    if (sizePrices.some((sp) => sp.size === newSize)) {
      toast.error("Dung tích này đã được thêm trước đó.")
      return
    }
    setSizePrices([...sizePrices, { size: newSize, price: parseFloat(newPrice) }])
    setNewSize("")
    setNewPrice("")
  }

  const removeSizePrice = (size) => {
    setSizePrices(sizePrices.filter((sp) => sp.size !== size))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!inputs.title || !inputs.description || !inputs.category || !inputs.type) {
      toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm.")
      return
    }
    if (sizePrices.length === 0) {
      toast.error("Vui lòng thêm ít nhất một dung tích và giá.")
      return
    }

    const hasImage = Object.values(images).some((img) => img !== null)
    if (!hasImage) {
      toast.error("Vui lòng tải lên ít nhất một hình ảnh sản phẩm.")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      const prices = {}
      const sizes = []
      sizePrices.forEach((sp) => {
        prices[sp.size] = sp.price
        sizes.push(sp.size)
      })

      const productData = {
        title: inputs.title,
        description: inputs.description,
        category: inputs.category,
        type: inputs.type,
        popular: inputs.popular,
        price: prices,
        sizes: sizes,
      }

      formData.append("productData", JSON.stringify(productData))

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key])
        }
      })

      const { data } = await axios.post("api/products", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })

      if (data.success) {
        toast.success("Thêm sản phẩm thành công!")
        setInputs({
          title: "",
          description: "",
          category: "",
          type: "",
          popular: false,
        })
        setSizePrices([])
        setImages({ 1: null, 2: null, 3: null, 4: null })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-primary shadow rounded-xl'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-3.5 px-2 text-sm w-full lg:w-11/12'>

        {/* Tên sản phẩm */}
        <div className='w-full'>
          <h5 className='h5'>Tên sản phẩm</h5>
          <input
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            value={inputs.title}
            type="text"
            placeholder='Nhập tên sản phẩm...'
            className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-full'
          />
        </div>

        {/* Mô tả (Markdown) */}
        <div className='w-full' data-color-mode="light">
          <h5 className='h5'>Mô tả sản phẩm</h5>
          <div className='ring-1 ring-slate-900/10 rounded-lg bg-white mt-1'>
            <MDEditor
              value={inputs.description}
              onChange={(value) => setInputs({ ...inputs, description: value })}
              height={200}
              preview="edit"
            />
          </div>
        </div>

        {/* Danh mục + loại */}
        <div className='flex gap-4 flex-wrap'>
          <div>
            <h5 className='h5'>Danh mục sản phẩm</h5>
            <select
              onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
              value={inputs.category}
              className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-48'
            >
              <option value="">-- Chọn danh mục --</option>
              {allCagegories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <h5 className='h5'>Loại sản phẩm</h5>
            <select
              onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
              value={inputs.type}
              className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 mt-1 w-54'
            >
              <option value="">-- Chọn loại mỹ phẩm --</option>
              {allTypes.map((t, index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dung tích & giá */}
        <div className='w-full mt-4'>
          <h5 className='h5'>Dung tích và giá bán</h5>
          <div className='flex gap-4 mt-2'>
            <input
              onChange={(e) => setNewSize(e.target.value)}
              value={newSize}
              type="text"
              placeholder='Ví dụ: 50ml...'
              className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 w-32'
            />
            <input
              onChange={(e) => {
                const value = e.target.value
                if (value >= 0) setNewPrice(value)
              }}
              value={newPrice}
              type="number"
              placeholder='Giá (VNĐ)'
              min="0"
              className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-white text-gray-600 medium-14 w-32'
            />

            <button type='button' onClick={addSizePrice} className='btn-secondary font-semibold p-1.5 rounded-lg'>
              Thêm
            </button>
          </div>

          <div className="mt-2 space-y-1">
            {sizePrices.map((sp, index) => (
              <div key={index} className="flex items-center justify-between w-64 bg-white p-1 px-2 rounded-lg ring-1 ring-slate-900/10">
                <span>{sp.size}: {sp.price.toLocaleString()}₫</span>
                <button
                  type='button'
                  onClick={() => removeSizePrice(sp.size)}
                  className='text-red-500 hover:underline text-sm'
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hình ảnh */}
        <div className="mt-4">
          <h5 className="h5 mb-2">Hình ảnh sản phẩm</h5>
          <div className="flex flex-wrap gap-4 mt-2">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                htmlFor={`productImage${key}`}
                className="w-32 h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-pink-50 transition"
              >
                <input
                  onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
                  type="file"
                  accept="image/*"
                  id={`productImage${key}`}
                  hidden
                />

                {images[key] ? (
                  <img
                    src={URL.createObjectURL(images[key])}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-gray-400 text-3xl">＋</span>
                )}
              </label>
            ))}
          </div>
        </div>


        {/* Nổi bật */}
        <div className="flex items-center gap-2 mt-3">
          <h5 className="h5">Thêm vào danh mục nổi bật</h5>
          <input
            type="checkbox"
            checked={inputs.popular}
            onChange={(e) => setInputs({ ...inputs, popular: e.target.checked })}
          />
        </div>

        {/* Nút thêm */}
        <button
          type="submit"
          disabled={loading}
          className='btn-secondary font-semibold mt-3 p-2 max-w-36 sm:w-full rounded-xl'
        >
          {loading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
