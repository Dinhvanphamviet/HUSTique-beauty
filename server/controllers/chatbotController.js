import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const createSearchRegex = (query) => {
  const stopWords = [
    "bị", "của", "và", "là", "có", "không", "thì", "mà", "cần", "để",
    "tôi", "bạn", "shop", "cửa", "hàng", "cho", "hỏi", "về", "sản", "phẩm",
    "mua", "dùng", "sử", "dụng", "nào", "gì", "thế", "nào", "hay", "khi",
    "thể", "được", "ạ", "chứ", "khá", "rất", "ko"
  ];

  const keywords = query
    .toLowerCase()
    .match(/(\p{L}|\d){2,}/gu) || [];

  const filteredKeywords = keywords.filter(k => !stopWords.includes(k));
  const finalKeywords = filteredKeywords.length > 0 
    ? filteredKeywords 
    : keywords.filter(k => !stopWords.includes(k) && k.length > 1);

  if (finalKeywords.length === 0) return new RegExp("a^", "i");

  return new RegExp(
    finalKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "i"
  );
};

export const handleChat = async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) return res.status(400).json({ message: "Vui lòng cung cấp nội dung." });

    let productContext = "";
    let systemInstruction = "";

    const getAllUniqueCategories = async () => {
      const categories = await Product.distinct("category");
      return categories.filter(c => c && c.trim() !== '');
    };

    const categoryQueryRegex = /danh mục|các dòng sản phẩm|shop có gì|sản phẩm của shop|bán những gì|shop bán gì/i;

    if (categoryQueryRegex.test(prompt)) {
      const uniqueCategories = await getAllUniqueCategories();

      if (uniqueCategories.length > 0) {
        productContext = `
          DỮ LIỆU DANH MỤC SẢN PHẨM HIỆN CÓ CỦA HUSTIQUE BEAUTY:
          - Danh sách các danh mục: ${uniqueCategories.join(", ")}
        `;
        systemInstruction = `
          Bạn là trợ lý ảo của HUSTique Beauty.
          **QUY TẮC BẮT BUỘC: HÃY CHỈ TRẢ LỜI BẰNG CÁCH LIỆT KÊ TẤT CẢ CÁC DANH MỤC CÓ TRONG CONTEXT.**
          **TUYỆT ĐỐI KHÔNG ĐƯỢC GIỚI THIỆU, MÔ TẢ, HOẶC NÊU GIÁ CỦA BẤT KỲ SẢN PHẨM CỤ THỂ NÀO.**
          Hãy liệt kê các danh mục một cách thân thiện và mời khách hàng hỏi chi tiết hơn về một danh mục nào đó.
        `;
      } else {
        productContext = "";
        systemInstruction = "Bạn là trợ lý HUSTique Beauty. Hiện tại shop chưa cập nhật danh mục.";
      }

      const currentTurnPrompt = `
          ${systemInstruction}
          ---
          CONTEXT DỮ LIỆU:
          ${productContext || "Không có dữ liệu."}
          ---
          Câu hỏi khách hàng: "${prompt}"
          Trả lời:
      `;

      const chatHistory = Array.isArray(history) ? history : [];
      const fullConversation = [
        ...chatHistory,
        { role: "user", parts: [{ text: currentTurnPrompt }] }
      ];
      const result = await model.generateContent({ contents: fullConversation });
      const response = await result.response;
      const text = response.text();
      res.status(200).json({ response: text });
      return;
    }

    const cleanPrompt = prompt
      .replace(/chi tiết về|thông tin về|hỏi về|tư vấn về/i, "")
      .trim();

    const exactProduct = await Product.findOne({ title: { $regex: new RegExp(`^${cleanPrompt}$`, "i") } });

    if (exactProduct) {
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
      const searchRegex = createSearchRegex(prompt);

      let relevantProducts = [];

      const categoryProducts = await Product.find({
        category: { $regex: searchRegex }
      }).limit(3);

      relevantProducts = [...categoryProducts];

      if (relevantProducts.length < 3) {
        const additionalProducts = await Product.find({
          $and: [
            { _id: { $nin: relevantProducts.map(p => p._id) } },
            {
              $or: [
                { title: { $regex: searchRegex } },
                { description: { $regex: searchRegex } },
                { type: { $regex: searchRegex } },
              ]
            }
          ]
        }).limit(3 - relevantProducts.length);

        relevantProducts = [...relevantProducts, ...additionalProducts];
      }

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

            return `
              **Tên SP:** ${p.title}
              **Danh mục:** ${p.category || 'Chưa phân loại'}
              **Loại SP:** ${p.type || 'Không rõ'}
              ${priceString}
              **Mô tả:** *${p.description || "Không có mô tả."}*
            `;
          }).join("\n\n")}
        `;

        systemInstruction = `
          Bạn là trợ lý ảo HUSTique Beauty.
          QUY TẮC BẮT BUỘC: HÃY CHỈ SỬ DỤNG DỮ LIỆU ĐƯỢC CUNG CẤP TRONG DỮ LIỆU GỢI Ý.
          Ưu tiên giới thiệu các sản phẩm có trong danh sách và sử dụng thông tin chi tiết (như mô tả, thành phần) để trả lời.
          **HÃY TUYỆT ĐỐI ƯU TIÊN GIỚI THIỆU SẢN PHẨM CÓ DANH MỤC HOẶC MÔ TẢ PHÙ HỢP CHUYÊN BIỆT NHẤT VỚI CÂU HỎI CỦA KHÁCH HÀNG.**
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

    const currentTurnPrompt = `
      ${systemInstruction}
      ---
      CONTEXT DỮ LIỆU:
      ${productContext || "Không có dữ liệu."}
      ---
      Câu hỏi khách hàng: "${prompt}"
      Trả lời:
    `;

    const chatHistory = Array.isArray(history) ? history : [];
    const fullConversation = [
      ...chatHistory,
      { role: "user", parts: [{ text: currentTurnPrompt }] }
    ];

    const result = await model.generateContent({ contents: fullConversation });
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });

  } catch (error) {
    res.status(500).json({ message: "Lỗi xử lý từ phía server.", error: error.message });
  }
};
