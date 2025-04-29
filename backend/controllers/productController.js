import {v2 as cloudinary} from 'cloudinary'
import Product from '../models/Product.js'
//Add Product: api/product/add
export const addProduct = async (req, res) => {
    try{
        let productData = JSON.parse(req.body.productData)
        const images = req.files // lấy file từ multer
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,  //upload ảnh từ ổ cứng lên Cloudinary.
                {resource_type: 'image'}) //dùng để chỉ định loại tài nguyên là hình ảnh  đang tải lên
                return result.secure_url //lấy hình ảnh sau khi tải lên thành công từ Cloudinary (link an toàn)
            })
        )
        await Product.create({...productData, image: imagesUrl})
        res.json({success: true, message: 'Thêm thành công'})
    }catch(err){
        console.log(err.message);
        res.json({success: false, message: 'Thêm thất bại', message: err.message})
    }
}

// Get All Products: api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({}) //lấy tất cả sản phẩm từ database
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: 'Lỗi server', error: error.message})
        
    }
}

// Get single Products: api/product/id
export const productById = async (req, res) => {
    try {
        const {id} = req.body //lấy id từ body request
        const product = await Product.findById(id) 
        res.json({success: true, product}) //trả về sản phẩm tìm thấy
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: 'Lỗi server', error: error.message})
    }
}

// Get Products instock: api/product/stock
export const changeStock = async (req, res) => {
    try {
        const {id, inStock} = req.body 
        await Product.findByIdAndUpdate(id, {inStock}) //cập nhật lại số lượng hàng trong kho
        res.json({success: true, message: 'Cập nhật thành công'}) 
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: 'Lỗi server', error: error.message})
        
    }
}