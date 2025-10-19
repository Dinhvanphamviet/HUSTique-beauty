import Blog from "../models/Blog.js";

// 🧩 Lấy tất cả blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧩 Tạo blog mới (upload ảnh trực tiếp lên Cloudinary)
export const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Multer-Cloudinary đã upload sẵn, đường dẫn Cloudinary nằm ở req.file.path
    const imageUrl = req.file?.path || "";

    const newBlog = new Blog({
      title,
      description,
      category,
      imageUrl,
    });

    await newBlog.save();

    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    console.error("Lỗi tạo blog:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🧩 Cập nhật blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const updateData = { title, description, category };

    // Nếu có ảnh mới thì multer-Cloudinary đã upload sẵn, chỉ cần lấy URL
    if (req.file?.path) {
      updateData.imageUrl = req.file.path;
    }

    const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated)
      return res.status(404).json({ success: false, message: "Không tìm thấy blog" });

    res.status(200).json({ success: true, blog: updated });
  } catch (err) {
    console.error("Lỗi cập nhật blog:", err);
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

// 🧩 Lấy blog cụ thể
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy blog" });

    res.status(200).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
