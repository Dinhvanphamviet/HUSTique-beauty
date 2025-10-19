import transporter from "../config/nodemailer.js";
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

        // Send confirmation email for COD
        const populatedOrder = await Order.findById(order._id).populate("items.product address")
        const user = await User.findById(userId)

        const productTitles = populatedOrder.items.map(items => items.product?.title || "Unknown").join(", ")
        const addressString = populatedOrder.address ? `${populatedOrder.address.street || "N/A"}, ${populatedOrder.address.city || "N/A"}, ${populatedOrder.address.state || "N/A"}, ${populatedOrder.address.country || "N/A"}` : "No address";

        const mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: user.email,
            subject: "Chi tiết đơn hàng (COD)",
            html: `
            <div style="
            font-family: Arial, sans-serif;
            background-color: #fdf2f8;
            padding: 20px;
            color: #333;
            ">
            <div style="
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                padding: 30px;
            ">
                <h2 style="color: #2563eb; text-align: center;">Cảm ơn bạn đã đặt hàng! 💙</h2>

                <p style="font-size: 15px; line-height: 1.6; text-align: center;">
                Dưới đây là chi tiết đơn hàng của bạn:
                </p>

                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Mã đơn hàng:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${populatedOrder._id}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Tên sản phẩm:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${productTitles}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>Địa chỉ giao hàng:</strong></td>
                    <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${addressString}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Tổng số tiền:</strong></td>
                    <td style="padding: 8px; color: #16a34a; font-weight: bold;">
                    ${(process.env.CURRENCY || "₫")}${populatedOrder.amount}
                    </td>
                </tr>
                </table>

                <p style="margin-top: 20px; font-size: 15px; line-height: 1.6;">
                Đơn hàng của bạn sẽ được giao trong vòng <strong>1–2 ngày</strong> tới.  
                Vui lòng thanh toán khi nhận hàng.  
                </p>

                <div style="text-align: center; margin-top: 30px;">
                <a href="#" style="
                    background-color: #2563eb;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    display: inline-block;
                ">Theo dõi đơn hàng</a>
                </div>

                <p style="margin-top: 30px; font-size: 13px; color: #6b7280; text-align: center;">
                Cảm ơn bạn đã mua sắm tại <strong>Shop của chúng tôi</strong> ❤️  
                <br/>Nếu có bất kỳ câu hỏi nào, vui lòng trả lời email này để được hỗ trợ.
                </p>
            </div>
            </div>
        `,
        };



        await transporter.sendMail(mailOptions)


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
        const { userId } = req.auth()
        const orders = await Order.find({ userId, $or: [{ paymentMethod: "COD" }, { isPaid: true }] }).populate("items.product address").sort({ createdAt: -1 })

        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//All Orders data of admin
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({ $or: [{ paymentMethod: "COD" }, { isPaid: true }] }).populate("items.product address").sort({ createdAt: -1 })

        const totalOrders = orders.length
        const totalRevenue = orders.reduce((acc, o) => acc + (o.isPaid ? o.amount : 0), 0)

        res.json({ success: true, dashboardData: { totalOrders, totalRevenue, orders } })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


//Update Order Status for admin [POST '/update-status']
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await Order.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "Order status updated" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}