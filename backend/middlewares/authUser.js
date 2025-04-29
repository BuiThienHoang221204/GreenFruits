import jwt from "jsonwebtoken";
//middleware thực hiện xác thực người dùng
const authUser =  async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({success: false, message: "Chưa đăng nhập"})
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)// giải mã token
        if(tokenDecode.id ){
            req.user = { id: tokenDecode.id }; // lưu id người dùng vào req.user để sử dụng trong các middleware tiếp theo
        }else{
            return res.status(401).json({success: false, message: "Chưa đăng nhập"})
        }
        next()
    }catch(err){
        console.error(err.message);
        return res.status(500).json({success: false, message: "Lỗi server"})
    }
}

export default authUser