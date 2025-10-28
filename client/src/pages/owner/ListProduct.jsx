import React from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const ListProduct = () => {
  const { products, currency, fetchProducts, axios, getToken } = useAppContext()


  const toggleStock = async (productId, inStock) => {
    try {
      const { data } = await axios.post('/api/products/toggle-stock', { productId, inStock }, { headers: { Authorization: `Bearer ${await getToken()}` } })
      if (data.success) {
        fetchProducts()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteProduct = async (productId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const { data } = await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        fetchProducts();
        toast.success("Xóa sản phẩm thành công");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };




  return (
    <div className='px-2 sm:px-6 py-12 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-11/12 rounded-xl'>
      <div className='flex flex-col gap-2 lg:w-11/12'>
        <div className='grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_1.5fr] items-center py-4 px-2 bg-secondary text-white bold-14 sm:bold-15 mb-1 rounded-xl'>
          <h5>Hình ảnh</h5>
          <h5>Tên sản phẩm</h5>
          <h5>Danh mục sản phẩm</h5>
          <h5>Giá</h5>
          <h5>Tồn kho</h5>
          <h5>Hành động</h5>
        </div>
        {/* Product List */}
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_1.5fr] items-center gap-2 p-2 bg-white rounded-lg"
          >
            <img src={product.images[0]} alt="" className="w-12 bg-primary rounded" />
            <h5 className="text-sm font-semibold">{product.title}</h5>
            <p className="text-sm font-semibold">{product.category}</p>
            <div className="text-sm font-semibold">
              Chỉ từ {currency}
              {product.price[product.sizes[0]]}
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                <input
                  onClick={() => toggleStock(product._id, !product.inStock)}
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={product.inStock}
                />
                <div className="w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-secondary transition-colors duration-200" />
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4" />
              </label>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Sửa
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default ListProduct