import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Đảm bảo các biến môi trường được tải
dotenv.config();

// Lấy API key từ biến môi trường
const apiKey = process.env.GEMINI_API_KEY;

// Kiểm tra API key có tồn tại không
if (!apiKey) {
  console.error("❌ API key không được thiết lập! Vui lòng đặt GEMINI_API_KEY trong file .env");
}

// Khởi tạo Google Generative AI với API key
const genAI = new GoogleGenerativeAI(apiKey);

// Tên các model Gemini có thể sử dụng
export const AVAILABLE_MODELS = {
  DEFAULT: "gemini-1.5-flash", // Thay thế gemini-pro bằng model mới nhất
  PRO: "gemini-1.5-pro",
  FLASH: "gemini-1.5-flash",
  LEGACY_PRO: "gemini-pro",
  LEGACY_PRO_VISION: "gemini-pro-vision",
  LEGACY_FLASH: "gemini-flash"
};

/**
 * Hàm để lấy danh sách các model có sẵn
 * @returns {Promise<Array>} - Danh sách các model có sẵn
 */
export async function listAvailableModels() {
  try {
    // Lấy danh sách model
    const modelList = await genAI.listModels();
    return modelList;
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách model:", error);
    return Object.values(AVAILABLE_MODELS);
  }
}

/**
 * Hàm để gửi yêu cầu đến Gemini API
 * @param {string} prompt - Câu hỏi hoặc yêu cầu gửi đến Gemini
 * @param {string} modelName - Tên model (mặc định là gemini-1.5-flash)
 * @returns {Promise<string>} - Kết quả phản hồi từ Gemini
 */
export async function askGemini(prompt, modelName = AVAILABLE_MODELS.DEFAULT) {
  try {
    console.log(`🚀 Đang gửi yêu cầu đến model ${modelName}...`);
    
    // Lấy model
    const model = genAI.getGenerativeModel({ model: modelName });

    // Thiết lập các tham số tạo sinh
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1000,
    };

    // Gửi yêu cầu đến Gemini
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    // Lấy và trả về phản hồi
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Lỗi khi kết nối với Gemini API:", error);
    
    // Thử với model khác nếu model không tồn tại
    if (error.status === 404 && modelName !== AVAILABLE_MODELS.LEGACY_PRO) {
      console.log(`⚠️ Model ${modelName} không tồn tại, thử với model ${AVAILABLE_MODELS.LEGACY_PRO}...`);
      return askGemini(prompt, AVAILABLE_MODELS.LEGACY_PRO);
    }
    
    // Ném lại lỗi để xử lý ở lớp gọi
    throw new Error(`Lỗi khi gọi Gemini API: ${error.message}`);
  }
}
export default {
  askGemini,
  listAvailableModels,
  AVAILABLE_MODELS
};
