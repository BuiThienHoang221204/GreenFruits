import mongoose from "mongoose";

//Định nghĩ mô hình dữ liệu cho người dùng
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    cartItems: { type: Object, default: {} }//mặc định rỗng
}, { minimize: false }) // đảm bảo ngay cả khi cartItems là rỗng thì vẫn lưu vào database

//Tạo model từ schema
const User = mongoose.model('User', userSchema) || mongoose.models.user

export default User