import logoImg from "./logo.svg";
import search from "./search.svg";
import user from "./user.svg";
import menu from "./menu.svg";
import menuClose from "./menu-close.svg";
import cartAdd from "./cart-add.svg";
import cartRemove from "./cart-remove.svg";
import cartAdded from "./cart-added.svg";
import forward from "./forward.svg";
import badge from "./badge.svg";
import heartAdd from "./heart-add.svg";
import returnRequest from "./return-request.svg";
import delivery from "./delivery.svg";
import secure from "./secure.svg";
import right from "./right.svg";
import pin from "./pin.svg";
import star from "./star.svg";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import twitter from "./twitter.svg";
import linkedin from "./linkedin.svg";
import rocket from "./rocket.svg";
import mail from "./mail.svg";
import phone from "./phone.svg";
import house from "./house.svg";
import graph from "./graph.svg";
import dollar from "./dollar.svg";
import map from "./map.svg";
import list from "./list.svg";
import dashboard from "./dashboard.svg";
import plus from "./plus.svg";
import squarePlus from "./square-plus.svg";
import minus from "./minus.svg";
import trash from "./trash.svg";
import hero from "./hero.png";
import features1 from "../assets/features1.jpg";
import features2 from "../assets/features2.jpg";
import features3 from "../assets/features3.jpg";
import features4 from "../assets/features4.jpg";
import userImg from "./user.png";
import user1 from "./user1.png";
import user2 from "./user2.png";
import user3 from "./user3.png";
import user4 from "./user4.png";
import uploadIcon from "../assets/upload_icon.png";
// Products
import product_1 from "./product_1.png";
import product_2_1 from "./product_2.png";
import product_2_2 from "./product_3.png";
import product_2_3 from "./product_4.png";
import product_2_4 from "./product_5.png";
import product_3 from "./product_3.png";
import product_4 from "./product_4.png";
import product_5 from "./product_5.png";
import product_6 from "./product_6.png";
import product_7 from "./product_7.png";
import product_8 from "./product_8.png";
import product_9 from "./product_9.png";
import product_10 from "./product_10.png";
import product_11 from "./product_11.png";
import product_12 from "./product_12.png";
import product_13 from "./product_13.png";
import product_14 from "./product_14.png";
import product_15 from "./product_15.png";
import product_16 from "./product_16.png";
import product_17 from "./product_17.png";
import product_18 from "./product_18.png";
import product_19 from "./product_19.png";
import product_20 from "./product_20.png";
import product_21 from "./product_21.png";
import product_22 from "./product_22.png";
import product_23 from "./product_23.png";
import product_24 from "./product_24.png";
import product_25 from "./product_25.png";
import product_26 from "./product_26.png";
import product_27 from "./product_27.png";
import product_28 from "./product_28.png";
import product_29 from "./product_29.png";
import product_30 from "./product_30.png";
import product_31 from "./product_31.png";
import product_32 from "./product_32.png";
import product_33 from "./product_33.png";
import product_34 from "./product_34.png";
import product_35 from "./product_35.png";
import product_36 from "./product_36.png";
import product_37 from "./product_37.png";
import product_38 from "./product_38.png";
import product_39 from "./product_39.png";
import product_40 from "./product_40.png";
import product_41 from "./product_41.png";
import product_42 from "./product_42.png";
import product_43 from "./product_43.png";
import product_44 from "./product_44.png";
import product_45 from "./product_45.png";
import product_46 from "./product_46.png";
import product_47 from "./product_47.png";
import product_48 from "./product_48.png";
import product_49 from "./product_49.png";
import product_50 from "./product_50.png";
import product_51 from "./product_51.png";
import product_52 from "./product_52.png";
import product_53 from "./product_53.png";
import product_54 from "./product_54.png";
// Blogs
import blog1 from "./blogs/blog1.jpg";
import blog2 from "./blogs/blog2.jpg";
import blog3 from "./blogs/blog3.jpg";
import blog4 from "./blogs/blog4.jpg";
import blog5 from "./blogs/blog5.jpg";
import blog6 from "./blogs/blog6.jpg";
import blog7 from "./blogs/blog7.jpg";
import blog8 from "./blogs/blog8.jpg";

