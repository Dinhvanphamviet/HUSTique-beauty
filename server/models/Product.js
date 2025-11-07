import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    detailedDescription: { type: String },
    price: {type:Object, required:true},
    sizes: {type:[String], required:true},
    images: {type:[String], required:true},
    category: {type:String, required:true},
    type: {type:String, required:true},
    popular: {type:Boolean, default:false},
    inStock: {type:Boolean, default:true},
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

export default Product