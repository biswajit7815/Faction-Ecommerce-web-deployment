import express from 'express'
import { placeOrder, placeOrderWithStripe, placeOrderWithRazorPay, allOrders, userOrder, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUsers from '../middleware/auth.js'

const orderRoute = express.Router()

//admin features
orderRoute.post("/list", adminAuth, allOrders)
orderRoute.post("/status", adminAuth, updateStatus)

// user features
orderRoute.post("/place", authUsers, placeOrder)
orderRoute.post("/stripe", authUsers, placeOrderWithStripe)
orderRoute.post("/razorpay", placeOrderWithRazorPay)
orderRoute.post("/userorders", authUsers, userOrder)

orderRoute.post("/verifyStripe", authUsers, verifyStripe)

export default orderRoute