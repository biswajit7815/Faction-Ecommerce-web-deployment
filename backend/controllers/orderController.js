import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from 'stripe'


// Gateway initialised 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Global variables
const currency = "inr"
const deliveryCharges = 10


// placing order with cod
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({
            success: true,
            message: "order Palaced"
        })

    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })

    }
}

// placing order with stripe
const placeOrderWithStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        })
        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { paytment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({
                success: true,

            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success: false
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


// placing order with razorPay
const placeOrderWithRazorPay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            message: "Sucessfully fetched all the orders",
            orders
        })

    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// User order data for frontend
const userOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        console.log("orders: ", orders);

        res.json({
            success: true,
            message: "Orders sucessfully fetched",
            orders
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })

    }
}

//update order status from admin pannel

const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body
        const resp = await orderModel.findByIdAndUpdate(id, { status })
        console.log("resp: ", resp);

        res.json({
            success: true,
            message: `Status updated to ${status}`
        })
    } catch (error) {
        console.log("error: ", error);
        res.json({
            success: false,
            message: error.message
        })

    }
}

export { placeOrder, placeOrderWithStripe, placeOrderWithRazorPay, allOrders, userOrder, updateStatus, verifyStripe }