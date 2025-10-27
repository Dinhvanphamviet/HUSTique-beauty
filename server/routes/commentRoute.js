import express from "express";
import {
  createComment,
  getCommentsByProduct,
  deleteComment
} from "../controllers/commentController.js";
import authUser from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/", authUser, createComment);
commentRouter.get("/:productId", getCommentsByProduct);
commentRouter.delete("/:id", authUser, deleteComment);

export default commentRouter;
