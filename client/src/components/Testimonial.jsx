import React, { useEffect, useState } from "react";
import { assets } from "../assets/data";
import axios from "axios";

const Testimonial = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("/api/comments/all");
        setComments(res.data.comments);
      } catch (err) {
        console.error("Lỗi khi lấy comment:", err);
      }
    };
    fetchComments();
  }, []);

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full"
          src={card.user.image || assets.user1}
          alt={`Ảnh của ${card.user.username}`}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium">{card.user.username}</p>
            <img src={assets.badge} alt="Huy hiệu xác minh" width={15} />
          </div>
          <span className="text-xs text-slate-500">@{card.user.username}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">{card.content}</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>HUSTique Beauty</span>
        </div>
        <p>{new Date(card.createdAt).toLocaleDateString("vi-VN")}</p>
      </div>
    </div>
  );

  return (
    <section className="max-padd-container py-16 xl:py-22">
      <>
        <style>{`
          @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
          }

          .marquee-inner {
              animation: marqueeScroll 25s linear infinite;
              will-change: transform;
          }

          .marquee-reverse {
              animation-direction: reverse;
          }
        `}</style>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Cảm nhận từ khách hàng
          </h2>
          <p className="text-gray-600 mt-2">
            Những chia sẻ chân thật từ các khách hàng đã tin tưởng và lựa chọn
            HUSTique Beauty.
          </p>
        </div>

        {/* Hàng đánh giá đầu tiên */}
        <div className="marquee-row overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...comments, ...comments].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* Hàng đánh giá chạy ngược chiều */}
        <div className="marquee-row overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...comments, ...comments].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </>
    </section>
  );
};

export default Testimonial;
