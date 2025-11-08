import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const createSearchRegex = (query) => {
  const keywords = query.match(/\w{3,}/g) || [];
  return new RegExp(keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");
};

export const handleChat = async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Vui lòng cung cấp nội dung." });
    }

    let productContext = "";
    let systemInstruction = "";

    // --- ƯU TIÊN 1: TÌM CHI TIẾT SẢN PHẨM ---
    const cleanPrompt = prompt
      .replace(/chi tiết về|thông tin về|hỏi về|tư vấn về/i, "")
      .trim();

    const exactProduct = await Product.findOne({ title: { $regex: new RegExp(`^${cleanPrompt}$`, "i") } });

    if (exactProduct) {
      // Tìm thấy 1 sản phẩm chính xác
      productContext = `
        DỮ LIỆU SẢN PHẨM CHI TIẾT:
        - Tên: ${exactProduct.title}
        - Giá: ${exactProduct.price} VNĐ
        - Tình trạng: ${exactProduct.inStock ? "Còn hàng" : "Hết hàng"}
        - Mô tả chi tiết (Tóm tắt): ${exactProduct.description}
        - Mô tả chi tiết (Đầy đủ): ${exactProduct.detailedDescription || "Không có mô tả chi tiết."}
        - Danh mục: ${exactProduct.category}
      `;
      systemInstruction = `
        Bạn là trợ lý ảo của HUSTique Beauty.
        Hãy sử dụng DỮ LIỆU SẢN PHẨM CHI TIẾT đã cung cấp để trả lời.
        Chỉ trả lời về sản phẩm này.
      `;
    } else {
      // --- ƯU TIÊN 2: TÌM GỢI Ý ---
      const searchRegex = createSearchRegex(prompt);
      const relevantProducts = await Product.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { category: { $regex: searchRegex } },
          { type: { $regex: searchRegex } },
        ],
      }).limit(3);

      if (relevantProducts.length > 0) {
        productContext = `
          DỮ LIỆU GỢI Ý TỪ KHO:
          ${relevantProducts.map(p => {
          let priceString = "";
          if (typeof p.price === "object" && p.price !== null) {
            priceString = Object.entries(p.price)
              .map(([size, value]) => `- ${size}: ${value} VNĐ`)
              .join("\n\n");
          } else {
            priceString = p.price ? `- ${p.price} VNĐ` : "- Liên hệ";
          }

          return `**${p.title}**\n\n${priceString}\n\n*${p.description || "Không có mô tả."}*`;
        }).join("\n\n")}
        `;

        systemInstruction = `
          Bạn là trợ lý ảo HUSTique Beauty.
          Dựa vào DỮ LIỆU GỢI Ý để tư vấn cho khách.
          Ưu tiên giới thiệu các sản phẩm có trong danh sách và sử dụng thông tin chi tiết (như mô tả, thành phần) để trả lời.
          **HÃY TUYỆT ĐỐI ƯU TIÊN GIỚI THIỆU SẢN PHẨM CÓ DANH MỤC HOẶC MÔ TẢ PHÙ HỢP CHUYÊN BIỆT NHẤT VỚI CÂU HỎI CỦA KHÁCH HÀNG (Ví dụ: Sản phẩm thuộc Danh mục "Chăm sóc môi" cho câu hỏi về môi khô).**
          Hãy chọn lọc và giới thiệu tối đa 3 sản phẩm liên quan.
        `;
      } else {
        productContext = "";
        systemInstruction = `
          Bạn là trợ lý HUSTique Beauty.
          Hiện không tìm thấy sản phẩm nào khớp trong kho.
          Hãy tư vấn chung chung dựa trên kiến thức làm đẹp và mời khách xem danh mục khác.
        `;
      }
    }

    // --- TẠO PROMPT VÀ GỌI GOOGLE ---
    const currentTurnPrompt = `
      ${systemInstruction}
      ---
      CONTEXT DỮ LIỆU:
      ${productContext || "Không có dữ liệu."}
      ---
      Câu hỏi khách hàng: "${prompt}"
      Trả lời:
    `;

    // Chuẩn bị lịch sử để gửi đi
    const chatHistory = Array.isArray(history) ? history : [];

    // Gộp lịch sử cũ + câu hỏi mới (kèm context)
    const fullConversation = [
      ...chatHistory,
      { role: "user", parts: [{ text: currentTurnPrompt }] }
    ];

    const result = await model.generateContent({
      contents: fullConversation
    });

    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });

  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi xử lý từ phía server.", error: error.message });
  }
};