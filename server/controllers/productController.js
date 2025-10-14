import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

// Controller Function for Creating Product [POST '/']
export const createProduct = async (req,res)=>{
    try {
        const productData = JSON.parse(req.body.productData)
        const images = req.files

        // Upload images to cloudinary

    } catch (error) {

    }
}