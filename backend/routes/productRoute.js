import express from "express";
import authSeller from "../middlewares/authSeller.js";
import { addProduct, changeStock, productById, productList, productListSeller } from "../controllers/productController.js";
import { upload } from "../configs/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(['images']), authSeller, addProduct); // xác thực seller khi thêm vào database
productRouter.get('/list', productList);
productRouter.get('/list/seller', authSeller, productListSeller); // xác thực seller khi lấy danh sách sản phẩm
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock); // xác thực seller khi cập nhật số lượng tồn trong database

export default productRouter;