import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,  required: true, ref: 'User'},
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    phone: {type: String, required: true, },
    subject: { type: String, required: true, },
    message: { type: String, required: true, },
})
const Contact = mongoose.model.contact || mongoose.model("contact", contactSchema);
export default Contact;