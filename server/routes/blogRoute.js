import express from "express";
import { upload } from "../middleware/multer.js";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", upload.single("image"), createBlog);
blogRouter.put("/:id", upload.single("image"), updateBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/:id", getBlogById);


export default blogRouter;
