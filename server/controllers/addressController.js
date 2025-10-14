import Address from "../models/Address.js";

// Add Address for user [POST: '/add']
export const addAddress = async (req, res) => {
    try {
        const {address} = req.body
        const {userId} = req.auth()
        await Address.create({...address, userId})
        res.json({success:true, message: "Address created successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

// Add Address for user [GET: '/']
export const getAddress = async (req, res) => {
    try {
        const {userId} = req.auth()
        const address = await Address.find({userId}).sort({createdAt: -1})
        res.json({success:true, address})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}