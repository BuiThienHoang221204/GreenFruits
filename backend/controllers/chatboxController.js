import Product from "../models/Product.js";
import { askGemini } from "../configs/geminiai.js";

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
    'Bánh mì nâu': 'brown bread',
    'bánh mì trắng': 'whole bread',
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

    //nước uống 
    'nước lọc': 'water',
    'nước suối': 'spring water',
    'nước dừa': 'coconut water',
    'nước ngọt': 'soft drink',
    'nước trái cây': 'fruit juice',
    'nước ép': 'juice',
    'nước cam': 'orange juice',
    'nước chanh': 'lemonade',
    'nước chanh dây': 'passion fruit juice',
    'nước ép trái cây': 'fruit juice',
    'nước ép rau củ': 'vegetable juice',
    'nước ép': 'juice',
    'nước tăng lực': 'energy drink',
    'nước ngọt có ga': 'carbonated drink',
    'nước pepsi': 'pepsi',
    'nước coca': 'coca cola',
    'nước fanta': 'fanta',
    'nước 7up': '7 up',
    'nước trà': 'tea',
    'nước trà xanh': 'green tea',
    'nước trà đen': 'black tea',
    'nước trà sữa': 'milk tea',
    'nước trà chanh': 'lemon tea',
};

// Bảng ánh xạ ngược từ tiếng Anh sang tiếng Việt
const englishToVietnameseMapping = {};
for (const [viKey, enValue] of Object.entries(vietnameseToEnglishMapping)) {
    if (!englishToVietnameseMapping[enValue]) {
        englishToVietnameseMapping[enValue] = [];
    }
    englishToVietnameseMapping[enValue].push(viKey);
}

// Danh sách các từ khóa liên quan đến thời tiết và cảm xúc
const weatherAndEmotionToProduct = {
    'nóng': ['nước lọc', 'dưa hấu', 'chanh', 'dừa', 'dưa lưới'],
    'khát': ['nước lọc', 'nước dừa', 'chanh', 'cam'],
    'mệt': ['nước lọc', 'chuối', 'cam', 'táo'],
    'đói': ['bánh mì', 'chuối', 'táo', 'xoài', 'mì'],
    'muốn ăn ngọt': ['chuối', 'dưa hấu', 'dâu tây', 'nho', 'xoài'],
    'ăn kiêng': ['cải xanh', 'rau xà lách', 'cà chua', 'dưa chuột', 'bơ'],
    'lạnh': ['bánh mì', 'mì', 'khoai lang', 'bí đỏ'],
    // Thêm cảm xúc/trạng thái bằng tiếng Anh
    'hot': ['water', 'watermelon', 'lemon', 'coconut'],
    'thirsty': ['water', 'coconut water', 'orange juice'],
    'tired': ['banana', 'orange', 'apple'],
    'hungry': ['bread', 'banana', 'apple', 'mango', 'noodles'],
    'sweet': ['banana', 'watermelon', 'strawberry', 'grape', 'mango'],
    'diet': ['spinach', 'lettuce', 'tomato', 'cucumber', 'avocado'],
    'cold': ['bread', 'noodles', 'sweet potato', 'pumpkin']
};

