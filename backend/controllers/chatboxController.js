import Product from "../models/Product.js";
import { askChatGPT } from "../configs/openai.js";

// Bảng ánh xạ từ tiếng Việt sang tiếng Anh cho các loại trái cây và rau củ
const vietnameseToEnglishMapping = {
    // Trái cây
    'táo': 'apple',
    'chuối': 'banana',
    'cam': 'orange',
    'quýt': 'tangerine',
    'bưởi': 'pomelo',
    'xoài': 'mango',
    'dứa': 'pineapple',
    'thơm': 'pineapple',
    'khóm': 'pineapple',
    'dưa hấu': 'watermelon',
    'dưa đỏ': 'watermelon',
    'dưa lưới': 'cantaloupe',
    'dưa': 'melon',
    'ổi': 'guava',
    'nho': 'grape',
    'lê': 'pear',
    'đào': 'peach',
    'mận': 'plum',
    'vải': 'lychee',
    'nhãn': 'longan',
    'chôm chôm': 'rambutan',
    'măng cụt': 'mangosteen',
    'sầu riêng': 'durian',
    'thanh long': 'dragon fruit',
    'kiwi': 'kiwi',
    'dâu tây': 'strawberry',
    'dâu': 'strawberry',
    'dừa': 'coconut',
    'chanh': 'lemon',
    'chanh dây': 'passion fruit',
    'đu đủ': 'papaya',
    'bơ': 'avocado',
    'sung': 'fig',
    'mít': 'jackfruit',
    
    // Rau củ
    'cải': 'spinach',
    'bắp cải': 'cabbage',
    'cải thảo': 'napa cabbage',
    'cải xanh': 'mustard greens',
    'cải ngọt': 'choy sum',
    'cải bó xôi': 'spinach',
    'rau chân vịt': 'spinach',
    'cải thìa': 'bok choy',
    'cà rốt': 'carrot',
    'khoai tây': 'potato',
    'khoai lang': 'sweet potato',
    'củ cải': 'radish',
    'củ cải trắng': 'white radish',
    'cà chua': 'tomato',
    'hành tây': 'onion',
    'hành': 'onion',
    'tỏi': 'garlic',
    'gừng': 'ginger',
    'ớt': 'chili',
    'đậu': 'bean',
    'đậu cove': 'green beans',
    'đậu hà lan': 'peas',
    'đậu phộng': 'peanut',
    'lạc': 'peanut',
    'rau muống': 'water spinach',
    'rau dền': 'amaranth',
    'rau ngót': 'katuk',
    'rau xà lách': 'lettuce',
    'bông cải': 'broccoli',
    'bông cải xanh': 'broccoli',
    'súp lơ': 'cauliflower',
    'súp lơ trắng': 'cauliflower',
    'súp lơ xanh': 'broccoli',
    'bí đỏ': 'pumpkin',
    'bí ngô': 'pumpkin',
    'bí đao': 'winter melon',
    'bí xanh': 'winter melon',
    'mướp': 'loofah',
    'mướp đắng': 'bitter melon',
    'khổ qua': 'bitter melon',
    'măng tây': 'asparagus',
    'nấm': 'mushroom',
    'ớt chuông': 'bell pepper',
    'dưa chuột': 'cucumber',
    'đậu bắp': 'okra',

    //bánh
    'bánh mì': 'bread',
    'Bánh mì nâu' : 'brown bread',
    'bánh mì trắng' : 'whole bread',
    'socola': 'chocolate cake',
    'Butter Croissant': 'butter croissant',
    'Bánh nướng xốp vani': 'vanilla muffins',

    //mì tôm
    'mì maggi': 'taggi noodles',
    'mì ramen': 'Top tamen',
    'mì oats': 'oats noodles',
    'mì hảo hảo': 'yippee noodles',
    
    // Danh mục
    'trái cây': 'fruits',
    'rau củ': 'vegetables',
    'hoa quả': 'fruits',
    'rau': 'vegetables',
    'củ': 'root vegetables',
    'quả': 'fruits',
    'ngũ cốc': 'grains',
    'mì': 'instant',
};

