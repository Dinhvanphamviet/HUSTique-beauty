import express from "express";
import {
  createComment,
  getCommentsByProduct,
  getAllComments,
  deleteComment
} from "../controllers/commentController.js";
import authUser from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/", authUser, createComment);
commentRouter.get("/all", getAllComments);
commentRouter.get("/:productId", getCommentsByProduct);
commentRouter.delete("/:id", authUser, deleteComment);


export default commentRouter;
