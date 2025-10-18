import express from "express";
import authUser from "../middleware/authMiddleware.js";
import { allOrders, updateStatus, placeOrderStripe, userOrders, placeOrderCOD} from "../controllers/orderContronller.js";


const orderRouter = express.Router()

//For admin all orders
orderRouter.get('/', authUser, allOrders)
orderRouter.post('/status', authUser, updateStatus)

//For Payment
orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)

//For user orders
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter