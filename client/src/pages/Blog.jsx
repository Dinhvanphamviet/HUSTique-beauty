import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const { axios, blogs, setBlogs } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/blogs");
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          console.error("Không tải được blog:", data.message);
        }
      } catch (err) {
        console.error("Lỗi khi tải blog:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!blogs || blogs.length === 0) {
      fetchBlogs();
    }
  }, [axios, blogs, setBlogs]);

  return (
    <div className="pb-28 pt-20 font-sans text-gray-800">
      <div className="max-padd-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse h-64 rounded-2xl"
                />
              ))
            : blogs.map((blog) => (
                <div key={blog._id} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden h-48 w-full flex-shrink-0">
                      <img
                        src={blog.image || blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-pink-400 font-medium mb-1">
                        {blog.category}
                      </p>
                      <h5 className="text-md font-semibold text-gray-900 mb-2 line-clamp-2">
                        {blog.title}
                      </h5>

                      <div className="text-gray-700 text-sm flex-1 prose max-w-none">
                        <div className="!bg-transparent !text-gray-700 line-clamp-2">
                          <MarkdownPreview
                            source={blog.description}
                            className="!bg-transparent !text-gray-700 !p-0 !m-0"
                          />
                        </div>
                      </div>

                      {/* Nút xem chi tiết */}
                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="mt-3 text-pink-500 font-medium underline text-sm hover:text-pink-600 transition-colors"
                      >
                        Xem thêm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