//get askChat : /api/ask/user
export const askChat = async (req, res) => {
    const { question } = req.body;

    console.log('📝 Câu hỏi nhận được:', question);

    try {
        let keyword;
        let originalLanguage = detectLanguage(question);
        console.log(`🔎 Ngôn ngữ phát hiện: ${originalLanguage}`);
        
        try {
            // Bước 1: Gửi câu hỏi đến Gemini để rút trích keyword
            const geminiPrompt = `Người dùng nói: "${question}". Hãy phân tích ngữ cảnh và cảm xúc của người dùng (như trời nóng, muốn ăn nhẹ, khát nước, ăn kiêng...) để suy luận ra sản phẩm họ đang nhắc đến. Trả về chính xác **tên loại trái cây, rau củ, bánh hoặc nước uống** mà người dùng có thể đang muốn mua, bằng **tiếng Việt** (ví dụ: "nước lọc", "chuối", "bánh yến mạch"). Không cần giải thích, chỉ trả về từ khóa tiếng Việt duy nhất.`;
            keyword = await askGemini(geminiPrompt);
            console.log(`🤖 Gemini đã trả lời:`, keyword);
        } catch (aiError) {
            console.error('❌ Lỗi Gemini API:', aiError);

            // Fallback phương thức 1: Phân tích dựa vào từ khóa thời tiết/cảm xúc
            keyword = extractProductFromWeatherEmotion(question);
            // Nếu không tìm thấy, dùng phương thức 2
            if (!keyword) {
                keyword = extractKeywordFromQuestion(question);
            }
        }

        console.log(`🔍 Từ khóa được hiểu là: "${keyword}"`);

        // Chuẩn bị các biến thể của từ khóa để tìm kiếm
        const searchTerms = generateSearchTerms(keyword, originalLanguage);
        console.log('🔍 Các từ khóa tìm kiếm:', searchTerms);

        // Tạo query cho MongoDB
        const orConditions = [];
        
        // Thêm điều kiện tìm kiếm cho mỗi từ khóa
        for (const term of searchTerms) {
            orConditions.push(
                { name: { $regex: term, $options: 'i' } },
                { category: { $regex: term, $options: 'i' } },
                { description: { $regex: term, $options: 'i' } }
            );
        }

        // Bước 2: Dùng keyword để tìm trong MongoDB
        const result = await Product.findOne({ $or: orConditions });

        if (result) {
            // Định dạng giá tiền dựa trên ngôn ngữ
            const priceFormat = originalLanguage === 'en' 
                ? `$${result.offerPrice.toLocaleString()}` 
                : `${result.offerPrice.toLocaleString()} VND`;
                
            res.json({
                answer: `📦 ${result.name}: ${result.description[0]} – Giá: ${priceFormat}`,
            });
        } else {
            // Thử tìm sản phẩm với category chung
            const categoryProducts = await Product.find({
                category: { $regex: getCategoryFromKeyword(keyword), $options: 'i' }
            }).limit(3);

            if (categoryProducts && categoryProducts.length > 0) {
                // Chọn một sản phẩm ngẫu nhiên từ cùng danh mục
                const product = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
                
                // Định dạng giá tiền dựa trên ngôn ngữ
                const priceFormat = originalLanguage === 'en' 
                    ? `$${product.offerPrice.toLocaleString()}` 
                    : `${product.offerPrice.toLocaleString()} VND`;
                
                const notFoundMsg = originalLanguage === 'en'
                    ? `I couldn't find "${keyword}" but you might like`
                    : `Tôi không tìm thấy "${keyword}" nhưng có thể bạn sẽ thích`;
                
                res.json({
                    answer: `❓ ${notFoundMsg}: ${product.name} – Giá: ${priceFormat}`,
                });
            } else {
                const notFoundMsg = originalLanguage === 'en'
                    ? `Sorry, I couldn't find any product matching "${keyword}" in our database.`
                    : `Xin lỗi, tôi không tìm thấy sản phẩm phù hợp với "${keyword}" trong cơ sở dữ liệu.`;
                
                res.json({
                    answer: `❌ ${notFoundMsg}`,
                });
            }
        }

    } catch (err) {
        console.error('❌ Lỗi xử lý:', err);
        res.status(500).json({ answer: 'Đã xảy ra lỗi khi xử lý câu hỏi. Vui lòng thử lại sau.' });
    }
}

