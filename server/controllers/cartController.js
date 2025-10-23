import User from "../models/User.js";

// Adding to Cart [POST '/add']
export const addToCart = async (req, res) => {
    try {
        const {itemId, size} = req.body;
        const {userId} = req.auth();
        const userData = await User.findById(userId);
        const cartData = await userData.cartData || {};

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await User.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message: "Thêm sản phẩm vào giỏ hàng thành công"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
};

// Update the Cart [POST '/update']
export const updateCart = async (req, res)=>{
    try {
        const {itemId, size, quantity} = req.body
        const {userId} = req.auth()

        const userData = await User.findById(userId)
        const cartData = await userData.cartData || {}

        if(quantity <= 0){
            delete cartData[itemId][size]

            if(Object.keys(cartData[itemId]).length === 0){
                delete cartData[itemId]
            }
        }else{
            cartData[itemId] = cartData[itemId] || {}
            cartData[itemId][size] = quantity
        }

        await User.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message: "Đã cập nhật giỏ hàng"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}