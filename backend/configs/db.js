import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log("Database Connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/greenfruits`) //kết nối đến database mongodb, nối thêm tên database
    }catch(err){
        console.error(err.message);
    }
}
export default connectDB;