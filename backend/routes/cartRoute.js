import express from "express";
import { addToCart, updateCart, getUserCart } from '../controllers/cartsController.js'
import authUsers from "../middleware/auth.js";


const cartRoute = express.Router()

cartRoute.post("/get", authUsers, getUserCart)
cartRoute.post("/add", authUsers, addToCart)
cartRoute.post("/update", authUsers, updateCart)

export default cartRoute; 