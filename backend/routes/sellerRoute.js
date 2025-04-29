import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js'
import authSeller from '../middlewares/authSeller.js'

const sellerRoute = express.Router()
sellerRoute.post('/login', sellerLogin)
sellerRoute.get('/is-auth', authSeller, isSellerAuth) // Trước khi kiểm tra xác thực (isSellerAuth), hãy chắc chắn là seller đã đăng nhập (authSeller)
sellerRoute.get('/logout', authSeller, sellerLogout) // Xác thực seller trước khi đăng xuất

export default sellerRoute