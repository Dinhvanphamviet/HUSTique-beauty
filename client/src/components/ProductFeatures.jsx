import React from "react"
import { assets } from "../assets/data"

const ProductFeatures = () => {
  return (
    <section className="mt-12 bg-[#fdeef4] rounded-3xl shadow-sm py-12 px-6 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* An Tâm Trải Nghiệm */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 bg-white/70 rounded-3xl p-6 shadow-sm hover:bg-white/80 hover:scale-102 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200 transition-all duration-300 ease-in-out">
                  <img
                      src={assets.returnRequest}
                      alt="An tâm trải nghiệm"
                      width={80}
                      className="rounded-full shadow-sm hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                      <h4 className="text-lg font-semibold text-[#d4638e] mb-2 tracking-wide">
                          An Tâm Trải Nghiệm
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          Hỗ trợ đổi trả trong <span className="font-medium">7 ngày</span>. Bởi sự hài lòng của bạn là nguồn cảm hứng bất tận của chúng tôi.
                      </p>
                  </div>
              </div>


        {/* Bảo Mật Thanh Toán */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 bg-white/70 rounded-3xl p-6 shadow-sm hover:bg-white/80 hover:scale-102 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200 transition-all duration-300 ease-in-out">
          <img
            src={assets.secure}
            alt="Bảo mật thanh toán"
            width={80}
            className="rounded-full shadow-sm"
          />
          <div>
            <h4 className="text-lg font-semibold text-[#d4638e] mb-2 tracking-wide">
              Bảo Mật Thanh Toán
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Giao dịch an toàn với chuẩn bảo mật quốc tế. Cho bạn thảnh thơi tận hưởng trọn vẹn hành trình làm đẹp.
            </p>
          </div>
        </div>

        {/* Giao Hàng Tận Tâm */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 bg-white/70 rounded-3xl p-6 shadow-sm hover:bg-white/80 hover:scale-102 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-200 transition-all duration-300 ease-in-out">
          <img
            src={assets.delivery}
            alt="Giao hàng tận tâm"
            width={80}
            className="rounded-full shadow-sm"
          />
          <div>
            <h4 className="text-lg font-semibold text-[#d4638e] mb-2 tracking-wide">
              Giao Hàng Tận Tâm
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mỗi sản phẩm là một món quà được trân trọng, trao đến bạn nhanh chóng và vẹn nguyên tinh hoa từ Nhật Bản.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductFeatures