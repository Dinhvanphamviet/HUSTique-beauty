//Get user profile

export const getUserProfile = async (req, res) => {
    try {
        const role = req.user.role
        const cartData = req.user.cartData
        res.json({ success: true, role, cartData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}