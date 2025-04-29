import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: Array, required: true, },
    price: { type: Number, required: true, },
    offerPrice: { type: Number, required: true, },
    image: { type: Array, required: true, },
    category: { type: String, required: true, },
    inStock: { type: Boolean, default: true }
}, { timestamps: true }) // tự động thêm thời gian tạo và cập nhật

const Product = mongoose.model('product', productSchema) || mongoose.models.product

export default Product