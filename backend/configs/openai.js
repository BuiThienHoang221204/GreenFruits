import OpenAI from 'openai';
import 'dotenv/config' // đọc các biến môi trường từ file .env


// Khởi tạo OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Khóa API OpenAI từ biến môi trường
});

export async function askChatGPT(prompt) {
  try {
    console.log("Đang gửi yêu cầu đến OpenAI API...");
    console.log("Sử dụng API key bắt đầu bằng:", process.env.OPENAI_API_KEY.substring(0, 10) + "...");
    
    const completion = await openai.chat.completions.create({ // Gọi OpenAI API
      model: "gpt-3.5-turbo", // Sử dụng mô hình GPT-3.5 Turbo
      messages: [ // Tạo một tin nhắn với vai trò người dùng
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });
    
    console.log("OpenAI API đã phản hồi thành công");
    return completion.choices[0].message.content.trim(); // Trả về nội dung của phản hồi
  } catch (error) {
    console.error("Lỗi khi gọi OpenAI API:", error);
    // In thêm thông tin chi tiết về lỗi
    if (error.status) {
      console.error(`Mã lỗi: ${error.status}, Thông báo: ${error.message}`);
    }
    if (error.code) {
      console.error(`Mã lỗi API: ${error.code}`);
    }
    throw error;
  }
}
