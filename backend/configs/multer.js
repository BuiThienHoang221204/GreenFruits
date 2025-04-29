import multer from "multer";//dùng để xử lý file upload (tải lên tệp)

export const upload = multer({ storage: multer.diskStorage({}) })