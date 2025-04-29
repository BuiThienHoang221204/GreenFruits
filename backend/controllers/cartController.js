import User from "../models/User.js";

// Update user cartData: /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const userId = req.user.id
        const {cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "Cart đã được cập nhật" })
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: 'Lỗi server', error: error.message})
    }
}

