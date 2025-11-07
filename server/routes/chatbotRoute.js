import express from "express";
import { handleChat } from "../controllers/chatbotController.js"; 

const chatbotRouter = express.Router();

chatbotRouter.post("/", handleChat);

export default chatbotRouter;