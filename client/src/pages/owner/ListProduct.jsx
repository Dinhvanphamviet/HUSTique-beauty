import React from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const ListProduct = () => {
  const { products, currency, fetchProducts, axios, getToken } =
    useAppContext();

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN") + " ₫";

  const toggleStock = async (productId, inStock) => {
    try {
      const { data } = await axios.post(
        "/api/products/toggle-stock",
        { productId, inStock },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      const { data } = await axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
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
    <div className="h-screen flex flex-col bg-primary px-4 py-6 lg:w-11/12 rounded-xl mx-auto">
      {/* Header cố định */}
      <div className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_1.5fr] items-center py-4 px-2 bg-secondary text-white font-semibold text-sm rounded-t-xl shadow-md">
        <h5>Hình ảnh</h5>
        <h5>Tên sản phẩm</h5>
        <h5>Danh mục sản phẩm</h5>
        <h5>Giá</h5>
        <h5>Tồn kho</h5>
        <h5>Hành động</h5>
      </div>

      {/* Danh sách sản phẩm cuộn riêng */}
      <ScrollArea className="flex-1 bg-white/80 rounded-b-xl shadow-inner border-t-0">
        <div className="flex flex-col gap-2 p-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr_1fr_1.5fr] items-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.images[0]}
                alt=""
                className="w-12 h-12 object-cover rounded"
              />
              <h5 className="text-sm font-semibold truncate">
                {product.title}
              </h5>
              <p className="text-sm font-medium text-gray-600">
                {product.category}
              </p>
              <div className="text-sm font-semibold text-gray-700">
                {formatPrice(product.price[product.sizes[0]])}
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    onClick={() => toggleStock(product._id, !product.inStock)}
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={product.inStock}
                  />
                  <div className="w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-secondary transition-colors duration-300" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4" />
                </label>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                  Sửa
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ListProduct;
