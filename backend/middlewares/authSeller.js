import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
    }
    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.status(401).json({ success: false, message: 'Chưa đăng nhập' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
}
export default authSeller;