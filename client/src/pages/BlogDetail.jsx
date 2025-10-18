import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function BlogDetail() {
    const { id } = useParams();
    const { axios } = useAppContext();
    const [blog, setBlog] = useState(null);
    const [otherBlogs, setOtherBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/blogs/${id}`);
                if (res.data.success) setBlog(res.data.blog);

                const all = await axios.get("/api/blogs");
                if (all.data.success) {
                    const filtered = all.data.blogs.filter((b) => b._id !== id);
                    setOtherBlogs(filtered);
                }
            } catch (err) {
                console.error("Lỗi khi tải blog:", err);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (!blog)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Đang tải nội dung...
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
