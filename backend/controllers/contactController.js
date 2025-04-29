import Contact from "../models/Contact.js";

// post : api/contact/user
export const createContact = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin" });
        }
        await Contact.create({ userId, name, email, phone, subject, message });
        res.json({ success: true, message: "Gửi thông tin thành công" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}
// get : api/contact/seller
export const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, contacts });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}