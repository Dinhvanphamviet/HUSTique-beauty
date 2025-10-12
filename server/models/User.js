import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {type:String, required:true},
    username: {type:String, required:true},
    email: {type:String, required:true},
    image: {type:String, required:true},
    role: {type:String, enum: ["user", "owner"], default:"user"},
    cartData: {type:Object, default:{}},
}, {timestamps: true, minimize: false})

const User = mongoose.model("User", userSchema)

export default User