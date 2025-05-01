import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import stripe from 'stripe'

//place Order COD: api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.id
        const { items, address } = req.body;
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
        await Order.create({ userId, items, amount, address, paymentType: "COD", isPaid: true });
        res.json({ success: true, message: "Đặt hàng thành công" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}

//place Order COD: api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.user.id
        const { items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin" });
        }
        let productData = [];
        //tính tổng tiền hàng
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return acc + product.offerPrice * item.quantity; //cộng dồn acc với tiền hàng
        }, 0)
        //thêm thuế 2%
        amount = amount + Math.floor(amount * 2) / 100;
        const order = await Order.create({ userId, items, amount, address, paymentType: "Online" });

        // khoi tạo đơn hàng trên stripe
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        //tạo đường dẫn thanh toán
        const line_items = productData.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.floor(item.price + item.price * 0.02) * 100, //tính thuế 2%
            },
            quantity: item.quantity,
        }));
        //tạo session thanh toán
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        })
        res.json({ success: true, message: "Đặt hàng thành công", url: session.url });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}
//Stripe webhook để xác nhận thanh toán: /stripe
export const stripeWebhook = async (req, res) => {
    try {
        // khoi tạo đơn hàng trên stripe
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        const sig = req.headers['stripe-signature'];// lấy chữ ký từ header
        let event;
        try {
            event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (error) {
            console.log('Lỗi xác thực webhook:', error.message);
            return res.status(400).send(`Webhook lỗi: ${error.message}`);
        }
        // Xử lý sự kiện thanh toán thành công
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;
                // Lấy thông tin đơn hàng từ metadata
                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                    limit: 1,
                });
                const { userId, orderId } = session.data[0].metadata;
                // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                await User.findByIdAndUpdate(userId, { cartItems: {} });
                break;
            }
            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;
                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                });
                const { orderId } = session.data[0].metadata;
                await Order.findByIdAndDelete(orderId);
                break;
            }
            default:
                console.error(`Unhandled event type ${event.type}`);
        }
        res.status(200).json({ received: true });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}


// Get Order by userId: api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id
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