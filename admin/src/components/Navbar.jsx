import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {

    const logOut = () => {
        localStorage.setItem("token", "")
        setToken("")
    }

    return (
        <div className='flex items-center py-2 px-[4%] justify-between' >
            <div className='flex' >
                <h1 className="text-3xl md:text-4xl font-bold font-lora text-gray-900">
                    Fashion
                </h1>
                <span className="text-3xl md:text-4xl font-bold font-montserrat text-orange-500">
                    .
                </span>
            </div>
            {/* <img className='w-[max(10%,80px)]' src={assets.logo} alt="logo" /> */}
            <button onClick={logOut} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' >Logout</button>
        </div>
    )
}

export default Navbar