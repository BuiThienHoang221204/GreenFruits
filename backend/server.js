import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './configs/db.js'
import 'dotenv/config' // đọc các biến môi trường từ file .env
import userRouter from './routes/userRoute.js'
import sellerRoute from './routes/sellerRoute.js'
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import addressRoute from './routes/addressRoute.js'
import orderRoute from './routes/orderRoute.js'
import contactRouter from './routes/contactRoute.js'

const app = express()
const port = process.env.PORT || 5000

await connectDB() //Kết nối tới database mongodb
await connectCloudinary() // kết nối tới cloudinary

//cho phép port 5173 từ frontend truy cập vào
const allowedOrigins = ['http://localhost:5173']
//Dùng middleware để đọc dữ liệu json từ req
app.use(express.json())
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(cookieParser())

//Gọi các router
app.get('/', (req, res) => res.send('API is working'))
app.use('/api/user', userRouter) // sử dụng router cho các route liên quan đến user
app.use('/api/seller', sellerRoute) // sử dụng router cho các route liên quan đến seller
app.use('/api/product', productRouter) // sử dụng router cho các route liên quan đến product
app.use('/api/cart', cartRouter) // sử dụng router cho các route liên quan đến cart
app.use('/api/address', addressRoute) // sử dụng router cho các route liên quan đến address
app.use('/api/order', orderRoute) // sử dụng router cho các route liên quan đến order)
app.use('/api/contact', contactRouter) // sử dụng router cho các route liên quan đến contact

//khởi chạy port
app.listen(port, () => {
    console.log('server is running on ', port);
})