import React from "react";
import { motion } from "framer-motion";

const Title = ({
  title1,
  title2,
  titleStyles,
  title1Styles,
  paraStyles,
  para,
}) => {
  return (
    <motion.div
      className={`${titleStyles} text-center md:text-left space-y-3`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.h3
        className={`${title1Styles} h3 capitalize flex items-center justify-center md:justify-start gap-2 tracking-wide font-semibold text-[#4A4A4A]`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title1}
        <span className="font-light text-[#F4A7B9]">{title2}</span>
      </motion.h3>

      <motion.div
        className="relative flex justify-center md:justify-start"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="w-24 h-[2.5px] bg-gradient-to-r from-[#FADADD] via-[#F4A7B9] to-transparent rounded-full shadow-[0_0_6px_#FADADD]" />
      </motion.div>

      <motion.p
        className={`${paraStyles} max-w-lg mt-2 text-[#5F5F5F] leading-relaxed text-sm md:text-base italic`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {para
          ? para
          : "Cùng khám phá dòng mỹ phẩm giúp thăng hoa nhan sắc, đánh thức vẻ rạng ngời và lan tỏa sự tự tin trong từng khoảnh khắc"}
      </motion.p>
    </motion.div>
  );
};

export default Title;
