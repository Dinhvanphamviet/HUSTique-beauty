import { assets } from "../assets/data";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="pt-16 xl:pt-20 w-full text-gray-600 bg-[#FAFAFA]">
            <div className='max-w-[1200px] mx-auto px-4 md:px-6'>

                {/* Flex container */}
                <div className='flex flex-wrap justify-between gap-6 md:gap-8'>

                    {/* Logo & Description */}
                    <div className='max-w-80 flex-1 order-1 md:order-1'>
                        {/* Logo */}
                        <div className="flex flex-1">
                            <Link to={"/"} className='flex items-center gap-2'>
                                <img src={assets.logoImg} alt="logo" className="h-11" />
                                <span className='hidden sm:inline-block text-2xl font-bold'>
                                    HUSTique Beauty
                                </span>
                            </Link>
                        </div>
                        <p className='text-sm mt-3 text-gray-500'>
                            Chăm sóc vẻ đẹp của bạn với nguyên liệu thiên nhiên và phong cách Nhật Bản.
                        </p>
                        <div className='flex items-center gap-3 mt-4'>
                            {[assets.facebook, assets.instagram, assets.twitter, assets.linkedin].map((icon, i) => (
                                <img
                                    key={i}
                                    src={icon}
                                    alt=""
                                    className="h-5 w-5 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-80"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className='max-w-80 flex-1 order-2 md:order-4'>
                        <p className='text-black/80 font-medium mb-2'>ĐĂNG KÝ NHẬN TIN</p>
                        <p className='mt-2 text-sm text-gray-500'>
                            Nhận thông tin, ưu đãi và mẹo làm đẹp từ chúng tôi.
                        </p>
                        <div className='flex items-center border border-gray-300 bg-white rounded-full h-11 overflow-hidden max-w-md w-full mt-4 shadow-sm focus-within:shadow-md transition-shadow'>
                            <input
                                type="text"
                                className='w-full h-full outline-none px-4 text-sm text-gray-600'
                                placeholder='Nhập email của bạn'
                            />
                            <button className='bg-gray-800 text-white px-4 h-full rounded-r-full hover:bg-black transition-colors text-sm font-medium flex items-center justify-center whitespace-nowrap'>
                                Đăng ký
                            </button>
                        </div>
                    </div>

                    {/* Company (ẩn trên mobile) */}
                    <div className='hidden md:flex flex-col order-3 md:order-2'>
                        <p className='text-black/80 font-medium mb-2'>CÔNG TY</p>
                        <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                            {["Giới thiệu", "Tuyển dụng", "Báo chí", "Blog", "Đối tác"].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:text-black hover:underline hover:decoration-gray-400 transition-all">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support (ẩn trên mobile) */}
                    <div className='hidden md:flex flex-col order-4 md:order-3'>
                        <p className='text-black/80 font-medium mb-2'>HỖ TRỢ</p>
                        <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                            {["Trung tâm hỗ trợ", "Thông tin an toàn", "Chính sách hủy", "Liên hệ", "Trợ năng"].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:text-black hover:underline hover:decoration-gray-400 transition-all">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <hr className='border-gray-300 mt-8' />

                {/* Bottom */}
                <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm text-gray-500'>
                    <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com" className="hover:text-black hover:underline transition-all">HUSTique Beauty</a>. Bản quyền thuộc về HUSTique Beauty.</p>
                    <ul className='flex items-center gap-4'>
                        {["Chính sách bảo mật", "Điều khoản", "Sơ đồ website"].map((item, i) => (
                            <li key={i}>
                                <a href="#" className="hover:text-black hover:underline transition-all">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
