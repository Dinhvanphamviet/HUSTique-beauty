import React from 'react'

const ProductDescription = () => {
    return (
        <div className='mt-14 bg-white'>
            <div className='flex gap-3'>
                <button className='medium-14 p-3 w-40 border-b-2 border-secondary'>Mô tả</button>
                <button className='medium-14 p-3 w-40'>Bảng màu</button>
                <button className='medium-14 p-3 w-40'>Hướng dẫn sử dụng</button>
            </div>
            <hr className='h-[1px] w-full text-slate-900/20' />
            <div className='flex flex-col gap-3 p-3'>
                <div>
                    <h5 className='h5'>Chi tiết sản phẩm.</h5>
                    <p className='text-sm'>
                        Sản phẩm được lấy cảm hứng từ bí quyết làm đẹp tinh tế của phụ nữ Nhật Bản, mang lại cảm giác nhẹ nhàng và thanh khiết cho làn da. 
                        Với kết cấu mềm mịn, sản phẩm dễ dàng thẩm thấu, giúp nuôi dưỡng làn da từ sâu bên trong và duy trì độ ẩm tự nhiên suốt cả ngày dài.
                    </p>
                    <p>
                        Thích hợp cho mọi loại da, đặc biệt là da nhạy cảm. Không chứa paraben, cồn hay hương liệu nhân tạo – mang đến trải nghiệm thuần khiết và an toàn tuyệt đối.
                    </p>
                </div>
                <div>
                    <h5 className='h5'>Công dụng.</h5>
                    <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap-1'>
                        <li>Giúp da mềm mượt, ẩm mịn và sáng tự nhiên.</li>
                        <li>Chiết xuất từ hoa anh đào Nhật Bản giúp làm dịu da, giảm kích ứng.</li>
                        <li>Tái tạo năng lượng cho làn da sau mỗi lần sử dụng, mang đến vẻ rạng rỡ tự nhiên.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
