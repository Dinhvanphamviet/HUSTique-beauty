import express from "express"
import { upload } from "../middleware/multer.js"
import authUser from "../middleware/authMiddleware.js"
import { createProduct, listProduct, singleProduct, toggleProduct } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post('/',upload.array("images",4), authUser, createProduct) //Create Product Route
productRouter.get('/', listProduct) //Get Product List Route
productRouter.post('/single', singleProduct) //Get Single Product Route
productRouter.post('/toggle-stock', authUser, toggleProduct) //Toggle Stock Route

export default productRouter