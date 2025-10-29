import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { assets } from "../assets/data";
import { useAppContext } from "../context/AppContext";

const CommentSection = ({ productId, onCommentsUpdated }) => {
  const { user, getToken, axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Lấy danh sách bình luận
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${productId}`);
      if (res.data.success) setComments(res.data.comments);
      if (onCommentsUpdated) onCommentsUpdated(res.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  // Gửi bình luận
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Vui lòng đăng nhập để bình luận");
      return openSignIn();
    }
    if (!content.trim()) return toast.error("Vui lòng nhập nội dung bình luận");

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/comments",
        { content, rating, productId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Đăng bình luận thành công");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi gửi bình luận");
    } finally {
      setLoading(false);
    }
  };

  // Xóa bình luận
  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      const res = await axios.delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Đã xóa bình luận");
        fetchComments();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa bình luận");
    }
  };

  return (
    <div
      className={`mt-10 bg-[#fff3f7] rounded-3xl shadow-sm transition-all duration-500 overflow-hidden ${
        comments.length === 0 ? "p-6" : "p-6 md:p-8"
      }`}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Bình luận & đánh giá
      </h3>

      {/* Ô nhập bình luận */}
      <div className="mb-6">
        <textarea
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="w-full p-3 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-300 outline-none resize-none"
        ></textarea>

        <div className="flex items-center gap-2 mt-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <img
              key={num}
              src={assets.star}
              alt=""
              width={24}
              className={`cursor-pointer transition-transform ${
                rating >= num ? "opacity-100 scale-110" : "opacity-40"
              }`}
              onClick={() => setRating(num)}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{rating} / 5 sao</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full transition-all"
        >
          {loading ? "Đang gửi..." : "Gửi bình luận"}
        </button>
      </div>

      {/* Danh sách bình luận */}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">Chưa có bình luận nào.</p>
      ) : (
        <div
          className={`space-y-4 pr-2 transition-all duration-300 ${
            comments.length >= 3
              ? "max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50"
              : "max-h-none"
          }`}
        >
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <img
                    src={c.user?.image || assets.user}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="font-semibold text-gray-800">
                    {c.user?.username || "Người dùng ẩn danh"}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(c.rating)].map((_, i) => (
                    <img key={i} src={assets.star} alt="" width={15} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm">{c.content}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>{new Date(c.createdAt).toLocaleString()}</span>
                {user?.id === c.user?._id && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
