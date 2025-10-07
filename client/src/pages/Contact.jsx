export default function Contact() {
  return (
    <section className="py-28">
      <form className="flex flex-col items-center text-slate-700">
        {/* Header */}
        <p className="text-xs bg-rose-100 text-rose-500 font-medium px-3 py-1 rounded-full tracking-wide">
          Liên Hệ
        </p>

        <h1 className="text-3xl sm:text-4xl font-semibold py-5 text-center text-gray-800">
          Hãy kết nối với chúng tôi 🌸
        </h1>

        <p className="text-gray-500 text-center max-w-md px-5 pb-10 leading-relaxed text-sm">
           Hoặc bạn có thể liên hệ trực tiếp qua email {" "}
          <a
            href="#"
            className="text-rose-500 hover:underline hover:text-rose-600 transition"
          >
            vietphamdinhvan@gmail.com
          </a>
        </p>

        {/* Form */}
        <div className="max-w-md w-full px-6">
          {/* Name */}
          <label htmlFor="name" className="font-medium text-sm">
             Họ và tên
          </label>
          <div className="flex items-center mt-2 mb-6 h-11 pl-3 border border-slate-300/70 rounded-full bg-white focus-within:ring-2 focus-within:ring-rose-200 transition-all">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-70"
            >
              <path
                d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
                fill="#64748b"
              />
            </svg>
            <input
              type="text"
              className="h-full px-3 w-full outline-none bg-transparent text-sm"
              placeholder="Nhập họ và tên của bạn"
              required
            />
          </div>

          {/* Email */}
          <label htmlFor="email" className="font-medium text-sm">
            Địa chỉ email
          </label>
          <div className="flex items-center mt-2 mb-6 h-11 pl-3 border border-slate-300/70 rounded-full bg-white focus-within:ring-2 focus-within:ring-rose-200 transition-all">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-70"
            >
              <path
                d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z"
                fill="#64748b"
              />
            </svg>
            <input
              type="email"
              className="h-full px-3 w-full outline-none bg-transparent text-sm"
              placeholder="Nhập địa chỉ email của bạn"
              required
            />
          </div>

          {/* Message */}
          <label htmlFor="message" className="font-medium text-sm">
            Lời nhắn
          </label>
          <textarea
            rows="4"
            className="w-full mt-2 p-3 bg-white border border-slate-300/70 rounded-2xl resize-none outline-none text-sm focus:ring-2 focus-within:ring-rose-200 transition-all"
            placeholder="Nhập nội dung bạn muốn gửi"
            required
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-6 bg-secondary hover:opacity-90 text-white font-medium py-2.5 w-full rounded-full transition-all duration-300 shadow-sm"
          >
            Gửi
            <svg
              className="mt-0.5"
              width="20"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}
