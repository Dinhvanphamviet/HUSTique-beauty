import React, { useEffect, useState } from "react";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import Item from "./Item";

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const { products } = useAppContext();

  useEffect(() => {
    const data = products.filter((item) => item.popular && item.inStock);
    setPopularProducts(data.slice(0, 4));
  }, [products]);

  return (
    <section className="relative max-padd-container my-12 md:my-0 overflow-hidden">
      <div className="fade-in">
        <Title
          title1="Sản phẩm"
          title2="nổi bật"
          titleStyles="text-center mb-10"
          title1Styles="text-[2rem] md:text-[2.3rem] font-semibold tracking-wide text-[#3E3E3E]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {popularProducts.map((product) => (
          <div key={product._id}>
            <Item product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
