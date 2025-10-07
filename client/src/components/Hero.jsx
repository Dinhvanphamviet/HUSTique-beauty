import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/data.js'

function Hero() {
    return (
        <section className='max-padd-container font-japanese' >
            <div className="bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat h-[80vh] sm:h-[90vh] w-full mt-18 rounded-2xl relative overflow-hidden bg-[#FFE4E8]">
                <div className='mx-auto max-w-[1440px] px-4 pt-1 sm:pt-8 flex flex-col justify-between h-full '>

                    {/* Main Text */}
                    <div className='max-w-3xl'>
                        <h1 className="text-3xl sm:text-6xl font-light tracking-wide leading-snug capitalize">
                            Tỏa Sáng <span className="font-semibold italic text-secondary">Vẻ Đẹp</span><br />
                            Trong Mỗi <span className="font-semibold italic text-secondary">Khoảnh Khắc</span>
                        </h1>
                        <p className='text-[13px] sm:text-sm pt-2 leading-relaxed italic text-gray-600'>
                            Vẻ đẹp tự nhiên không cần phô diễn. <br/>
                            Chúng tôi mang đến những sản phẩm thuần khiết, đồng hành cùng bạn trong từng khoảnh khắc thường nhật.
                        </p>

                        <div className='flex'>
                            <Link
                                to={"/collection"}
                                className="bg-secondary text-white text-xs sm:text-sm font-medium tracking-wide px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-center gap-x-2 mt-20 group hover:bg-secondary/90 transition-all duration-500 shadow-md"
                            >
                                Chạm đến nét đẹp thuần khiết
                                <img
                                    src={assets.forward}
                                    alt=""
                                    width={30}
                                    className="bg-white rounded-full flexCenter p-2 m-1 group-hover:translate-x-2 transition-transform duration-500 shadow-sm"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white/80 backdrop-blur-md shadow-lg p-4 max-w-[260px] rounded-2xl mb-4">
                        <div className='h-32 w-56 overflow-hidden rounded-2xl'>
                            <img src={assets.hero} alt="" className='h-full w-full object-cover rounded-2xl' />
                        </div>
                        <p className='text-[13px] sm:text-sm pt-2 leading-relaxed italic text-gray-600'>
                            Vẻ đẹp đích thực khởi nguồn từ sự tinh tế mỗi ngày.  
                            <br />Hãy để nét tự nhiên luôn tỏa sáng cùng bạn.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero
