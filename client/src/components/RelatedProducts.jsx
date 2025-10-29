import React, { useEffect, useState } from "react";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useAppContext } from "../context/AppContext";
import Item from "./Item";

const RelatedProducts = ({ product, productId }) => {
  const { products } = useAppContext();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => item.category === product.category && productId !== item._id,
      );
      setRelatedProducts(productsCopy.slice(0, 6));
    }
  }, [products]);

  return (
    <section className="relative my-12 md:my-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/sakura-pattern.svg')] bg-repeat opacity-[0.03] pointer-events-none" />

      <div className="fade-in">
        <Title
          title1="Sản phẩm"
          title2="liên quan"
          titleStyles="text-center mb-10"
          title1Styles="text-[2rem] md:text-[2.3rem] font-semibold tracking-wide text-[#3E3E3E]"
        />
      </div>

      <div className="fade-in delay-200">
        <Swiper
          spaceBetween={30}
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            555: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            1022: { slidesPerView: 3 },
            1350: { slidesPerView: 4 },
            1650: { slidesPerView: 5 },
            2000: { slidesPerView: 6 },
          }}
          modules={[Autoplay]}
          className="min-h-[330px]"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Item product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RelatedProducts;
