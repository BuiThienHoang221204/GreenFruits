import Address from "../models/Address.js";

// Add Address : api/address/add
export const addAddress = async (req, res) => {
    try {
        const userId = req.user.id // lấy id người dùng từ token đã giải mã trong middleware authUser
        const {address} = req.body;
        await Address.create({...address, userId});
        res.json({ success: true, message: "Địa chỉ đã được thêm thành công" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
    }
}

export const getAddress = async (req, res) => {
    try {
        const userId = req.user.id
        const addresses =  await Address.find({userId})
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Lỗi server', error: error.message });
        
    }
}