import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Global variables for payment
const currency = "usd"
const delivery_charges = 10 // 10 Dollors
const taxPercentage = 0.02 // 2% tax charges

// Place Order using COD [POST '/cod']
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body
        const { userId } = req.auth()

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "Please add Product first" })
        }

        // calculate amount using items
        let subtotal = 0
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: "Product not found" })
            }

            const unitPrice = product.price[item.size] //pick correct size price
            if (!unitPrice) {
                return res.json({ success: false, message: "Invalid size selected" })
            }

            subtotal += unitPrice * item.quantity
        }

        //caltulate total amount by adding delivery charges and tax

        const taxAmount = subtotal * taxPercentage
        const totalAmount = subtotal + taxAmount + delivery_charges

        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentMethod: "COD",
        })


        //Clear User Cart after placing order
        await User.findByIdAndUpdate(userId, { cartData: {} })

        return res.json({ success: true, message: "Order placed successfully" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}


//Place order using Stripe [POST '/stripe']

export const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


//All Orders data of user
export const userOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//All Orders data of admin
export const allOrders = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


//Update Order Status for admin [POST '/update-status']
export const updateStatus = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}