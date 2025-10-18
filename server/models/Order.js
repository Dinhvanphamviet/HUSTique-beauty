import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String, required:true, ref:'user'},
    items: [{
        product: {type:String, required:true, ref:'product'},
        quantity: {type:Number, required:true},
        size: {type:String, required:true},
    }],
    amount: {type:Number, required:true},
    address: {type:String, required:true, ref:'address'},
    status: {type:String, default:'Order Placed'},
    paymentMethod: {type:String, required:true},
    isPaid: {type:Boolean, required:true, default:false},
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)

export default Order