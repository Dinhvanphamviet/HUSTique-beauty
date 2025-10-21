import { assets } from "../assets/data";

const Testimonial = () => {
  const cardsData = [
    {
      image: assets.user1,
      name: "Lan Anh",
      handle: "@lananh_beauty",
      date: "20 Tháng 4, 2025",
      text: "Sản phẩm của HUSTique thật sự tuyệt vời! Da mình sáng mịn hơn chỉ sau vài tuần sử dụng.",
    },
    {
      image: assets.user2,
      name: "Minh Khang",
      handle: "@minhkhang_skincare",
      date: "10 Tháng 5, 2025",
      text: "Mình rất thích dịch vụ chăm sóc khách hàng. Đội ngũ tư vấn cực kỳ tận tâm và chuyên nghiệp.",
    },
    {
      image: assets.user3,
      name: "Hà My",
      handle: "@hami_glow",
      date: "5 Tháng 6, 2025",
      text: "Mùi hương dễ chịu, chất lượng vượt mong đợi. Giờ mình đã là khách hàng trung thành rồi!",
    },
    {
      image: assets.user4,
      name: "Tuấn Phong",
      handle: "@phong_organic",
      date: "2 Tháng 7, 2025",
      text: "HUSTique đã giúp mình tự tin hơn rất nhiều. Da khỏe hơn và ít mụn hẳn!",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt={`Ảnh của ${card.name}`} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium">{card.name}</p>
            <img src={assets.badge} alt="Huy hiệu xác minh" width={15} />
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">{card.text}</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Đăng trên</span>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-sky-500">
            <img src={assets.twitter} alt="Biểu tượng X" width={16} />
          </a>
        </div>
        <p>{card.date}</p>
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
          }

          .marquee-reverse {
              animation-direction: reverse;
          }
        `}</style>

        {/* Tiêu đề phần đánh giá */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Cảm nhận từ khách hàng</h2>
          <p className="text-gray-600 mt-2">
            Những chia sẻ chân thật từ các khách hàng đã tin tưởng và lựa chọn HUSTique Beauty.
          </p>
        </div>

        {/* Hàng đánh giá đầu tiên */}
        <div className="marquee-row overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>

        {/* Hàng đánh giá chạy ngược chiều */}
        <div className="marquee-row overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
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
