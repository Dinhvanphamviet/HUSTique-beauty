import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";

const EditProductModal = ({ product, onClose, onUpdated }) => {
    const { axios, getToken, fetchProducts } = useAppContext();
    const [inputs, setInputs] = useState({
        title: product.title,
        description: product.description,
        detailedDescription: product.detailedDescription || "",
        category: product.category,
        type: product.type,
        popular: product.popular,
    });
    const [sizePrices, setSizePrices] = useState(
        Object.entries(product.price).map(([size, price]) => ({ size, price }))
    );

    // Giữ ảnh cũ và thêm ảnh mới
    const [oldImages, setOldImages] = useState(product.images || []);
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const allCategories = ["Chăm sóc tóc", "Chăm sóc cơ thể", "Chăm sóc da mặt", "Chăm sóc môi"];
    const allTypes = [
        "Dầu gội", "Dầu dưỡng", "Dầu xả",
        "Sữa tắm",
        "Sữa rửa mặt",
        "Kem dưỡng", "Kem chân", "Kem mắt", "Kem tay",
        "Mặt nạ", "Nước hoa", "Son dưỡng", "Sữa tắm", "Tẩy trang",
        "Serum",
        "Xịt khoáng",
    ];

    const [newSize, setNewSize] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const addSizePrice = () => {
        if (!newSize || !newPrice)
            return toast.error("Vui lòng nhập đủ dung tích và giá");
        if (sizePrices.some((sp) => sp.size === newSize))
            return toast.error("Dung tích đã tồn tại");
        setSizePrices([...sizePrices, { size: newSize, price: parseFloat(newPrice) }]);
        setNewSize("");
        setNewPrice("");
    };

    const removeSizePrice = (size) => {
        setSizePrices(sizePrices.filter((sp) => sp.size !== size));
    };

    const removeOldImage = (url) => {
        setOldImages(oldImages.filter((img) => img !== url));
    };

    const removeNewImage = (index) => {
        setNewImages(newImages.filter((_, i) => i !== index));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            const prices = {};
            const sizes = [];

            sizePrices.forEach((sp) => {
                prices[sp.size] = sp.price;
                sizes.push(sp.size);
            });

            const updatedProduct = {
                title: inputs.title,
                description: inputs.description,
                detailedDescription: inputs.detailedDescription,
                category: inputs.category,
                type: inputs.type,
                popular: inputs.popular,
                price: prices,
                sizes: sizes,
                // gửi danh sách ảnh cũ để backend biết giữ lại
                oldImages,
            };

            formData.append("productData", JSON.stringify(updatedProduct));
            newImages.forEach((file) => formData.append("images", file));

            const { data } = await axios.put(`/api/products/${product._id}`, formData, {
                headers: { Authorization: `Bearer ${await getToken()}` },
            });

            if (data.success) {
                toast.success("Cập nhật sản phẩm thành công!");
                await fetchProducts();
                onUpdated();
                onClose();
            } else toast.error(data.message);
        } catch (error) {
            toast.error("Lỗi khi cập nhật: " + error.message);
        } finally {
            setLoading(false);
        }
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
                <h2 className="text-xl font-semibold mb-4 text-center">Chỉnh sửa sản phẩm</h2>
                <form onSubmit={handleUpdate} className="flex flex-col gap-3 text-sm">
                    {/* Tên sản phẩm */}
                    <div>
                        <label className="font-medium">Tên sản phẩm</label>
                        <input
                            value={inputs.title}
                            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
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
                                onChange={(v) => setInputs({ ...inputs, description: v })}
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
                                onChange={(v) => setInputs({ ...inputs, detailedDescription: v })}
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
                                onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
                                className="border rounded-lg px-3 py-2 w-full mt-1"
                            >
                                {allCategories.map((cat, i) => (
                                    <option key={i}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="font-medium">Loại sản phẩm</label>
                            <select
                                value={inputs.type}
                                onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
                                className="border rounded-lg px-3 py-2 w-full mt-1"
                            >
                                {allTypes.map((t, i) => (
                                    <option key={i}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Dung tích & giá */}
                    <div>
                        <label className="font-medium">Dung tích & Giá</label>
                        <div className="flex gap-2 mt-2">
                            <input
                                value={newSize}
                                onChange={(e) => setNewSize(e.target.value)}
                                placeholder="50ml"
                                className="border rounded-lg px-3 py-2 w-32"
                            />
                            <input
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                placeholder="Giá (VNĐ)"
                                type="number"
                                min="0"
                                className="border rounded-lg px-3 py-2 w-32"
                            />

                            <button
                                type="button"
                                onClick={addSizePrice}
                                className="bg-secondary text-white px-3 py-2 rounded-lg"
                            >
                                Thêm
                            </button>
                        </div>
                        {/* Dung tích & Giá cũ */}
                        <div className="mt-2 space-y-1">
                            {sizePrices.map((sp, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between w-64 bg-white p-1 px-2 rounded-lg ring-1 ring-slate-900/10"
                                >
                                    <span>
                                        {sp.size}: {sp.price.toLocaleString()} ₫
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeSizePrice(sp.size)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ảnh sản phẩm */}
                    <div>
                        <label className="font-medium">Ảnh sản phẩm</label>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {/* Ảnh cũ */}
                            {oldImages.map((img, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOldImage(img)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            {/* Ảnh mới */}
                            {newImages.map((file, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt=""
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            {/* Nút thêm ảnh chỉ hiện khi tổng số ảnh < 4 */}
                            {[...oldImages, ...newImages].length < 4 && (
                                <label className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-gray-400 text-3xl">
                                    +
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        multiple
                                        onChange={(e) =>
                                            setNewImages([...newImages, ...Array.from(e.target.files)])
                                        }
                                    />
                                </label>
                            )}
                        </div>
                    </div>


                    {/* Nổi bật */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={inputs.popular}
                            onChange={(e) => setInputs({ ...inputs, popular: e.target.checked })}
                        />
                        <span>Thêm vào danh mục nổi bật</span>
                    </div>

                    {/* Nút */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {loading ? "Đang cập nhật..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditProductModal;
