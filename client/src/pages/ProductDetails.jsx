import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductDescription from '../components/ProductDescription'
import ProductFeatures from '../components/ProductFeatures'
import RelatedProducts from '../components/RelatedProducts'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/data'
import { useUser, useClerk } from "@clerk/clerk-react";
import toast from 'react-hot-toast'


const ProductDetails = () => {
  const { products, currency, addToCart } = useAppContext()
  const [image, setImage] = useState(null)
  const [size, setSize] = useState(null)
  const { productId } = useParams()
  const product = products.find((item) => item._id === productId)
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();


  useEffect(() => {
    if (product) {
      setImage(product.images[0])
      setSize(product.sizes[0])
    }
  }, [product])

  return (
    product && (
      <div className="max-padd-container pt-20">
        {/* Product Data */}
        <div className="flex gap-10 flex-col xl:flex-row mt-3 mb-6">
          {/* Image Section */}
          <div className="flex flex-1 gap-x-2 max-w-[533px]">
            <div className="flex-1 flexCenter flex-col gap-[7px] flex-wrap">
              {product.images.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#fdeef4] rounded-2xl p-1 hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    onClick={() => setImage(item)}
                    src={item}
                    alt="productImg"
                    className="object-cover aspect-square rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-[4] bg-[#fdeef4] rounded-2xl overflow-hidden shadow-md">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 px-6 py-5 bg-[#fff3f7] rounded-3xl shadow-[0_8px_20px_rgba(255,182,193,0.25)]">
            <h3 className="h3 leading-none font-semibold tracking-wide">
              {product.title}
            </h3>

            {/* Rating & Price */}
            <div className="flex items-center gap-x-2 pt-3">
              <div className="flex gap-x-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={assets.star} alt="" width={19} />
                ))}
              </div>
              <p className="text-sm text-gray-500">(222 đánh giá)</p>
            </div>

            <div className="h4 flex items-baseline gap-4 my-2">
              <h3 className="text-2xl font-bold">
                {currency}
                {product.price[size]}.00
              </h3>
            </div>

            <p className="max-w-[555px] text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Size Buttons */}
            <div className="flex flex-col gap-4 my-4 mb-5">
              <div className="flex gap-3">
                {product.sizes.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(item)}
                    className={`${item === size
                      ? 'bg-[#f8c8dc] text-[#d63384] shadow-md'
                      : 'bg-white text-gray-600'
                      } font-medium h-9 w-20 rounded-full ring-1 ring-pink-200 transition-all hover:scale-105`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => {
                  if (!isSignedIn) {
                    toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
                    openSignIn();
                    return;
                  }
                  addToCart(product._id, size);
                }}
                className="bg-[#ffb6c1] hover:bg-[#ff9eb3] transition-all text-white font-semibold rounded-full sm:w-1/2 flexCenter gap-x-2 py-2 shadow-md hover:shadow-pink-200"
              >
                Thêm vào giỏ hàng
                <img src={assets.cartAdd} alt="" width={19} />
              </button>

              <button className="bg-white ring-1 ring-pink-200 hover:bg-[#ffe4ec] transition-all p-2 rounded-full shadow-sm">
                <img src={assets.heartAdd} alt="" width={19} />
              </button>
            </div>

            {/* Extra Info */}
            <div className="flex items-center gap-x-2 mt-3 text-gray-600">
              <img src={assets.delivery} alt="" width={17} />
              <span className="text-sm">
                Miễn phí giao hàng cho đơn từ 500$
              </span>
            </div>

            <hr className="my-4 w-2/3 border-pink-200" />

            <div className="mt-2 flex flex-col gap-1 text-gray-500 text-[14px]">
              <p>Cam kết chính hãng – An tâm tuyệt đối</p>
              <p>Thanh toán khi nhận hàng linh hoạt</p>
              <p>Dễ dàng đổi trả trong vòng 7 ngày</p>
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <ProductDescription description={product.description} />
        <ProductFeatures />
        {/* Related Products */}
        <div className="mt-14">
          <RelatedProducts product={product} productId={productId} />
        </div>
      </div>
    )
  )
}

export default ProductDetails
