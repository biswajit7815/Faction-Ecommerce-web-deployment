import mongoose from 'mongoose'
import 'dotenv/config'

await mongoose.connect(process.env.MONGODB_URL)
console.log('DB Connected')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestSeller: { type: Boolean },
    date: { type: Number, required: true }
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema)

// Pehle sab purane products delete karo
await productModel.deleteMany({})
console.log('🗑️ Old products deleted')

// Sirf fashion categories fetch karo
const categories = [
    { url: 'https://dummyjson.com/products/category/womens-dresses', category: 'Women', subCategory: 'Topwear' },
    { url: 'https://dummyjson.com/products/category/womens-shoes', category: 'Women', subCategory: 'Bottomwear' },
    { url: 'https://dummyjson.com/products/category/mens-shirts', category: 'Men', subCategory: 'Topwear' },
    { url: 'https://dummyjson.com/products/category/mens-shoes', category: 'Men', subCategory: 'Bottomwear' },
    { url: 'https://dummyjson.com/products/category/tops', category: 'Women', subCategory: 'Topwear' },
]

for (const cat of categories) {
    const res = await fetch(cat.url)
    const data = await res.json()
    for (const p of data.products) {
        await productModel.create({
            name: p.title,
            description: p.description,
            price: Math.round(p.price * 80),
            image: [p.thumbnail, ...p.images.slice(0, 2)],
            category: cat.category,
            subCategory: cat.subCategory,
            sizes: ['S', 'M', 'L', 'XL'],
            bestSeller: p.rating > 4.5,
            date: Date.now()
        })
        console.log('✅ Added:', p.title)
    }
}

console.log('🎉 All fashion products added!')
await mongoose.connection.close()
