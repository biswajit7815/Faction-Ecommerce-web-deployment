import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { X, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation()
    const [visible, setVisible] = useState()

    useEffect(() => {
        if (location.pathname == "/collection") {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])

    return showSearch && visible ? (
        <div className='border-t bg-gray-50 dark:bg-gray-900/95 backdrop-blur-sm text-center'>
            <div className='inline-flex items-center justify-center border border-gray-300 dark:border-gray-700 px-5 py-3 my-4 mx-3 rounded-full w-3/4 sm:w-1/2 
              hover:border-gray-400 dark:hover:border-gray-600'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-inherit text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 
                      focus:placeholder-transparent pr-2'
                    type='text'
                    placeholder='Search products...'
                />
                <Search className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </div>
            <X
                onClick={() => setShowSearch(false)}
                className='inline w-4 h-4 ml-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors'
                strokeWidth={2.5}
            />
        </div>
    ) : null
}

export default SearchBar