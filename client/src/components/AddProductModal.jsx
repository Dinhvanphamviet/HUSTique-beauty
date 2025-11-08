import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";

const AddProductModal = ({ onClose, onSaved }) => {
const { axios, getToken, fetchProducts } = useAppContext();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
  });

  const [sizePrices, setSizePrices] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const allCategories = ["Chăm sóc tóc", "Chăm sóc cơ thể", "Chăm sóc da mặt", "Chăm sóc môi"];
  const allTypes = [
    "Dầu gội",
    "Sữa tắm",
    "Sữa rửa mặt",
    "Kem dưỡng ẩm",
    "Mặt nạ",
    "Serum",
    "Xịt khoáng",
  ];

  const addSizePrice = () => {
    if (!newSize || !newPrice) return toast.error("Nhập đủ dung tích và giá");
    if (sizePrices.some(sp => sp.size === newSize)) return toast.error("Dung tích đã tồn tại");
    setSizePrices([...sizePrices, { size: newSize, price: parseFloat(newPrice) }]);
    setNewSize(""); setNewPrice("");
  };

  const removeSizePrice = (size) => setSizePrices(sizePrices.filter(sp => sp.size !== size));
  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.title || !inputs.description || !inputs.category || !inputs.type)
      return toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm");
    if (sizePrices.length === 0) return toast.error("Vui lòng thêm dung tích và giá");
    if (images.length === 0) return toast.error("Vui lòng thêm ít nhất 1 ảnh");

    setLoading(true);
    try {
      const formData = new FormData();
      const prices = {};
      const sizes = [];
      sizePrices.forEach(sp => { prices[sp.size] = sp.price; sizes.push(sp.size); });

      const productData = {
        title: inputs.title,
        description: inputs.description,
        detailedDescription: inputs.detailedDescription,
        category: inputs.category,
        type: inputs.type,
        popular: inputs.popular,
        price: prices,
        sizes,
      };
      

      formData.append("productData", JSON.stringify(productData));
      images.forEach(img => formData.append("images", img));

      const { data } = await axios.post("/api/products", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success("Thêm sản phẩm thành công!");
        await fetchProducts();
        setInputs({ title: "", description: "", category: "", type: "", popular: false });
        setSizePrices([]);
        setImages([]);
        onSaved?.();
        onClose?.();
      } else toast.error(data.message);

    } catch (err) {
      toast.error("Lỗi khi thêm sản phẩm");
    } finally { setLoading(false); }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Thêm sản phẩm</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">

          {/* Tên sản phẩm */}
          <div>
            <label className="font-medium">Tên sản phẩm</label>
            <input
              value={inputs.title}
              onChange={e => setInputs({ ...inputs, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          {/* Mô tả */}
          <div data-color-mode="light">
            <label className="font-medium">Mô tả ngắn</label>
            <div className="border rounded-lg bg-white mt-1">
              <MDEditor
                value={inputs.description}
                onChange={v => setInputs({ ...inputs, description: v })}
                height={200}
                preview="edit"
              />
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div data-color-mode="light">
            <label className="font-medium">Mô tả chi tiết</label>
            <div className="border rounded-lg bg-white mt-1">
              <MDEditor
                value={inputs.detailedDescription}
                onChange={v => setInputs({ ...inputs, detailedDescription: v })}
                height={250}
                preview="edit"
              />
            </div>
          </div>


          {/* Danh mục & loại */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-medium">Danh mục</label>
              <select
                value={inputs.category}
                onChange={e => setInputs({ ...inputs, category: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full mt-1"
              >
                <option value="">-- Chọn danh mục --</option>
                {allCategories.map((cat, i) => <option key={i}>{cat}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="font-medium">Loại sản phẩm</label>
              <select
                value={inputs.type}
                onChange={e => setInputs({ ...inputs, type: e.target.value })}
                className="border rounded-lg px-3 py-2 w-full mt-1"
              >
                <option value="">-- Chọn loại --</option>
                {allTypes.map((t, i) => <option key={i}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Dung tích & Giá */}
          <div>
            <label className="font-medium">Dung tích & Giá</label>
            <div className="flex gap-2 mt-2">
              <input
                value={newSize}
                onChange={e => setNewSize(e.target.value)}
                placeholder="50ml"
                className="border rounded-lg px-3 py-2 w-32"
              />
              <input
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="Giá (VNĐ)"
                type="number"
                min="0"
                className="border rounded-lg px-3 py-2 w-32"
              />
              <button type="button" onClick={addSizePrice} className="bg-secondary text-white px-3 py-2 rounded-lg">
                Thêm
              </button>
            </div>

            <div className="mt-2 space-y-1">
              {sizePrices.map((sp, i) => (
                <div key={i} className="flex items-center justify-between w-64 bg-white p-1 px-2 rounded-lg ring-1 ring-slate-900/10">
                  <span>{sp.size}: {sp.price.toLocaleString()}₫</span>
                  <button type="button" onClick={() => removeSizePrice(sp.size)} className="text-red-500 hover:underline text-sm">Xóa</button>
                </div>
              ))}
            </div>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="font-medium">Ảnh sản phẩm</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {images.map((file, i) => (
                <div key={i} className="relative">
                  <img src={URL.createObjectURL(file)} alt="" className="w-32 h-32 object-cover rounded-lg border" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-gray-400 text-3xl">
                  +
                  <input type="file" accept="image/*" hidden onChange={e => setImages([...images, ...Array.from(e.target.files)])} multiple />
                </label>
              )}
            </div>
          </div>

          {/* Nổi bật */}
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={inputs.popular} onChange={e => setInputs({ ...inputs, popular: e.target.checked })} />
            <span>Thêm vào danh mục nổi bật</span>
          </div>

          {/* Nút */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Hủy</button>
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {loading ? "Đang thêm..." : "Thêm sản phẩm"}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default AddProductModal;
