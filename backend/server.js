import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import userProduct from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/product', userProduct)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

app.get('/health', (req, res) => {
    res.status(200).send("Server is Healthy")
})

app.get('/', (req, res) => {
    res.send("API working")
})

const startServer = async () => {
    await connectDB()
    await connectCloudinary()
    app.listen(port, () => {
        console.log("Server is running on port " + port)
    })
}

startServer()
