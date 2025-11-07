// server/controllers/chatbotController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";

// Sử dụng model ổn định
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
        - Mô tả chi tiết: ${exactProduct.detailedDescription || exactProduct.description}
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
        ],
      }).limit(3);

      if (relevantProducts.length > 0) {
        productContext = `
          DỮ LIỆU GỢI Ý TỪ KHO:
          ${relevantProducts.map(p => `- Tên: ${p.title}, Giá: ${p.price} VNĐ, Mô tả: ${p.description}`).join("\n")}
        `;
        // LƯU Ý: Ở dòng trên tôi dùng 'p' làm tên biến đại diện, không phải 'product'
        
        systemInstruction = `
          Bạn là trợ lý ảo HUSTique Beauty.
          Dựa vào DỮ LIỆU GỢI Ý để tư vấn cho khách.
          Ưu tiên giới thiệu các sản phẩm có trong danh sách.
        `;
      } else {
        // Không tìm thấy gì
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
    // Trả về lỗi chi tiết hơn một chút để dễ debug nếu cần (chỉ trong môi trường dev)
    res.status(500).json({ message: "Lỗi xử lý từ phía server.", error: error.message });
  }
};