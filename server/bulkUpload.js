import mongoose from "mongoose";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Product.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dummyProducts = [
  {
    _id: "1",
    title: "Dầu Argan Dưỡng Tóc",
    images: ["product_1.png"],
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description:
      "Nuôi dưỡng mái tóc với dầu Argan giàu vitamin, mang lại độ óng ả và chắc khỏe. Kết cấu nhẹ, thẩm thấu nhanh, không gây bết dính.",
    category: "Chăm sóc tóc",
    type: "Dầu dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "2",
    title: "Dầu Dừa Dưỡng Thể",
    images: ["product_21.png", "product_22.png", "product_23.png", "product_24.png"],
    price: { "100ml": 20, "200ml": 35, "400ml": 50 },
    description:
      "Cấp ẩm chuyên sâu với dầu dừa tự nhiên, giúp da mềm mịn và đàn hồi. Hương dừa dịu nhẹ, mang lại cảm giác thư giãn dễ chịu.",
    category: "Chăm sóc cơ thể",
    type: "Dầu dưỡng",
    sizes: ["100ml", "200ml", "400ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "3",
    title: "Dầu Jojoba Dưỡng Da Mặt",
    images: ["product_3.png"],
    price: { "30ml": 25, "50ml": 40, "100ml": 60 },
    description:
      "Cân bằng da với dầu Jojoba, phù hợp mọi loại da. Giúp điều tiết bã nhờn tự nhiên và giữ ẩm nhẹ nhàng.",
    category: "Chăm sóc da mặt",
    type: "Dầu dưỡng",
    sizes: ["30ml", "50ml", "100ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "4",
    title: "Dầu Tràm Trà Cho Da Đầu",
    images: ["product_4.png"],
    price: { "50ml": 18, "100ml": 30, "200ml": 45 },
    description:
      "Thanh lọc da đầu với dầu tràm trà, hỗ trợ giảm gàu và kích thích mọc tóc. Tinh chất kháng khuẩn tự nhiên cho da đầu sạch khỏe.",
    category: "Chăm sóc tóc",
    type: "Dầu dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "5",
    title: "Dầu Hạnh Nhân Dưỡng Thể",
    images: ["product_5.png"],
    price: { "100ml": 22, "200ml": 38, "400ml": 55 },
    description:
      "Làm mềm da với dầu hạnh nhân giàu vitamin E. Kết cấu dịu nhẹ, phù hợp cho cả làn da nhạy cảm.",
    category: "Chăm sóc cơ thể",
    type: "Dầu dưỡng",
    sizes: ["100ml", "200ml", "400ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "6",
    title: "Dầu Tầm Xuân Dưỡng Da Mặt",
    images: ["product_6.png"],
    price: { "30ml": 28, "50ml": 45, "100ml": 65 },
    description:
      "Trẻ hóa làn da với dầu tầm xuân giàu chất chống oxy hóa. Hỗ trợ giảm nếp nhăn và mờ sẹo.",
    category: "Chăm sóc da mặt",
    type: "Dầu dưỡng",
    sizes: ["30ml", "50ml", "100ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "7",
    title: "Dầu Thầu Dầu Dưỡng Tóc",
    images: ["product_7.png"],
    price: { "50ml": 12, "100ml": 20, "200ml": 35 },
    description:
      "Tăng cường độ dày và độ bóng mượt cho tóc với dầu thầu dầu. Giúp ngăn ngừa chẻ ngọn và gãy rụng.",
    category: "Chăm sóc tóc",
    type: "Dầu dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "8",
    title: "Dầu Oải Hương Dưỡng Thể",
    images: ["product_8.png"],
    price: { "100ml": 25, "200ml": 40, "400ml": 60 },
    description:
      "Thư giãn cơ thể với dầu oải hương, mang lại giấc ngủ sâu và tinh thần an yên. Hương thơm dịu nhẹ, lý tưởng cho buổi tối.",
    category: "Chăm sóc cơ thể",
    type: "Dầu dưỡng",
    sizes: ["100ml", "200ml", "400ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "9",
    title: "Dầu Vitamin C Dưỡng Da Mặt",
    images: ["product_9.png"],
    price: { "30ml": 30, "50ml": 50, "100ml": 75 },
    description:
      "Làm sáng da với dầu Vitamin C, giúp giảm thâm sạm và đều màu da. Bảo vệ da trước tác hại môi trường.",
    category: "Chăm sóc da mặt",
    type: "Dầu dưỡng",
    sizes: ["30ml", "50ml", "100ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "10",
    title: "Nước Hoa Hương Cam Chanh",
    images: ["product_10.png"],
    price: { "50ml": 40, "100ml": 60, "200ml": 85 },
    description:
      "Khởi nguồn ngày mới tươi mát với hương chanh cam thanh khiết. Lưu hương bền lâu, mang lại sự sảng khoái suốt ngày dài.",
    category: "Chăm sóc cơ thể",
    type: "Nước hoa",
    sizes: ["50ml", "100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "11",
    title: "Nước Hoa Hương Hoa Nhài",
    images: ["product_11.png"],
    price: { "50ml": 42, "100ml": 65, "200ml": 90 },
    description:
      "Sự tinh tế của hương hoa nhài mang lại cảm giác thanh khiết và nữ tính, lưu hương dịu nhẹ cả ngày.",
    category: "Chăm sóc cơ thể",
    type: "Nước hoa",
    sizes: ["50ml", "100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "12",
    title: "Nước Hoa Hương Gỗ Trầm",
    images: ["product_12.png"],
    price: { "50ml": 45, "100ml": 70, "200ml": 95 },
    description:
      "Hương gỗ trầm ấm áp, tạo cảm giác sang trọng và mạnh mẽ, lưu lại ấn tượng khó quên.",
    category: "Chăm sóc cơ thể",
    type: "Nước hoa",
    sizes: ["50ml", "100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "13",
    title: "Kem Dưỡng Ẩm Toàn Thân",
    images: ["product_13.png"],
    price: { "200ml": 25, "400ml": 40, "600ml": 55 },
    description:
      "Công thức giàu dưỡng chất giúp cấp ẩm tức thì, mang lại làn da mịn màng và đàn hồi suốt 24 giờ.",
    category: "Chăm sóc cơ thể",
    type: "Kem dưỡng",
    sizes: ["200ml", "400ml", "600ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "14",
    title: "Kem Dưỡng Da Tay Hoa Anh Đào",
    images: ["product_14.png"],
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description:
      "Hương hoa anh đào dịu nhẹ cùng công thức giàu ẩm giúp đôi tay mềm mại và ngát hương.",
    category: "Chăm sóc cơ thể",
    type: "Kem dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "15",
    title: "Kem Dưỡng Da Mặt Ban Ngày SPF 30",
    images: ["product_15.png"],
    price: { "50ml": 35, "100ml": 55 },
    description:
      "Bảo vệ da khỏi tia UV và cấp ẩm suốt cả ngày. Kết cấu nhẹ, thẩm thấu nhanh, lý tưởng cho lớp nền trang điểm.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["50ml", "100ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "16",
    title: "Kem Dưỡng Da Mặt Ban Đêm",
    images: ["product_16.png"],
    price: { "50ml": 38, "100ml": 60 },
    description:
      "Nuôi dưỡng sâu khi bạn ngủ, giúp da phục hồi và tái tạo tự nhiên. Cho làn da căng mịn vào sáng hôm sau.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["50ml", "100ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "17",
    title: "Sữa Rửa Mặt Dịu Nhẹ",
    images: ["product_17.png"],
    price: { "100ml": 20, "200ml": 35 },
    description:
      "Làm sạch bụi bẩn và bã nhờn mà không gây khô căng. Công thức dịu nhẹ, phù hợp với da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "18",
    title: "Sữa Rửa Mặt Trà Xanh",
    images: ["product_18.png"],
    price: { "100ml": 22, "200ml": 38 },
    description:
      "Chiết xuất trà xanh giúp thanh lọc và làm dịu da, đồng thời hỗ trợ kiểm soát nhờn hiệu quả.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "19",
    title: "Sữa Rửa Mặt Than Hoạt Tính",
    images: ["product_19.png"],
    price: { "100ml": 24, "200ml": 40 },
    description:
      "Làm sạch sâu với than hoạt tính, hút sạch bụi bẩn và tạp chất, mang lại làn da sáng khỏe.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "20",
    title: "Tinh Chất Serum Vitamin C",
    images: ["product_20.png"],
    price: { "30ml": 28, "50ml": 45 },
    description:
      "Làm sáng da, giảm thâm sạm và đều màu da. Serum Vitamin C thấm nhanh, không gây nhờn rít.",
    category: "Chăm sóc da mặt",
    type: "Serum",
    sizes: ["30ml", "50ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "21",
    title: "Kem Dưỡng Ẩm Ban Ngày SPF 30",
    images: ["product_21.png"],
    price: { "30ml": 28, "50ml": 45 },
    description:
      "Kem dưỡng ẩm ban ngày nhẹ nhàng, bảo vệ da khỏi tia UV với SPF 30, duy trì làn da mềm mịn cả ngày.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "22",
    title: "Kem Dưỡng Ẩm Ban Đêm",
    images: ["product_22.png"],
    price: { "30ml": 30, "50ml": 48 },
    description:
      "Nuôi dưỡng và phục hồi làn da suốt đêm, giúp da mềm mại, mịn màng khi thức dậy.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "23",
    title: "Kem Mắt Chống Nhăn",
    images: ["product_23.png"],
    price: { "15ml": 22, "30ml": 38 },
    description:
      "Giảm nếp nhăn và quầng thâm quanh mắt, cung cấp độ ẩm và làm sáng vùng da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Kem mắt",
    sizes: ["15ml", "30ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "24",
    title: "Kem Mắt Dưỡng Ẩm",
    images: ["product_24.png"],
    price: { "15ml": 20, "30ml": 36 },
    description:
      "Cung cấp độ ẩm nhẹ nhàng quanh mắt, giảm cảm giác khô và mệt mỏi cho làn da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Kem mắt",
    sizes: ["15ml", "30ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "25",
    title: "Sữa Rửa Mặt Dịu Nhẹ",
    images: ["product_25.png"],
    price: { "100ml": 15, "200ml": 25 },
    description:
      "Sữa rửa mặt dịu nhẹ, loại bỏ bụi bẩn và bã nhờn mà không làm khô da, thích hợp cho mọi loại da.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "26",
    title: "Sữa Rửa Mặt Tạo Bọt",
    images: ["product_26.png"],
    price: { "100ml": 16, "200ml": 27 },
    description:
      "Sữa rửa mặt tạo bọt mịn, làm sạch sâu và thanh lọc lỗ chân lông, mang lại cảm giác tươi mới.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "27",
    title: "Mặt Nạ Giấy Dưỡng Ẩm",
    images: ["product_27.png"],
    price: { "1 miếng": 5, "5 miếng": 22 },
    description:
      "Mặt nạ giấy giàu dưỡng chất, giúp cấp ẩm tức thì, mang lại làn da mịn màng và mềm mại.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["1 miếng", "5 miếng"],
    popular: true,
    inStock: true,
  },
  {
    _id: "28",
    title: "Mặt Nạ Ngủ Dưỡng Da",
    images: ["product_28.png"],
    price: { "50ml": 28, "100ml": 50 },
    description:
      "Mặt nạ ngủ giàu dưỡng chất, phục hồi da trong khi bạn ngủ, giúp da sáng và căng mượt vào sáng hôm sau.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["50ml", "100ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "29",
    title: "Xịt Khoáng Làm Dịu Da",
    images: ["product_29.png"],
    price: { "50ml": 12, "100ml": 20 },
    description:
      "Xịt khoáng làm dịu da, cấp ẩm tức thì, phù hợp cho mọi loại da và các tình huống khô da đột ngột.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["50ml", "100ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "30",
    title: "Xịt Khoáng Dưỡng Ẩm",
    images: ["product_30.png"],
    price: { "50ml": 13, "100ml": 22 },
    description:
      "Giữ cho làn da luôn tươi mát, cấp ẩm lâu dài và giúp lớp trang điểm bền đẹp hơn.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["50ml", "100ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "31",
    title: "Sữa Tắm Dịu Nhẹ",
    images: ["product_31.png"],
    price: { "200ml": 18, "500ml": 38 },
    description:
      "Sữa tắm dịu nhẹ, làm sạch cơ thể mà không gây khô da, lưu lại hương thơm nhẹ nhàng suốt ngày.",
    category: "Chăm sóc cơ thể",
    type: "Sữa tắm",
    sizes: ["200ml", "500ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "32",
    title: "Sữa Tắm Dưỡng Ẩm",
    images: ["product_32.png"],
    price: { "200ml": 20, "500ml": 40 },
    description:
      "Sữa tắm dưỡng ẩm, bổ sung độ ẩm tự nhiên cho da, giúp da mềm mịn và khỏe mạnh.",
    category: "Chăm sóc cơ thể",
    type: "Sữa tắm",
    sizes: ["200ml", "500ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "33",
    title: "Dầu Gội Dịu Nhẹ",
    images: ["product_33.png"],
    price: { "200ml": 18, "500ml": 35 },
    description:
      "Dầu gội nhẹ nhàng làm sạch tóc và da đầu, phù hợp cho mọi loại tóc, không gây khô xơ.",
    category: "Chăm sóc tóc",
    type: "Dầu gội",
    sizes: ["200ml", "500ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "34",
    title: "Dầu Gội Dưỡng Ẩm",
    images: ["product_34.png"],
    price: { "200ml": 20, "500ml": 38 },
    description:
      "Dầu gội giàu dưỡng chất, giúp tóc mềm mượt, chắc khỏe và dễ chải suốt cả ngày.",
    category: "Chăm sóc tóc",
    type: "Dầu gội",
    sizes: ["200ml", "500ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "35",
    title: "Dầu Xả Dưỡng Tóc",
    images: ["product_35.png"],
    price: { "200ml": 18, "500ml": 36 },
    description:
      "Dầu xả cung cấp độ ẩm, giúp tóc mềm mượt, suôn mượt và dễ chải hơn sau khi gội.",
    category: "Chăm sóc tóc",
    type: "Dầu xả",
    sizes: ["200ml", "500ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "36",
    title: "Dầu Xả Phục Hồi Tóc",
    images: ["product_36.png"],
    price: { "200ml": 20, "500ml": 38 },
    description:
      "Dầu xả phục hồi tóc hư tổn, bổ sung dưỡng chất cho tóc chắc khỏe và óng mượt tự nhiên.",
    category: "Chăm sóc tóc",
    type: "Dầu xả",
    sizes: ["200ml", "500ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "37",
    title: "Kem Tay Dưỡng Ẩm",
    images: ["product_37.png"],
    price: { "50ml": 12, "100ml": 20 },
    description:
      "Kem tay dưỡng ẩm, giúp đôi bàn tay mềm mại, mịn màng và không bị khô ráp.",
    category: "Chăm sóc cơ thể",
    type: "Kem tay",
    sizes: ["50ml", "100ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "38",
    title: "Kem Chân Dưỡng Ẩm",
    images: ["product_38.png"],
    price: { "50ml": 14, "100ml": 24 },
    description:
      "Kem chân giúp cấp ẩm sâu, làm mềm da và ngăn ngừa nứt nẻ, đem lại cảm giác dễ chịu suốt ngày.",
    category: "Chăm sóc cơ thể",
    type: "Kem chân",
    sizes: ["50ml", "100ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "39",
    title: "Son Dưỡng Môi",
    images: ["product_39.png"],
    price: { "5g": 10, "10g": 18 },
    description:
      "Son dưỡng môi mềm mịn, giữ ẩm và làm môi căng bóng tự nhiên.",
    category: "Chăm sóc môi",
    type: "Son dưỡng",
    sizes: ["5g", "10g"],
    popular: true,
    inStock: true,
  },
  {
    _id: "40",
    title: "Son Dưỡng Môi Có Màu Nhẹ",
    images: ["product_40.png"],
    price: { "5g": 12, "10g": 20 },
    description:
      "Son dưỡng môi có màu nhẹ nhàng, vừa dưỡng ẩm vừa tạo màu tự nhiên cho đôi môi.",
    category: "Chăm sóc môi",
    type: "Son dưỡng",
    sizes: ["5g", "10g"],
    popular: false,
    inStock: true,
  },
  {
    _id: "41",
    title: "Tẩy Trang Mắt & Môi",
    images: ["product_41.png"],
    price: { "100ml": 15, "200ml": 28 },
    description:
      "Dung dịch tẩy trang nhẹ nhàng, làm sạch lớp trang điểm mắt và môi mà không gây kích ứng.",
    category: "Chăm sóc da mặt",
    type: "Tẩy trang",
    sizes: ["100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "42",
    title: "Tẩy Trang Mặt Dịu Nhẹ",
    images: ["product_42.png"],
    price: { "100ml": 16, "200ml": 30 },
    description:
      "Tẩy trang dịu nhẹ, loại bỏ bụi bẩn và lớp trang điểm, giúp da sạch sâu mà không bị khô.",
    category: "Chăm sóc da mặt",
    type: "Tẩy trang",
    sizes: ["100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "43",
    title: "Serum Dưỡng Da Chống Lão Hóa",
    images: ["product_43.png"],
    price: { "30ml": 35, "50ml": 58 },
    description:
      "Serum giàu dưỡng chất, giúp làm mờ nếp nhăn, nâng cơ và làm da săn chắc, tươi trẻ.",
    category: "Chăm sóc da mặt",
    type: "Serum",
    sizes: ["30ml", "50ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "44",
    title: "Serum Dưỡng Ẩm Chuyên Sâu",
    images: ["product_44.png"],
    price: { "30ml": 32, "50ml": 55 },
    description:
      "Serum dưỡng ẩm chuyên sâu, giúp da mềm mượt, căng bóng và duy trì độ ẩm lâu dài.",
    category: "Chăm sóc da mặt",
    type: "Serum",
    sizes: ["30ml", "50ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "45",
    title: "Mặt Nạ Giấy Dưỡng Ẩm",
    images: ["product_45.png"],
    price: { "1 miếng": 5, "5 miếng": 22 },
    description:
      "Mặt nạ giấy cấp ẩm tức thì, giúp da mềm mại và mịn màng, phù hợp mọi loại da.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["1 miếng", "5 miếng"],
    popular: true,
    inStock: true,
  },
  {
    _id: "46",
    title: "Mặt Nạ Giấy Làm Sáng Da",
    images: ["product_46.png"],
    price: { "1 miếng": 6, "5 miếng": 28 },
    description:
      "Mặt nạ giấy giúp làm sáng da, cải thiện sắc tố da xỉn màu, đem lại làn da rạng rỡ.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["1 miếng", "5 miếng"],
    popular: false,
    inStock: true,
  },
  {
    _id: "47",
    title: "Kem Dưỡng Ban Ngày SPF 30",
    images: ["product_47.png"],
    price: { "30ml": 28, "50ml": 45 },
    description:
      "Kem dưỡng ban ngày kết hợp chống nắng SPF 30, dưỡng ẩm và bảo vệ da khỏi tác hại của ánh nắng.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "48",
    title: "Kem Dưỡng Ban Đêm Phục Hồi",
    images: ["product_48.png"],
    price: { "30ml": 30, "50ml": 48 },
    description:
      "Kem dưỡng ban đêm giúp phục hồi da, tăng độ đàn hồi và làm mờ nếp nhăn khi ngủ.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "49",
    title: "Xịt Khoáng Dịu Nhẹ",
    images: ["product_49.png"],
    price: { "100ml": 12, "200ml": 20 },
    description:
      "Xịt khoáng cung cấp độ ẩm tức thì cho da, làm dịu da mệt mỏi và giúp trang điểm lâu trôi.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["100ml", "200ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "50",
    title: "Xịt Khoáng Làm Sáng Da",
    images: ["product_50.png"],
    price: { "100ml": 14, "200ml": 24 },
    description:
      "Xịt khoáng giúp làm sáng da, đem lại làn da tươi trẻ và tràn đầy sức sống.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["100ml", "200ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "51",
    title: "Sữa Rửa Mặt Dịu Nhẹ",
    images: ["product_51.png"],
    price: { "100ml": 18, "200ml": 30, "400ml": 50 },
    description:
      "Sữa rửa mặt dịu nhẹ, làm sạch bụi bẩn và bã nhờn mà không làm khô da. Phù hợp cho mọi loại da, đặc biệt là da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "52",
    title: "Sữa Rửa Mặt Dưỡng Ẩm",
    images: ["product_52.png"],
    price: { "100ml": 20, "200ml": 35, "400ml": 55 },
    description:
      "Sữa rửa mặt dưỡng ẩm sâu, giúp da mềm mại và mịn màng sau khi rửa. Công thức nhẹ nhàng, không làm mất đi lớp dầu tự nhiên của da.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    popular: false,
    inStock: true,
  },
  {
    _id: "53",
    title: "Sữa Rửa Mặt Kiểm Soát Dầu",
    images: ["product_53.png"],
    price: { "100ml": 18, "200ml": 32, "400ml": 48 },
    description:
      "Sữa rửa mặt kiểm soát dầu, giúp giảm bóng nhờn và làm sạch sâu lỗ chân lông. Da cảm giác thoáng mát, không nhờn rít.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    popular: true,
    inStock: true,
  },
  {
    _id: "54",
    title: "Sữa Rửa Mặt Tẩy Tế Bào Chết",
    images: ["product_54.png"],
    price: { "100ml": 22, "200ml": 38, "400ml": 55 },
    description:
      "Sữa rửa mặt tẩy tế bào chết nhẹ nhàng, loại bỏ lớp da chết, mang lại làn da sáng mịn và tươi mới.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    popular: false,
    inStock: true,
  },
];


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLDN_NAME,
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_API_SECRET,
});


async function bulkUpload() {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGO_URI}`); // Or your full URI

        for (const prod of dummyProducts) {
            // Upload images to Cloudinary
            const imagesUrl = await Promise.all(
                prod.images.map(async (fileName) => {
                    const filePath = path.join(__dirname, "images", fileName);
                    const result = await cloudinary.uploader.upload(filePath, {
                        resource_type: "image",
                    });
                    return result.secure_url;
                })
            );
            // Create product in DB
            await Product.create({
                title: prod.title,
                description: prod.description,
                price: prod.price,
                sizes: prod.sizes,
                images: imagesUrl,
                category: prod.category,
                type: prod.type,
                popular: prod.popular,
                inStock: prod.inStock,
            });

            console.log(`Uploaded: ${prod.title}`);
        }

        console.log("All products uploaded successfully!");
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        mongoose.disconnect();
    }
}

bulkUpload();

