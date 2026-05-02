import React from 'react'
// import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="px-4 sm:px-8 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-300">
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <Link to="/" className="flex items-baseline gap-1">
                        <h1 className="text-3xl md:text-4xl font-bold font-lora text-gray-900 dark:text-white">
                            Fashion
                        </h1>
                        <span className="text-3xl md:text-4xl font-bold font-montserrat text-orange-500">
                            .
                        </span>
                    </Link>
                    <p className='w-full md:w-2/3 text-gray-600 dark:text-gray-400'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non magnam asperiores perferendis aliquid adipisci corporis delectus vero voluptatem velit natus beatae nihil quos cum illum nisi, quidem odio fugiat. Libero.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5 text-gray-800 dark:text-gray-100'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-400'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5 text-gray-800 dark:text-gray-100'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-400'>
                        <li>+91 XXXXX XXXXX</li>
                        <li>customercare@fashion.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr className="border-gray-300 dark:border-gray-700" />
                <p className='py-5 text-sm text-center text-gray-600 dark:text-gray-400'>
                    © 2025 fashion.com - All Rights Reserved
                </p>
            </div>
        </div>
    )
}

export default Footer
