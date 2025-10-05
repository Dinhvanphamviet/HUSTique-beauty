import { assets } from "../assets/data";

const Testimonial = () => {
  const cardsData = [
    {
      image: assets.user1,
      name: 'Briar Martin',
      handle: '@neilstellar',
      date: 'April 20, 2025'
    },
    {
      image: assets.user2,
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025'
    },
    {
      image: assets.user3,
      name: 'Jordan Lee',
      handle: '@jordantalks',
      date: 'June 5, 2025'
    },
    {
      image: assets.user4,
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025'
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User Image" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <img src={assets.badge} alt="" width={15} />
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">Radiant made undercutting all of our competitors an absolute
        breeze.</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a href="https://x.com" target="_blank" className="hover:text-sky-500">
            <img src={assets.twitter} alt="" width={16} />
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

        <div className="marquee-row overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>

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
  )
}
export default Testimonial