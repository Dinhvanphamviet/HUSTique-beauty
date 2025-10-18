import Blog from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🧩 Lấy tất cả blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧩 Tạo blog mới
export const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body; 
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newBlog = new Blog({
      title,
      description,
      category,
      imageUrl,
    });

    await newBlog.save();

    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧩 Cập nhật blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const updateData = { title, description, category };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.imageUrl = result.secure_url;
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, blog: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧩 Xóa blog
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy blog" });

    res.status(200).json({ success: true, message: "Đã xóa blog" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Lấy blog cụ thể
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Không tìm thấy blog" });
    res.status(200).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
