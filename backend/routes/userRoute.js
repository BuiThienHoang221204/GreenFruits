import express from 'express'
import { isAuth, login, logout, register } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter= express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth) // Trước khi kiểm tra xác thực (isAuth), hãy chắc chắn là người dùng đã đăng nhập (authUser)
userRouter.get('/logout', authUser, logout) // Xác thực người dùng trước khi đăng xuất

export default userRouter