//get askChat : /api/ask/user
export const askChat = async (req, res) => {
    const { question } = req.body;

    try {
        let keyword;
        try {
            // Bước 1: Gửi câu hỏi đến GPT để rút trích keyword
            const gptPrompt = `Người dùng nói: "${question}". Hãy phân tích ngữ cảnh và cảm xúc của người dùng (như trời nóng, muốn ăn nhẹ, khát nước, ăn kiêng...) để suy luận ra sản phẩm họ đang nhắc đến. Trả về chính xác **tên loại trái cây, rau củ, bánh hoặc nước uống** mà người dùng có thể đang muốn mua, bằng **tiếng Việt** (ví dụ: "nước lọc", "chuối", "bánh yến mạch"). Không cần giải thích, chỉ trả về từ khóa tiếng Việt duy nhất.`;

            keyword = await askChatGPT(gptPrompt);
        } catch (aiError) {
            console.error('❌ Lỗi AI API:', aiError);
            // Fallback: Phân tích đơn giản từ câu hỏi
            keyword = extractKeywordFromQuestion(question);
        }

        console.log('🔍 Từ khóa tiếng Việt được hiểu là:', keyword);
        
        // Chuyển đổi từ khóa từ tiếng Việt sang tiếng Anh
        const englishKeyword = translateKeyword(keyword.toLowerCase());
        console.log('🔍 Từ khóa tiếng Anh tương ứng:', englishKeyword);

        // Bước 2: Dùng keyword để tìm trong MongoDB
        const result = await Product.findOne({ 
            $or: [
                { name: { $regex: englishKeyword, $options: 'i' } },
                { category: { $regex: englishKeyword, $options: 'i' } },
                {description: { $regex: englishKeyword, $options: 'i' } }
            ] 
        });

        if (result) {
            res.json({
                answer: `📦 ${result.name}: ${result.description[0]} – Giá: ${result.offerPrice.toLocaleString()} $.`,
            });
        } else {
            res.json({
                answer: `❌ Xin lỗi, tôi không tìm thấy sản phẩm phù hợp với "${keyword}" trong cơ sở dữ liệu.`,
            });
        }

    } catch (err) {
        console.error('❌ Lỗi xử lý:', err);
        res.status(500).json({ answer: 'Đã xảy ra lỗi khi xử lý câu hỏi.' });
    }
}

// Hàm chuyển đổi từ khóa từ tiếng Việt sang tiếng Anh
function translateKeyword(vietnameseKeyword) {
    // Tìm từ khóa chính xác trong bảng ánh xạ
    if (vietnameseToEnglishMapping[vietnameseKeyword]) {
        return vietnameseToEnglishMapping[vietnameseKeyword];
    }
    
    // Tìm từ khóa có chứa trong câu
    for (const [viKey, enValue] of Object.entries(vietnameseToEnglishMapping)) {
        if (vietnameseKeyword.includes(viKey)) {
            return enValue;
        }
    }
    
    // Nếu không tìm thấy, trả về từ khóa gốc
    return vietnameseKeyword;
}

// Hàm fallback để trích xuất từ khóa từ câu hỏi khi API không hoạt động
function extractKeywordFromQuestion(question) {
    // Danh sách một số loại trái cây và rau củ phổ biến
    const commonFruits = Object.keys(vietnameseToEnglishMapping);
    
    // Chuyển câu hỏi về chữ thường để dễ so khớp
    const lowercaseQuestion = question.toLowerCase();
    
    // Tìm từ trong danh sách
    for (const fruit of commonFruits) {
        if (lowercaseQuestion.includes(fruit)) {
            return fruit;
        }
    }
    
    // Nếu không tìm thấy từ khóa trong danh sách, trả về một phần của câu hỏi
    const words = lowercaseQuestion.split(/\s+/);
    // Trả về từ cuối cùng nếu có ít nhất 3 ký tự
    for (let i = words.length - 1; i >= 0; i--) {
        if (words[i].length >= 3 && !['gì', 'này', 'khi', 'nào', 'bao', 'mấy', 'nhiêu', 'và', 'hay', 'sao', 'không', 'làm'].includes(words[i])) {
            return words[i];
        }
    }
    
    // Fallback cuối cùng
    return 'trái cây';
}