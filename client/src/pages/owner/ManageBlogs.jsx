import React, { useEffect, useState } from "react";
import axios from "axios";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function ManageBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const fetchBlogs = async () => {
        try {
            const res = await axios.get("/api/blogs");
            setBlogs(res.data.blogs || []);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenModal = (blog = null) => {
        setEditingBlog(blog);
        setFormData(blog || { title: "", category: "", description: "" });
        setPreview(blog?.imageUrl || "");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        setFormData({ title: "", category: "", description: "" });
        setImage(null);
        setPreview("");
    };

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

            if (editingBlog) {
                await axios.put(`/api/blogs/${editingBlog._id}`, form);
            } else {
                await axios.post("/api/blogs", form);
            }

            fetchBlogs();
            handleCloseModal();
        } catch (err) {
            console.error("Error saving blog:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa blog này?")) return;
        try {
            await axios.delete(`/api/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    return (
        <div className="md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-primary shadow rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Quản lý Blog</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                    + Thêm Blog
                </button>
            </div>

            {/* Danh sách blog */}
            <div className="bg-white shadow-lg rounded-xl p-4">
                {/* Header */}
                <div className='grid grid-cols-[1fr_3.5fr_1.5fr_3fr_1.2fr] items-center py-4 px-2 bg-secondary text-white bold-14 sm:bold-15 mb-2 rounded-xl'>
                    <h5>Hình ảnh</h5>
                    <h5>Tiêu đề</h5>
                    <h5>Chủ đề</h5>
                    <h5>Mô tả</h5>
                    <h5 className="text-center">Hành động</h5>
                </div>

                {/* Body */}
                {blogs.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">
                        Chưa có blog nào
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog._id} className="grid grid-cols-[1fr_3.5fr_1.5fr_3fr_1.2fr] items-center py-3 px-2 border-b last:border-none hover:bg-pink-50 transition rounded-lg">
                            {/* Ảnh */}
                            <div className="flex items-center">
                                {blog.imageUrl ? (
                                    <img
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                                        No Img
                                    </div>
                                )}
                            </div>

                            {/* Tiêu đề */}
                            <div className="font-medium text-gray-800 truncate">{blog.title}</div>

                            {/* Chủ đề */}
                            <div className="text-blue-600 font-medium">{blog.category || "—"}</div>

                            {/* Mô tả */}
                            <div className="text-gray-700 line-clamp-3 prose prose-sm max-w-[300px] !bg-transparent">
                                <MarkdownPreview
                                    source={blog.description}
                                    className="!bg-transparent !shadow-none !border-none !p-0"
                                />
                            </div>

                            {/* Hành động */}
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => handleOpenModal(blog)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md transition"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            {/* Modal thêm/sửa blog */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl p-6 relative space-y-5">
                        <h2 className="text-lg font-semibold">
                            {editingBlog ? "Chỉnh sửa Blog" : "Thêm Blog mới"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
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

                            {/* 🔹 Thêm trường Category */}
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả Blog
                                </label>
                                <MDEditor
                                    value={formData.description}
                                    onChange={(val) =>
                                        setFormData({ ...formData, description: val })
                                    }
                                    height={250}
                                    preview="edit"
                                    className="rounded-lg border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ảnh minh họa
                                </label>
                                <div
                                    className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-pink-50"
                                    onClick={() => document.getElementById("uploadImage").click()}
                                >
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-3xl">＋</span>
                                    )}
                                </div>
                                <input
                                    id="uploadImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    {editingBlog ? "Cập nhật" : "Thêm"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