// Phát hiện ngôn ngữ từ câu hỏi (đơn giản)
function detectLanguage(text) {
    // Các từ tiếng Việt phổ biến
    const vietnameseWords = ['tôi', 'bạn', 'muốn', 'cần', 'mua', 'ăn', 'uống', 'nóng', 'lạnh', 'ngọt', 'chua', 'và', 'hoặc', 'không', 'có', 'gì', 'đang', 'cho'];
    
    // Kiểm tra xem có chứa dấu tiếng Việt không
    const hasVietnameseDiacritics = /[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/i.test(text);
    
    if (hasVietnameseDiacritics) {
        return 'vi';
    }
    
    // Nếu không có dấu, thử kiểm tra từ phổ biến
    const lowercaseText = text.toLowerCase();
    for (const word of vietnameseWords) {
        if (lowercaseText.includes(word)) {
            return 'vi';
        }
    }
    
    return 'en'; // Mặc định là tiếng Anh
}

// Tạo các biến thể từ khóa để tìm kiếm
function generateSearchTerms(keyword, originalLanguage) {
    const terms = [keyword.toLowerCase().trim()];
    const lowercaseKeyword = keyword.toLowerCase().trim();
    
    // Nếu từ khóa là tiếng Việt, thêm bản dịch tiếng Anh
    if (originalLanguage === 'vi' || vietnameseToEnglishMapping[lowercaseKeyword]) {
        const englishTerm = translateKeyword(lowercaseKeyword);
        if (englishTerm && !terms.includes(englishTerm)) {
            terms.push(englishTerm);
        }
    } 
    // Nếu từ khóa là tiếng Anh, thêm bản dịch tiếng Việt
    else if (englishToVietnameseMapping[lowercaseKeyword]) {
        const viTerms = englishToVietnameseMapping[lowercaseKeyword];
        viTerms.forEach(term => {
            if (!terms.includes(term)) {
                terms.push(term);
            }
        });
    }
    
    // Thêm các từ đồng nghĩa hoặc liên quan
    const relatedTerms = getRelatedTerms(lowercaseKeyword);
    relatedTerms.forEach(term => {
        if (!terms.includes(term)) {
            terms.push(term);
        }
    });
    
    return terms;
}

// Lấy các từ đồng nghĩa hoặc liên quan
function getRelatedTerms(keyword) {
    const relatedTerms = [];
    
    // Từ điển đồng nghĩa
    const synonyms = {
        'apple': ['táo', 'táo tây'],
        'banana': ['chuối', 'chuối tiêu', 'chuối sứ'],
        'orange': ['cam', 'quýt'],
        'bread': ['bánh mì', 'bánh sandwich'],
        'water': ['nước lọc', 'nước suối', 'nước uống', 'nước ngọt'],
        'noodles': ['mì', 'mì gói', 'mì ăn liền'],
        'vegetables': ['rau', 'rau củ', 'rau xanh'],
        'fruits': ['trái cây', 'hoa quả', 'quả'],
    };
    
    // Thêm đồng nghĩa nếu có
    if (synonyms[keyword]) {
        relatedTerms.push(...synonyms[keyword]);
    }
    
    // Tìm từ khóa ngược để lấy đồng nghĩa
    for (const [key, values] of Object.entries(synonyms)) {
        if (values.includes(keyword)) {
            relatedTerms.push(key);
            values.forEach(val => {
                if (val !== keyword) {
                    relatedTerms.push(val);
                }
            });
        }
    }
    
    return relatedTerms;
}

// Phân tích cảm xúc/thời tiết để gợi ý sản phẩm
function extractProductFromWeatherEmotion(question) {
    const lowercaseQuestion = question.toLowerCase();
    
    for (const [emotion, products] of Object.entries(weatherAndEmotionToProduct)) {
        if (lowercaseQuestion.includes(emotion)) {
            // Trả về sản phẩm ngẫu nhiên từ danh sách gợi ý
            return products[Math.floor(Math.random() * products.length)];
        }
    }
    
    return null;
}

// Hàm dự đoán danh mục từ từ khóa
function getCategoryFromKeyword(keyword) {
    const lowercaseKeyword = keyword.toLowerCase();
    
    // Danh sách các từ khóa liên quan đến từng danh mục
    const categoryKeywords = {
        'fruits': ['trái cây', 'quả', 'táo', 'chuối', 'cam', 'xoài', 'dâu', 
                  'apple', 'banana', 'orange', 'mango', 'strawberry', 'fruit'],
        'vegetables': ['rau', 'củ', 'cải', 'khoai', 'cà', 'hành', 'tỏi', 
                      'vegetable', 'spinach', 'carrot', 'potato', 'onion', 'garlic'],
        'bakery': ['bánh', 'bread', 'cake', 'croissant', 'muffin', 'pastry', 'bakery'],
        'instant': ['mì', 'noodle', 'instant', 'ramen'],
        'cold drink': ['nước', 'nước ngọt', 'nước lọc', 'nước trái cây', 'nước ép', 'pepsi', 'coca', 'spring water', 'soft drink', 'juice', 'energy drink', 'fanta', '7 up'],
    };
    
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        for (const word of keywords) {
            if (lowercaseKeyword.includes(word)) {
                return category;
            }
        }
    }
    
    return 'fruits'; // Danh mục mặc định
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
    // Danh sách từ tiếng Anh
    const commonEnglishTerms = Object.values(vietnameseToEnglishMapping);
    
    // Chuyển câu hỏi về chữ thường để dễ so khớp
    const lowercaseQuestion = question.toLowerCase();
    
    // Tìm từ tiếng Việt trong danh sách
    for (const fruit of commonFruits) {
        if (lowercaseQuestion.includes(fruit)) {
            return fruit;
        }
    }
    
    // Tìm từ tiếng Anh trong danh sách
    for (const term of commonEnglishTerms) {
        if (lowercaseQuestion.includes(term)) {
            return term;
        }
    }
    
    // Nếu không tìm thấy từ khóa trong danh sách, trả về một phần của câu hỏi
    const words = lowercaseQuestion.split(/\s+/);
    // Trả về từ cuối cùng nếu có ít nhất 3 ký tự
    for (let i = words.length - 1; i >= 0; i--) {
        if (words[i].length >= 3 && !['gì', 'này', 'khi', 'nào', 'bao', 'mấy', 'nhiêu', 'và', 'hay', 'sao', 'không', 'làm',
                                      'what', 'when', 'where', 'who', 'why', 'how', 'can', 'the', 'and', 'for', 'from'].includes(words[i])) {
            return words[i];
        }
    }
    
    // Fallback cuối cùng
    return 'trái cây';
}