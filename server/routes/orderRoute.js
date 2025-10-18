import express from "express";
import authUser from "../middleware/authMiddleware.js";
import { placeOrderCOD } from "../controllers/orderController.js";



const orderRoute = express.Router()

orderRouter.post('/cod', authUser, placeOrderCOD)