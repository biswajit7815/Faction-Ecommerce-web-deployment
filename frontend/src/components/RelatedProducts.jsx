import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext)
    const [related, setReleted] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((item) => category === item.category)
            productCopy = productCopy.filter((item) => subCategory === item.subCategory)
            setReleted(productCopy.slice(0, 5))

        }
    }, [])
    return (
        <div className='my-24' >
            <div className='text-center text-3xl py-2' >
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item, idx) => (
                        <ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts