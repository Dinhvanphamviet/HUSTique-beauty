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
        const addresses = await Address.find({userId}).sort({createdAt: -1})
        res.json({success:true, addresses})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

// Delete Address [DELETE: '/:id']
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.auth()

    const address = await Address.findOne({ _id: id, userId })
    if (!address) {
      return res.json({ success: false, message: "Không tìm thấy địa chỉ hoặc bạn không có quyền xóa" })
    }

    await Address.findByIdAndDelete(id)
    res.json({ success: true, message: "Đã xóa địa chỉ thành công" })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
