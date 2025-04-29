import jwt from 'jsonwebtoken';
// Login seller: app/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '7d' })
            // gửi lại cookie chứa sellerToken cho người dùng
            res.cookie('sellerToken', token, {
                httpOnly: true, //ngăn chặn truy cập từ JavaScript phía client
                secure: process.env.NODE_ENV === 'production', //chỉ gửi cookie qua kết nối HTTPS trong môi trường production
                sameSite: process.env.NODE_ENV === 'production' ? '' : 'strict', //cookie chỉ được gửi khi yêu cầu đến từ cùng một trang web
                maxAge: 7 * 24 * 60 * 60 * 1000 // thời gian sống của cookie là 7 ngày
            })
            return res.status(201).json({ success: true, message: "Đăng nhập thành công" })
        } else {
            return res.status(400).json({ success: false, message: "Đăng nhập thất bại" })
        }
    } catch (err) {
        console.error(err.message);
        res.json({ success: false, message: "Đăng nhập thất bại", error: err.message })
    }
}


// Check Auth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try{
        return res.status(200).json({success: true})
    }catch(err){
        console.error(err.message);
        res.json({success: false, message: "Lỗi server", error: err.message})
    }
}
//Logout Seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', { // xóa cookie chứa token
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