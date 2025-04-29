import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User: /api/user/register
export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success: false, message: "Thiếu trường thông tin"}); 
        }
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({success: false, message: "User đã tồn tại"})
        }
        const hashedPassword = await bcrypt.hash(password, 10) // mã hóa password
        const user = await User.create({name, email, password: hashedPassword}) // tạo người dùng mới
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}) // tạo token cho người dùng
        // gửi lại cookie chứa token cho người dùng
        res.cookie('token', token, {
            httpOnly: true, //ngăn chặn truy cập từ JavaScript phía client
            secure: process.env.NODE_ENV === 'production', //chỉ gửi cookie qua kết nối HTTPS trong môi trường production
            sameSite: process.env.NODE_ENV === 'production' ? '' : 'strict', //cookie chỉ được gửi khi yêu cầu đến từ cùng một trang web
            maxAge: 7 * 24 * 60 * 60 * 1000 // thời gian sống của cookie là 7 ngày
        })
        return res.status(201).json({success: true, message: "Đăng ký thành công", user : {email: user.email, name: user.name}})
    }catch(err){
        console.error(err.message);
        res.json({success: false, message: "Đăng ký thất bại", error: err.message})
    }
}

//Login User: /api/user/login
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: "Thiếu trường thông tin email hoặc password"}); 
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success: false, message: "User không tồn tại"})
        }
        const isMatch  = await bcrypt.compare(password,user.password) // so sánh password đã mã hóa
        if(!isMatch){
            return res.status(400).json({success: false, message: "Password không đúng"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}) 
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? '' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({success: true, message: "Đăng nhập thành công", user : {email: user.email, name: user.name}})
    }catch(err){
        console.error(err.message);
        res.json({success: false, message: "Đăng nhập thất bại", error: err.message})
    }
}

// Check Auth: /api/user/is-auth
export const isAuth = async (req, res) => {
    try{
        const {userId} = req.user.id // lấy id người dùng từ token đã giải mã trong middleware authUser
        const user = await User.findById(userId).select('-password') // không trả về password
        return res.status(200).json({success: true, user})
    }catch(err){
        console.error(err.message);
        res.json({success: false, message: "Lỗi server", error: err.message})
    }
}

//Logout User: /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { // xóa cookie chứa token
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? '' : 'strict'
        })
        return res.status(200).json({success: true, message: "Đăng xuất thành công"})
    } catch (error) {
        console.error(err.message);
        res.json({success: false, message: "Lỗi server", error: err.message})
    }
}