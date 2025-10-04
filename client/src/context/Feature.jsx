import React, { useState, useEffect } from 'react'
import { assets } from '../assets/data'

function Feature() {
    // Thêm bao nhiêu ảnh tùy ý
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
        <section className="max-padd-container my-10 xl:my-22">
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-6 gap-y-12 items-center rounded-xl">
                    
                    {/* Ảnh 1 */}
                    <img
                        src={imageList[index1]}
                        alt="Feature 1"
                        height={77}
                        width={222}
                        className="rounded-full transition-all duration-700 ease-in-out"
                    />

                    {/* Ảnh 2 */}
                    <img
                        src={imageList[index2]}
                        alt="Feature 2"
                        height={77}
                        width={222}
                        className="rounded-full transition-all duration-700 ease-in-out"
                    />

                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-brow-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                        <h4 className="h4 capitalize mb-2">Chất Lượng Tuyệt Hảo</h4>
                        <p>Tinh chọn nguyên liệu, chế tác tỉ mỉ trong từng chi tiết.</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-brow-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                        <h4 className="h4 capitalize mb-2">Vận Chuyển Thần Tốc</h4>
                        <p>Giao nhanh – mang vẻ đẹp đến tay bạn tức thì.</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-brow-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
                        <h4 className="h4 capitalize mb-2">Thanh Toán Bảo Mật</h4>
                        <p>Mua sắm an toàn, thông tin được bảo vệ tuyệt đối.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feature
