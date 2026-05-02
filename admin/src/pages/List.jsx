import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {
    const [list, setList] = useState([])
    console.log("list: ", list);
    const fetchList = async () => {
        try {
            const res = await axios.get(backendUrl + "/api/product/list")
            console.log("res: ", res);
            if (res.data.success) {
                setList(res.data.product)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("error: ", error);
            console.log(error.message);
        }
    }

    const removeProduct = async (id) => {
        try {
            const res = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } })
            console.log("res: ", res.data);
            if (res.data.success) {
                toast.success(res.data.message)
                await fetchList()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("error: ", error);
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchList()
    }, [])



    return (
        <>
            <p className='mb-2' >All Products List</p>
            <div className='flex flex-col gap-2' >
                {/* ---------- List Table title ---------- */}

                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm' >
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center' >Action</b>
                </div>

                {/* -------  Product List -------- */}
                {
                    list.map((item) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-small' key={item._id} >
                            <img className='w-12' src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p className='text-right md:text-center cursor-pointer text-l' onClick={() => removeProduct(item._id)}>X</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List