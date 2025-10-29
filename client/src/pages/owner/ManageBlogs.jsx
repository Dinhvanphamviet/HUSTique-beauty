import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlogForm from "../../components/BlogForm";

export default function ManageBlogs() {
  const { blogs, setBlogs, fetchBlogs } = useAppContext();
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(blogs.length === 0);

  useEffect(() => {
    if (blogs.length === 0) {
      setLoading(true);
      fetchBlogs().finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem(
        "blog_map",
        JSON.stringify(Object.fromEntries(blogs.map(b => [b._id, b])))
      );
    }
  }, [blogs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa blog này?")) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`, {
        method: "DELETE",
      });
      const newList = blogs.filter((b) => b._id !== id);
      setBlogs(newList);
      localStorage.setItem("blogs", JSON.stringify(newList));
      toast.success("Xóa blog thành công");
    } catch (err) {
      toast.error("Lỗi khi xóa blog");
    }
  };

  const handleSave = (updatedBlog) => {
    const newList = updatedBlog._id
      ? blogs.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
      : [updatedBlog, ...blogs];
    setBlogs(newList);
    localStorage.setItem("blogs", JSON.stringify(newList));
    setEditingBlog(null);
  };

  return (
    <div className="h-screen flex flex-col bg-primary px-2 sm:px-6 py-12 lg:w-11/12 rounded-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Quản lý Blog</h1>
        <button
          onClick={() => setEditingBlog({})}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          + Thêm Blog
        </button>
      </div>

      {/* Header cố định */}
      <div className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr] items-center py-4 px-2 bg-secondary text-white font-semibold rounded-t-xl shadow-md sticky top-0 z-10">
        <span>Hình ảnh</span>
        <span>Tiêu đề</span>
        <span>Chủ đề</span>
        <span className="text-center">Hành động</span>
      </div>

      {/* Danh sách blog cuộn */}
      <ScrollArea className="flex-1 bg-white/80 rounded-b-xl shadow-inner border-t-0">
        <div className="flex flex-col gap-2 p-3">
          {loading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr] gap-2 p-2 bg-white rounded-lg animate-pulse"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-md" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="flex justify-center gap-2">
                    <div className="w-10 h-6 bg-gray-200 rounded" />
                    <div className="w-10 h-6 bg-gray-200 rounded" />
                    <div className="w-10 h-6 bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            : blogs.length === 0
            ? <div className="text-center py-6 text-gray-500">Chưa có blog nào</div>
            : blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="grid grid-cols-[1fr_3.5fr_1.5fr_1.5fr] items-center gap-2 p-2 bg-white rounded-lg hover:shadow-md transition"
                >
                  <div className="w-16 h-16">
                    {blog.imageUrl ? (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex justify-center rounded-md text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold truncate">{blog.title}</div>
                  <div className="text-sm text-blue-600 font-medium truncate">
                    {blog.category || "—"}
                  </div>
                  <div className="flex justify-center gap-2">
                    <a
                      href={`/blog/${blog._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition text-sm"
                    >
                      Xem
                    </a>
                    <button
                      onClick={() => setEditingBlog(blog)}
                      className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600"
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
              ))}
        </div>
      </ScrollArea>

      {editingBlog && (
        <BlogForm
          blog={editingBlog._id ? editingBlog : null}
          onClose={() => setEditingBlog(null)}
          onSaved={handleSave}
        />
      )}
    </div>
  );
}
