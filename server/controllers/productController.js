import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
import express from "express"

// Controller Function for Creating Product [POST '/']
export const createProduct = async (req,res)=>{
    try {
        const productData = JSON.parse(req.body.productData)
        const images = req.files

        // Upload images to cloudinary
        const imagesUrl = await Promise.all(
            images.map( async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
                return result.secure_url
            })
        )

        await Product.create({...productData, images: imagesUrl})
        res.json({ success: true, message: "Tạo sản phẩm thành công"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})

    }
}


// Controller Function for Get Product List [GET '/']

export const listProduct = async (req,res)=>{
    try {
        const products = await Product.find({})
        res.json({ success: true, products})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
    }
}

// Controller Function for Get Single Product [GET'/single']

export const singleProduct = async (req,res)=>{
    try {

        const {productId} = req.body
        const product = await Product.findById(productId)
        res.json({ success: true, product})
    
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
    }
}

// Controller Function for Toggle STOCK [POST'/toggle-stock']

export const toggleProduct = async (req,res)=>{
    try {
        const {productId, inStock} = req.body
        await Product.findByIdAndUpdate(productId, {inStock})
        res.json({ success: true, message: "Cập nhật trạng thái tồn kho thành công"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message})
    }
}




