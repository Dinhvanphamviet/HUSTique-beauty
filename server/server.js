import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from './config/mongodb.js'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/ClerkWebhooks.js";
import userRouter from './routes/userRoute.js';
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import addressRouter from "./routes/addressRoute.js";
import cartRouter from "./routes/cartRoute.js";


await connectDB() //Connect to MongoDB
await connectCloudinary() //Setup Cloudinary

const app = express() //Init express app
app.use(cors()) //Enable Cross-Origin Resource Sharing

app.use(express.json()) //Enable JSON body parsing
app.use(clerkMiddleware()) //Enable Clerk middleware for authentication

//API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)


//Define API Routes
app.use("/api/user", userRouter)
app.use("/api/products", productRouter)
app.use("/api/address", addressRouter)
app.use("/api/cart", cartRouter)


//Routes Endpoint to check API Status
app.get('/', (req, res) => {
    res.send("API Successfull connected...")
})

const port = process.env.PORT || 3000 //Define server port

//Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
