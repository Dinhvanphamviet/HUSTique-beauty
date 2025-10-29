import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import MarkdownPreview from "@uiw/react-markdown-preview";
import toast from "react-hot-toast";

export default function BlogDetail() {
  const { id } = useParams();
  const { axios, blogs } = useAppContext();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);

      // Ưu tiên đọc từ cache map
      const mapCache = JSON.parse(localStorage.getItem("blog_map") || "{}");
      if (mapCache[id]) {
        setBlog(mapCache[id]);
      }

      // Hoặc cache từng blog riêng
      const cached = localStorage.getItem(`blog_${id}`);
      if (!blog && cached) {
        setBlog(JSON.parse(cached));
      }

      try {
        // Nếu context đã có, cập nhật luôn
        const contextBlog = blogs.find((b) => b._id === id);
        if (contextBlog) {
          setBlog(contextBlog);
        }

        // Dù có cache vẫn fetch để đảm bảo dữ liệu mới
        const [resBlog, resAll] = await Promise.all([
          axios.get(`/api/blogs/${id}`),
          blogs.length > 0
            ? Promise.resolve({ data: { blogs } })
            : axios.get("/api/blogs"),
        ]);

        if (resBlog.data?.success) {
          const newBlog = resBlog.data.blog;
          setBlog(newBlog);
          localStorage.setItem(`blog_${id}`, JSON.stringify(newBlog));

          // Cập nhật vào blog_map
          const currentMap = JSON.parse(
            localStorage.getItem("blog_map") || "{}",
          );
          currentMap[id] = newBlog;
          localStorage.setItem("blog_map", JSON.stringify(currentMap));
        }

        const list = resAll.data.blogs || [];
        setOtherBlogs(list.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Lỗi khi tải blog:", err);
        toast.error("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
    window.scrollTo(0, 0);
  }, [id, axios, blogs]);

  if (loading && !blog)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Đang tải nội dung...
      </div>
    );

  if (!blog)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <div className="bg-white min-h-screen py-24 text-gray-800">
      <div className="max-padd-container flex flex-col lg:flex-row gap-10">
        {/* ======= BÊN TRÁI: BLOG CHÍNH ======= */}
        <div className="lg:flex-1 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] overflow-y-auto">
          {blog.imageUrl && (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              loading="lazy"
              className="w-full max-w-4xl rounded-2xl mb-6 shadow mx-auto"
            />
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <p className="text-pink-500 font-medium mb-6">
            {blog.category || "Không có chủ đề"}
          </p>

          <div className="prose max-w-none text-gray-800 leading-relaxed">
            <MarkdownPreview
              source={blog.description}
              className="!bg-transparent !text-gray-800 !p-0 !m-0"
            />
          </div>
        </div>

        {/* ======= BÊN PHẢI: CÁC BLOG KHÁC ======= */}
        <aside className="lg:w-80 space-y-5">
          <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
            Các bài viết khác
          </h2>

          <div className="space-y-3">
            {otherBlogs.slice(0, 8).map((b) => (
              <Link
                key={b._id}
                to={`/blog/${b._id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 transition"
              >
                <img
                  src={b.imageUrl || "/no-image.jpg"}
                  alt={b.title}
                  loading="lazy"
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {b.title}
                  </p>
                  <span className="text-xs text-gray-500 mt-1">
                    {b.category || "Chưa phân loại"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
