import transporter from "../config/nodemailer.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";
import fetch from "node-fetch";

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
            return res.json({ success: false, message: "Vui lòng thêm sản phẩm trước" })
        }

        // calculate amount using items
        let subtotal = 0
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: "Không tìm thấy sản phẩm" })
            }

            const unitPrice = product.price[item.size] //pick correct size price
            if (!unitPrice) {
                return res.json({ success: false, message: "Dung tích bạn chọn không hợp lệ" })
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
                    ${(process.env.CURRENCY || "$")}${populatedOrder.amount}
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


        return res.json({ success: true, message: "Đặt hàng thành công!" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}

const delivery_charges_vnd = 20000; // 20,000 VND 

// Place Order using Stripe [POST '/stripe']
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req.auth();
    const { origin } = req.headers;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Vui lòng thêm sản phẩm trước" });
    }

    const exchangeRes = await fetch("https://open.er-api.com/v6/latest/USD");
    const exchangeData = await exchangeRes.json();
    const vndPerUsd = exchangeData.rates.VND; 
    const usdPerVnd = 1 / vndPerUsd; 

    let subtotalVND = 0;
    let productData = [];

    // Tính tổng phụ và tạo dữ liệu sản phẩm
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Không tìm thấy sản phẩm" });
      }

      const unitPriceVND = product.price[item.size];
      if (!unitPriceVND) {
        return res.json({ success: false, message: "Dung tích bạn chọn không hợp lệ" });
      }

      subtotalVND += unitPriceVND * item.quantity;

      productData.push({
        name: product.title,
        priceVND: unitPriceVND,
        quantity: item.quantity,
      });
    }

    //Tính tổng (bao gồm thuế + phí ship)
    const taxAmountVND = subtotalVND * taxPercentage;
    const totalAmountVND = subtotalVND + taxAmountVND + delivery_charges_vnd;

    //Lưu đơn hàng ở VND
    const order = await Order.create({
      userId,
      items,
      amount: totalAmountVND,
      address,
      paymentMethod: "stripe",
    });

    //Chuẩn bị gửi sang Stripe (đổi sang USD)
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    let line_items = productData.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: Math.round(item.priceVND * usdPerVnd * 100), // đổi sang cent USD
      },
      quantity: item.quantity,
    }));

    // Thêm thuế
    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Tax (2%)" },
        unit_amount: Math.round(taxAmountVND * usdPerVnd * 100),
      },
      quantity: 1,
    });

    // Thêm phí vận chuyển
    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: Math.round(delivery_charges_vnd * usdPerVnd * 100),
      },
      quantity: 1,
    });

    // Tạo session thanh toán Stripe
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/processing/my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log("Stripe Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};



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

        res.json({ success: true, message: "Trạng thái đơn hàng đã được cập nhật" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}