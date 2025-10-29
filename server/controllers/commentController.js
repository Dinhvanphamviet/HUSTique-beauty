import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const createComment = async (req, res) => {
  try {
    const { content, rating, productId } = req.body;
    const userId = req.user?._id; 

    if (!content || !productId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu bình luận",
      });
    }

    // Kiểm tra người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Tạo bình luận mới
    const newComment = await Comment.create({
      user: userId,
      product: productId,
      content,
      rating: rating || 5,
    });

    // Populate user ngay sau khi tạo
    const populatedComment = await Comment.findById(newComment._id).populate(
      "user",
      "username image"
    );

    res.json({
      success: true,
      message: "Thêm bình luận thành công",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Lỗi khi tạo bình luận:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tạo bình luận",
      error: error.message,
    });
  }
};

export const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const comments = await Comment.find({ product: productId })
      .populate("user", "username image")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    console.error("Lỗi khi lấy bình luận:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "username image")
    .sort({ createdAt: -1 });

  res.json({ success: true, comments });
};


export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bình luận",
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền xóa bình luận này",
      });
    }

    await comment.deleteOne();
    res.json({
      success: true,
      message: "Xóa bình luận thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa bình luận:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
