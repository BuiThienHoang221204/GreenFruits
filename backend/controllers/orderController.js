import Order from "../models/Order.js";
import Product from "../models/Product.js";

//place Order COD: api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.id 
        const {items, address } = req.body;
        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin" });
        }
        //tính tổng tiền hàng
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return acc + product.offerPrice * item.quantity; //cộng dồn acc với tiền hàng
        }, 0)
        //thêm thuế 2%
        amount = amount + Math.floor(amount * 2) / 100;
        await Order.create({ userId, items, amount, address, paymentType: "COD" , isPaid: true });
        res.json({ success: true, message: "Đặt hàng thành công" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}
// Get Order by userId: api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId  = req.user.id
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: 'COD', isPaid: true }]
        }).populate('items.product address') //thêm thông tin sản phẩm (items.product) và địa chỉ (address) từ bảng khác
            .sort({ createdAt: -1 })

        res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });

    }
}
// Get All Order (fro admin / seller): api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: 'COD', isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });

    }
}