export const assets = {
  logoImg,
  search,
  user,
  menu,
  menuClose,
  cartAdd,
  cartRemove,
  cartAdded,
  forward,
  badge,
  heartAdd,
  returnRequest,
  delivery,
  secure,
  right,
  pin,
  star,
  facebook,
  instagram,
  twitter,
  linkedin,
  rocket,
  mail,
  phone,
  dollar,
  house,
  graph,
  map,
  dashboard,
  plus,
  minus,
  squarePlus,
  trash,
  list,
  userImg,
  user1,
  user2,
  user3,
  user4,
  hero,
  features1,
  features2,
  features3,
  features4,
  uploadIcon,
};


export const dummyProducts = [
  {
    _id: "1",
    title: "Dầu Argan Dưỡng Tóc",
    images: [product_1],
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description:
      "Nuôi dưỡng mái tóc với dầu Argan giàu vitamin, mang lại độ óng ả và chắc khỏe. Kết cấu nhẹ, thẩm thấu nhanh, không gây bết dính.",
    category: "Chăm sóc tóc",
    type: "Dầu dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "2",
    title: "Dầu Dừa Dưỡng Thể",
    images: [product_2_1, product_2_2, product_2_3, product_2_4],
    price: { "100ml": 20, "200ml": 35, "400ml": 50 },
    description:
      "Cấp ẩm chuyên sâu với dầu dừa tự nhiên, giúp da mềm mịn và đàn hồi. Hương dừa dịu nhẹ, mang lại cảm giác thư giãn dễ chịu.",
    category: "Chăm sóc cơ thể",
    type: "Dầu dưỡng",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "3",
    title: "Dầu Jojoba Dưỡng Da Mặt",
    images: [product_3],
    price: { "30ml": 25, "50ml": 40, "100ml": 60 },
    description:
      "Cân bằng da với dầu Jojoba, phù hợp mọi loại da. Giúp điều tiết bã nhờn tự nhiên và giữ ẩm nhẹ nhàng.",
    category: "Chăm sóc da mặt",
    type: "Dầu dưỡng",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "4",
    title: "Dầu Tràm Trà Cho Da Đầu",
    images: [product_4],
    price: { "50ml": 18, "100ml": 30, "200ml": 45 },
    description:
      "Thanh lọc da đầu với dầu tràm trà, hỗ trợ giảm gàu và kích thích mọc tóc. Tinh chất kháng khuẩn tự nhiên cho da đầu sạch khỏe.",
    category: "Chăm sóc tóc",
    type: "Dầu dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "5",
    title: "Dầu Hạnh Nhân Dưỡng Thể",
    images: [product_5],
    price: { "100ml": 22, "200ml": 38, "400ml": 55 },
    description:
      "Làm mềm da với dầu hạnh nhân giàu vitamin E. Kết cấu dịu nhẹ, phù hợp cho cả làn da nhạy cảm.",
    category: "Chăm sóc cơ thể",
    type: "Dầu dưỡng",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "6",
    title: "Dầu Tầm Xuân Dưỡng Da Mặt",
    images: [product_6],
    price: { "30ml": 28, "50ml": 45, "100ml": 65 },
    description:
      "Trẻ hóa làn da với dầu tầm xuân giàu chất chống oxy hóa. Hỗ trợ giảm nếp nhăn và mờ sẹo.",
    category: "Chăm sóc da mặt",
    type: "Dầu dưỡng",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "7",
    title: "Dầu Thầu Dầu Dưỡng Tóc",
    images: [product_7],
    price: { "50ml": 12, "100ml": 20, "200ml": 35 },
    description:
      "Tăng cường độ dày và độ bóng mượt cho tóc với dầu thầu dầu. Giúp ngăn ngừa chẻ ngọn và gãy rụng.",
    category: "Chăm sóc tóc",
    type: "Dầu dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "8",
    title: "Dầu Oải Hương Dưỡng Thể",
    images: [product_8],
    price: { "100ml": 25, "200ml": 40, "400ml": 60 },
    description:
      "Thư giãn cơ thể với dầu oải hương, mang lại giấc ngủ sâu và tinh thần an yên. Hương thơm dịu nhẹ, lý tưởng cho buổi tối.",
    category: "Chăm sóc cơ thể",
    type: "Dầu dưỡng",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "9",
    title: "Dầu Vitamin C Dưỡng Da Mặt",
    images: [product_9],
    price: { "30ml": 30, "50ml": 50, "100ml": 75 },
    description:
      "Làm sáng da với dầu Vitamin C, giúp giảm thâm sạm và đều màu da. Bảo vệ da trước tác hại môi trường.",
    category: "Chăm sóc da mặt",
    type: "Dầu dưỡng",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "10",
    title: "Nước Hoa Hương Cam Chanh",
    images: [product_10],
    price: { "50ml": 40, "100ml": 60, "200ml": 85 },
    description:
      "Khởi nguồn ngày mới tươi mát với hương chanh cam thanh khiết. Lưu hương bền lâu, mang lại sự sảng khoái suốt ngày dài.",
    category: "Chăm sóc cơ thể",
    type: "Nước hoa",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "11",
    title: "Nước Hoa Hương Hoa Nhài",
    images: [product_11],
    price: { "50ml": 42, "100ml": 65, "200ml": 90 },
    description:
      "Sự tinh tế của hương hoa nhài mang lại cảm giác thanh khiết và nữ tính, lưu hương dịu nhẹ cả ngày.",
    category: "Chăm sóc cơ thể",
    type: "Nước hoa",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "12",
    title: "Nước Hoa Hương Gỗ Trầm",
    images: [product_12],
    price: { "50ml": 45, "100ml": 70, "200ml": 95 },
    description:
      "Hương gỗ trầm ấm áp, tạo cảm giác sang trọng và mạnh mẽ, lưu lại ấn tượng khó quên.",
    category: "Chăm sóc cơ thể",
    type: "Nước hoa",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "13",
    title: "Kem Dưỡng Ẩm Toàn Thân",
    images: [product_13],
    price: { "200ml": 25, "400ml": 40, "600ml": 55 },
    description:
      "Công thức giàu dưỡng chất giúp cấp ẩm tức thì, mang lại làn da mịn màng và đàn hồi suốt 24 giờ.",
    category: "Chăm sóc cơ thể",
    type: "Kem dưỡng",
    sizes: ["200ml", "400ml", "600ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "14",
    title: "Kem Dưỡng Da Tay Hoa Anh Đào",
    images: [product_14],
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description:
      "Hương hoa anh đào dịu nhẹ cùng công thức giàu ẩm giúp đôi tay mềm mại và ngát hương.",
    category: "Chăm sóc cơ thể",
    type: "Kem dưỡng",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "15",
    title: "Kem Dưỡng Da Mặt Ban Ngày SPF 30",
    images: [product_15],
    price: { "50ml": 35, "100ml": 55 },
    description:
      "Bảo vệ da khỏi tia UV và cấp ẩm suốt cả ngày. Kết cấu nhẹ, thẩm thấu nhanh, lý tưởng cho lớp nền trang điểm.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "16",
    title: "Kem Dưỡng Da Mặt Ban Đêm",
    images: [product_16],
    price: { "50ml": 38, "100ml": 60 },
    description:
      "Nuôi dưỡng sâu khi bạn ngủ, giúp da phục hồi và tái tạo tự nhiên. Cho làn da căng mịn vào sáng hôm sau.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "17",
    title: "Sữa Rửa Mặt Dịu Nhẹ",
    images: [product_17],
    price: { "100ml": 20, "200ml": 35 },
    description:
      "Làm sạch bụi bẩn và bã nhờn mà không gây khô căng. Công thức dịu nhẹ, phù hợp với da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "18",
    title: "Sữa Rửa Mặt Trà Xanh",
    images: [product_18],
    price: { "100ml": 22, "200ml": 38 },
    description:
      "Chiết xuất trà xanh giúp thanh lọc và làm dịu da, đồng thời hỗ trợ kiểm soát nhờn hiệu quả.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "19",
    title: "Sữa Rửa Mặt Than Hoạt Tính",
    images: [product_19],
    price: { "100ml": 24, "200ml": 40 },
    description:
      "Làm sạch sâu với than hoạt tính, hút sạch bụi bẩn và tạp chất, mang lại làn da sáng khỏe.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "20",
    title: "Tinh Chất Serum Vitamin C",
    images: [product_20],
    price: { "30ml": 28, "50ml": 45 },
    description:
      "Làm sáng da, giảm thâm sạm và đều màu da. Serum Vitamin C thấm nhanh, không gây nhờn rít.",
    category: "Chăm sóc da mặt",
    type: "Serum",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  // 21 → 32
  {
    _id: "21",
    title: "Kem Dưỡng Ẩm Ban Ngày SPF 30",
    images: [product_21],
    price: { "30ml": 28, "50ml": 45 },
    description:
      "Kem dưỡng ẩm ban ngày nhẹ nhàng, bảo vệ da khỏi tia UV với SPF 30, duy trì làn da mềm mịn cả ngày.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "22",
    title: "Kem Dưỡng Ẩm Ban Đêm",
    images: [product_22],
    price: { "30ml": 30, "50ml": 48 },
    description:
      "Nuôi dưỡng và phục hồi làn da suốt đêm, giúp da mềm mại, mịn màng khi thức dậy.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "23",
    title: "Kem Mắt Chống Nhăn",
    images: [product_23],
    price: { "15ml": 22, "30ml": 38 },
    description:
      "Giảm nếp nhăn và quầng thâm quanh mắt, cung cấp độ ẩm và làm sáng vùng da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Kem mắt",
    sizes: ["15ml", "30ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "24",
    title: "Kem Mắt Dưỡng Ẩm",
    images: [product_24],
    price: { "15ml": 20, "30ml": 36 },
    description:
      "Cung cấp độ ẩm nhẹ nhàng quanh mắt, giảm cảm giác khô và mệt mỏi cho làn da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Kem mắt",
    sizes: ["15ml", "30ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "25",
    title: "Sữa Rửa Mặt Dịu Nhẹ",
    images: [product_25],
    price: { "100ml": 15, "200ml": 25 },
    description:
      "Sữa rửa mặt dịu nhẹ, loại bỏ bụi bẩn và bã nhờn mà không làm khô da, thích hợp cho mọi loại da.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "26",
    title: "Sữa Rửa Mặt Tạo Bọt",
    images: [product_26],
    price: { "100ml": 16, "200ml": 27 },
    description:
      "Sữa rửa mặt tạo bọt mịn, làm sạch sâu và thanh lọc lỗ chân lông, mang lại cảm giác tươi mới.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "27",
    title: "Mặt Nạ Giấy Dưỡng Ẩm",
    images: [product_27],
    price: { "1 miếng": 5, "5 miếng": 22 },
    description:
      "Mặt nạ giấy giàu dưỡng chất, giúp cấp ẩm tức thì, mang lại làn da mịn màng và mềm mại.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["1 miếng", "5 miếng"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "28",
    title: "Mặt Nạ Ngủ Dưỡng Da",
    images: [product_28],
    price: { "50ml": 28, "100ml": 50 },
    description:
      "Mặt nạ ngủ giàu dưỡng chất, phục hồi da trong khi bạn ngủ, giúp da sáng và căng mượt vào sáng hôm sau.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "29",
    title: "Xịt Khoáng Làm Dịu Da",
    images: [product_29],
    price: { "50ml": 12, "100ml": 20 },
    description:
      "Xịt khoáng làm dịu da, cấp ẩm tức thì, phù hợp cho mọi loại da và các tình huống khô da đột ngột.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "30",
    title: "Xịt Khoáng Dưỡng Ẩm",
    images: [product_30],
    price: { "50ml": 13, "100ml": 22 },
    description:
      "Giữ cho làn da luôn tươi mát, cấp ẩm lâu dài và giúp lớp trang điểm bền đẹp hơn.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "31",
    title: "Sữa Tắm Dịu Nhẹ",
    images: [product_31],
    price: { "200ml": 18, "500ml": 38 },
    description:
      "Sữa tắm dịu nhẹ, làm sạch cơ thể mà không gây khô da, lưu lại hương thơm nhẹ nhàng suốt ngày.",
    category: "Chăm sóc cơ thể",
    type: "Sữa tắm",
    sizes: ["200ml", "500ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "32",
    title: "Sữa Tắm Dưỡng Ẩm",
    images: [product_32],
    price: { "200ml": 20, "500ml": 40 },
    description:
      "Sữa tắm dưỡng ẩm, bổ sung độ ẩm tự nhiên cho da, giúp da mềm mịn và khỏe mạnh.",
    category: "Chăm sóc cơ thể",
    type: "Sữa tắm",
    sizes: ["200ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  // 33 → 44
  {
    _id: "33",
    title: "Dầu Gội Dịu Nhẹ",
    images: [product_33],
    price: { "200ml": 18, "500ml": 35 },
    description:
      "Dầu gội nhẹ nhàng làm sạch tóc và da đầu, phù hợp cho mọi loại tóc, không gây khô xơ.",
    category: "Chăm sóc tóc",
    type: "Dầu gội",
    sizes: ["200ml", "500ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "34",
    title: "Dầu Gội Dưỡng Ẩm",
    images: [product_34],
    price: { "200ml": 20, "500ml": 38 },
    description:
      "Dầu gội giàu dưỡng chất, giúp tóc mềm mượt, chắc khỏe và dễ chải suốt cả ngày.",
    category: "Chăm sóc tóc",
    type: "Dầu gội",
    sizes: ["200ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "35",
    title: "Dầu Xả Dưỡng Tóc",
    images: [product_35],
    price: { "200ml": 18, "500ml": 36 },
    description:
      "Dầu xả cung cấp độ ẩm, giúp tóc mềm mượt, suôn mượt và dễ chải hơn sau khi gội.",
    category: "Chăm sóc tóc",
    type: "Dầu xả",
    sizes: ["200ml", "500ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "36",
    title: "Dầu Xả Phục Hồi Tóc",
    images: [product_36],
    price: { "200ml": 20, "500ml": 38 },
    description:
      "Dầu xả phục hồi tóc hư tổn, bổ sung dưỡng chất cho tóc chắc khỏe và óng mượt tự nhiên.",
    category: "Chăm sóc tóc",
    type: "Dầu xả",
    sizes: ["200ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "37",
    title: "Kem Tay Dưỡng Ẩm",
    images: [product_37],
    price: { "50ml": 12, "100ml": 20 },
    description:
      "Kem tay dưỡng ẩm, giúp đôi bàn tay mềm mại, mịn màng và không bị khô ráp.",
    category: "Chăm sóc cơ thể",
    type: "Kem tay",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "38",
    title: "Kem Chân Dưỡng Ẩm",
    images: [product_38],
    price: { "50ml": 14, "100ml": 24 },
    description:
      "Kem chân giúp cấp ẩm sâu, làm mềm da và ngăn ngừa nứt nẻ, đem lại cảm giác dễ chịu suốt ngày.",
    category: "Chăm sóc cơ thể",
    type: "Kem chân",
    sizes: ["50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "39",
    title: "Son Dưỡng Môi",
    images: [product_39],
    price: { "5g": 10, "10g": 18 },
    description:
      "Son dưỡng môi mềm mịn, giữ ẩm và làm môi căng bóng tự nhiên.",
    category: "Chăm sóc môi",
    type: "Son dưỡng",
    sizes: ["5g", "10g"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "40",
    title: "Son Dưỡng Môi Có Màu Nhẹ",
    images: [product_40],
    price: { "5g": 12, "10g": 20 },
    description:
      "Son dưỡng môi có màu nhẹ nhàng, vừa dưỡng ẩm vừa tạo màu tự nhiên cho đôi môi.",
    category: "Chăm sóc môi",
    type: "Son dưỡng",
    sizes: ["5g", "10g"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "41",
    title: "Tẩy Trang Mắt & Môi",
    images: [product_41],
    price: { "100ml": 15, "200ml": 28 },
    description:
      "Dung dịch tẩy trang nhẹ nhàng, làm sạch lớp trang điểm mắt và môi mà không gây kích ứng.",
    category: "Chăm sóc da mặt",
    type: "Tẩy trang",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "42",
    title: "Tẩy Trang Mặt Dịu Nhẹ",
    images: [product_42],
    price: { "100ml": 16, "200ml": 30 },
    description:
      "Tẩy trang dịu nhẹ, loại bỏ bụi bẩn và lớp trang điểm, giúp da sạch sâu mà không bị khô.",
    category: "Chăm sóc da mặt",
    type: "Tẩy trang",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "43",
    title: "Serum Dưỡng Da Chống Lão Hóa",
    images: [product_43],
    price: { "30ml": 35, "50ml": 58 },
    description:
      "Serum giàu dưỡng chất, giúp làm mờ nếp nhăn, nâng cơ và làm da săn chắc, tươi trẻ.",
    category: "Chăm sóc da mặt",
    type: "Serum",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "44",
    title: "Serum Dưỡng Ẩm Chuyên Sâu",
    images: [product_44],
    price: { "30ml": 32, "50ml": 55 },
    description:
      "Serum dưỡng ẩm chuyên sâu, giúp da mềm mượt, căng bóng và duy trì độ ẩm lâu dài.",
    category: "Chăm sóc da mặt",
    type: "Serum",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "45",
    title: "Mặt Nạ Giấy Dưỡng Ẩm",
    images: [product_45],
    price: { "1 miếng": 5, "5 miếng": 22 },
    description:
      "Mặt nạ giấy cấp ẩm tức thì, giúp da mềm mại và mịn màng, phù hợp mọi loại da.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["1 miếng", "5 miếng"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "46",
    title: "Mặt Nạ Giấy Làm Sáng Da",
    images: [product_46],
    price: { "1 miếng": 6, "5 miếng": 28 },
    description:
      "Mặt nạ giấy giúp làm sáng da, cải thiện sắc tố da xỉn màu, đem lại làn da rạng rỡ.",
    category: "Chăm sóc da mặt",
    type: "Mặt nạ",
    sizes: ["1 miếng", "5 miếng"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "47",
    title: "Kem Dưỡng Ban Ngày SPF 30",
    images: [product_47],
    price: { "30ml": 28, "50ml": 45 },
    description:
      "Kem dưỡng ban ngày kết hợp chống nắng SPF 30, dưỡng ẩm và bảo vệ da khỏi tác hại của ánh nắng.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "48",
    title: "Kem Dưỡng Ban Đêm Phục Hồi",
    images: [product_48],
    price: { "30ml": 30, "50ml": 48 },
    description:
      "Kem dưỡng ban đêm giúp phục hồi da, tăng độ đàn hồi và làm mờ nếp nhăn khi ngủ.",
    category: "Chăm sóc da mặt",
    type: "Kem dưỡng",
    sizes: ["30ml", "50ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "49",
    title: "Xịt Khoáng Dịu Nhẹ",
    images: [product_49],
    price: { "100ml": 12, "200ml": 20 },
    description:
      "Xịt khoáng cung cấp độ ẩm tức thì cho da, làm dịu da mệt mỏi và giúp trang điểm lâu trôi.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "50",
    title: "Xịt Khoáng Làm Sáng Da",
    images: [product_50],
    price: { "100ml": 14, "200ml": 24 },
    description:
      "Xịt khoáng giúp làm sáng da, đem lại làn da tươi trẻ và tràn đầy sức sống.",
    category: "Chăm sóc da mặt",
    type: "Xịt khoáng",
    sizes: ["100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "51",
    title: "Sữa Rửa Mặt Dịu Nhẹ",
    images: [product_51],
    price: { "100ml": 18, "200ml": 30, "400ml": 50 },
    description:
      "Sữa rửa mặt dịu nhẹ, làm sạch bụi bẩn và bã nhờn mà không làm khô da. Phù hợp cho mọi loại da, đặc biệt là da nhạy cảm.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "52",
    title: "Sữa Rửa Mặt Dưỡng Ẩm",
    images: [product_52],
    price: { "100ml": 20, "200ml": 35, "400ml": 55 },
    description:
      "Sữa rửa mặt dưỡng ẩm sâu, giúp da mềm mại và mịn màng sau khi rửa. Công thức nhẹ nhàng, không làm mất đi lớp dầu tự nhiên của da.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "53",
    title: "Sữa Rửa Mặt Kiểm Soát Dầu",
    images: [product_53],
    price: { "100ml": 18, "200ml": 32, "400ml": 48 },
    description:
      "Sữa rửa mặt kiểm soát dầu, giúp giảm bóng nhờn và làm sạch sâu lỗ chân lông. Da cảm giác thoáng mát, không nhờn rít.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "54",
    title: "Sữa Rửa Mặt Tẩy Tế Bào Chết",
    images: [product_54],
    price: { "100ml": 22, "200ml": 38, "400ml": 55 },
    description:
      "Sữa rửa mặt tẩy tế bào chết nhẹ nhàng, loại bỏ lớp da chết, mang lại làn da sáng mịn và tươi mới.",
    category: "Chăm sóc da mặt",
    type: "Sữa rửa mặt",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  }
];


// Blogs Dummy Data 
export const blogs = [
  {
    title: "Top 10 Sản Phẩm Skincare Không Thể Thiếu 2025",
    category: "Tips Chăm Sóc Da",
    image: blog1,
    description:
      "Khám phá những sản phẩm skincare cần có trong quy trình hàng ngày để làn da rạng rỡ và khỏe mạnh trong năm 2025.",
  },
  {
    title: "Cách Chọn Tông Foundation Hoàn Hảo",
    category: "Hướng Dẫn Trang Điểm",
    image: blog2,
    description:
      "Hướng dẫn từng bước để tìm tông foundation phù hợp, mang lại lớp nền hoàn hảo và tự nhiên.",
  },
  {
    title: "Xu Hướng Chăm Sóc Tóc Mọi Cô Gái Nên Thử",
    category: "Chăm Sóc Tóc",
    image: blog3,
    description:
      "Khám phá các mẹo chăm sóc tóc và xu hướng sản phẩm mới giúp tóc chắc khỏe, dễ tạo kiểu và óng mượt.",
  },
  {
    title: "Hướng Dẫn Cơ Bản Xây Dựng Bộ Trang Điểm Cho Người Mới",
    category: "Cơ Bản Làm Đẹp",
    image: blog4,
    description:
      "Danh sách đầy đủ các món trang điểm cơ bản mà người mới nên có để trang điểm hàng ngày và dịp đặc biệt.",
  },
  {
    title: "Tối Ưu Quy Trình Chăm Sóc Da Ban Đêm",
    category: "Routine Chăm Sóc Da",
    image: blog5,
    description:
      "Học cách tạo quy trình skincare buổi tối hoàn hảo để dưỡng ẩm tối ưu và chống lão hóa hiệu quả.",
  },
  {
    title: "Lợi Ích Của Mỹ Phẩm Hữu Cơ Và Thiên Nhiên",
    category: "Lifestyle",
    image: blog6,
    description:
      "Tìm hiểu lý do ngày càng nhiều người chuyển sang mỹ phẩm thiên nhiên và lợi ích lâu dài cho làn da.",
  },
  {
    title: "Mẹo Giữ Son Lâu Trôi Cả Ngày",
    category: "Tips Trang Điểm",
    image: blog7,
    description:
      "Những mẹo đơn giản nhưng hiệu quả giúp son luôn tươi tắn từ sáng đến tối.",
  },
  {
    title: "Dự Báo Xu Hướng Làm Đẹp 2025: Trang Điểm & Skincare",
    category: "Xu Hướng Làm Đẹp",
    image: blog8,
    description:
      "Cái nhìn chuyên gia về các xu hướng trang điểm và chăm sóc da sẽ định hình phong cách trong năm 2025.",
  },
];



export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "68591d36daf423db94fa8f4f",
    firstName: "Nguyễn",
    lastName: "An",
    email: "nguyenan@gmail.com",
    street: "789 Đường Lê Lâm",
    city: "Hà Nội",
    state: "Hà Nội",
    zipcode: "100000",
    country: "Việt Nam",
    phone: "+84-912-345-678",
  },
  {
    _id: "67b5b9e54ea97fdfgdbcsd5",
    userId: "68591d36daf423db94fa8f4f",
    firstName: "Trần",
    lastName: "Minh",
    email: "tranminh@gmail.com",
    street: "456 Phố Hoàng Hoa Thám",
    city: "Hồ Chí Minh",
    state: "TP. HCM",
    zipcode: "700000",
    country: "Việt Nam",
    phone: "+84-987-654-321",
  },
];



export const dummyOrdersData = [
  {
    _id: "685a5bbfaff57babcdfcc171",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      {
        product: dummyProducts[0], // Argan Hair Oil
        quantity: 1,
        size: "50ml",
        _id: "685a5bbfaff57babcdfcc172",
      },
      {
        product: dummyProducts[3], // Tea Tree Hair Oil
        quantity: 2,
        size: "100ml",
        _id: "685a5bbfaff57babcdfcc173",
      },
    ],
    amount: 40.6,
    address: dummyAddress[0],
    status: "Out for delivery",
    paymentMethod: "COD",
    isPaid: false,
    createdAt: "2025-06-24T08:03:11.197+00:00",
    updatedAt: "2025-06-24T11:02:04.631+00:00",
    __v: 0,
  },
  {
    _id: "685a5bbfaff57babcdfcc174",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      {
        product: dummyProducts[8], // Vitamin C Face Oil
        quantity: 1,
        size: "30ml",
        _id: "685a5bbfaff57babcdfcc175",
      },
      {
        product: dummyProducts[24], // Volumizing Shampoo
        quantity: 3,
        size: "400ml",
        _id: "685a5bbfaff57babcdfcc176",
      },
    ],
    amount: 85.0,
    address: dummyAddress[0],
    status: "Delivered",
    paymentMethod: "Online",
    isPaid: true,
    createdAt: "2025-07-01T09:15:45.197+00:00",
    updatedAt: "2025-07-01T11:30:04.631+00:00",
    __v: 0,
  },
];


// Dashboard Dummy Data
export const dummyDashboardData = {
  "totalOrders": 2,
  "totalRevenue": 897,
  "orders": dummyOrdersData
}