import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogForm({ blog, onClose, onSaved }) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || "",
                category: blog.category || "",
                description: blog.description || "",
            });
            setPreview(blog.imageUrl || "");
        }
    }, [blog]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("title", formData.title);
            form.append("category", formData.category);
            form.append("description", formData.description);
            if (image) form.append("image", image);

            let res;
            if (blog) {
                res = await axios.put(`/api/blogs/${blog._id}`, form);
                toast.success("Cập nhật blog thành công");
            } else {
                res = await axios.post("/api/blogs", form);
                toast.success("Thêm blog thành công");
            }

            if (res?.data?.blog) {
                onSaved(res.data.blog);
            }

            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi lưu blog");
        }
    };

    return (
        // Overlay phủ toàn màn hình
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl p-6 relative space-y-5"
            >
                <h2 className="text-lg font-semibold">
                    {blog ? "Chỉnh sửa Blog" : "Thêm Blog mới"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Tiêu đề */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tiêu đề
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Chủ đề */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Chủ đề
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">-- Chọn chủ đề --</option>
                            <option value="Chăm sóc tóc">Chăm sóc tóc</option>
                            <option value="Chăm sóc cơ thể">Chăm sóc cơ thể</option>
                            <option value="Chăm sóc da mặt">Chăm sóc da mặt</option>
                        </select>
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả Blog
                        </label>
                        <MDEditor
                            value={formData.description}
                            onChange={(val) => setFormData({ ...formData, description: val })}
                            height={250}
                            preview="edit"
                            className="rounded-lg border"
                        />
                    </div>

                    {/* Ảnh */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ảnh minh họa
                        </label>
                        <div className="relative w-32 h-32">
                            {preview ? (
                                <>
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-full h-full object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImage(null);
                                            setPreview("");
                                        }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                    >
                                        ×
                                    </button>
                                </>
                            ) : (
                                <label className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer text-gray-400 text-3xl">
                                    +
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setImage(file);
                                            setPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {blog ? "Cập nhật" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
