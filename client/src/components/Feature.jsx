import React, { useState, useEffect } from 'react'
import { assets } from '../assets/data'

function Feature() {
  const imageList = [
    assets.features1,
    assets.features2,
    assets.features3,
    assets.features4,
  ]

  const [index1, setIndex1] = useState(0)
  const [index2, setIndex2] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex1(prev => (prev + 1) % imageList.length)
      setIndex2(prev => (prev + 1) % imageList.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [imageList.length])

  return (
    <section className="max-padd-container my-16 relative overflow-hidden font-['Noto_Serif_JP',serif]">
      <div className="absolute inset-0 bg-[url('/sakura-pattern.svg')] bg-contain opacity-[0.04] pointer-events-none" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-6 gap-y-12 items-center rounded-xl relative z-10">
        <img
          src={imageList[index1]}
          alt="Feature 1"
          height={77}
          width={222}
          className="rounded-full transition-all duration-700 ease-in-out drop-shadow-md hover:scale-[1.02]"
        />

        <img
          src={imageList[index2]}
          alt="Feature 2"
          height={77}
          width={222}
          className="rounded-full transition-all duration-700 ease-in-out drop-shadow-md hover:scale-[1.02]"
        />

        {/* Ô 1 */}
        <div className="fade-in flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#FADADD] rounded-2xl border border-[#ffeaed] shadow-sm hover:shadow-md transition-all duration-500 text-center hover:-translate-y-[2px] hover:bg-[#FFE4E8]">
          <h4 className="text-[18px] md:text-[20px] font-semibold tracking-wide text-[#2E2E2E] mb-2">
            Chất Lượng Tuyệt Hảo
          </h4>
          <p className="text-[14px] text-gray-600 italic leading-relaxed">
            Tinh chọn nguyên liệu, chế tác tỉ mỉ trong từng chi tiết.
          </p>
        </div>

        {/* Ô 2 */}
        <div className="fade-in delay-200 flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#FADADD] rounded-2xl border border-[#F4D6D9] shadow-sm hover:shadow-md transition-all duration-500 text-center hover:-translate-y-[2px] hover:bg-[#FFE4E8]">
          <h4 className="text-[18px] md:text-[20px] font-semibold tracking-wide text-[#2E2E2E] mb-2">
            Vận Chuyển Thần Tốc
          </h4>
          <p className="text-[14px] text-gray-600 italic leading-relaxed">
            Giao nhanh – mang vẻ đẹp đến tay bạn tức thì.
          </p>
        </div>

        {/* Ô 3 */}
        <div className="fade-in delay-400 flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#FADADD] rounded-2xl border border-[#F4D6D9] shadow-sm hover:shadow-md transition-all duration-500 text-center hover:-translate-y-[2px] hover:bg-[#FFE4E8]">
          <h4 className="text-[18px] md:text-[20px] font-semibold tracking-wide text-[#2E2E2E] mb-2">
            Thanh Toán Bảo Mật
          </h4>
          <p className="text-[14px] text-gray-600 italic leading-relaxed">
            Mua sắm an toàn, thông tin được bảo vệ tuyệt đối.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Feature
