import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { ChevronDown, X, Filter, ArrowUpDown } from 'lucide-react'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState();
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, setSortType] = useState("relevent")


    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice();

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory
            ))
        }
        setFilterProducts(productCopy)

    }

    const sortProduct = () => {
        let fpCopy = filterProducts.slice()
        switch (sortType) {
            case "lowhigh":
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
                break;
            case "highlow":
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
                break;
            default:
                applyFilter()
                break;
        }

    }

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch, products])


    useEffect(() => {
        sortProduct()
    }, [sortType, products])
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Mobile Filter Button */}
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="lg:hidden mb-6 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    <Filter size={18} />
                    <span className="text-sm font-medium dark:text-white">Filters</span>
                    <ChevronDown size={16} className={`transition-transform dark:text-white ${showFilter ? 'rotate-180' : ''}`} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Filters Sidebar */}
                    <div className={`${showFilter ? 'block' : 'hidden'} lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-160px)] lg:overflow-y-auto dark:text-white`}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                                <button
                                    onClick={() => setShowFilter(false)}
                                    className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-gray-300">Categories</h3>
                                    <div className="space-y-3">
                                        {['Men', 'Women', 'Kids'].map((cat) => (
                                            <label
                                                key={cat}
                                                className="flex items-center space-x-3 py-1.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={cat}
                                                    onChange={toggleCategory}
                                                    checked={category.includes(cat)}
                                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:checked:bg-indigo-500"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Subcategory Filter */}
                                <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-gray-300">Product Type</h3>
                                    <div className="space-y-3">
                                        {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                                            <label
                                                key={type}
                                                className="flex items-center space-x-3 py-1.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={type}
                                                    onChange={toggleSubCategory}
                                                    checked={subCategory.includes(type)}
                                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:checked:bg-indigo-500"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid Section */}
                    <div>
                        {/* Header with Title and Sorting */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <Title text1="All" text2="Collections" />

                            <div className="w-full sm:w-56 relative">
                                <select
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                    className="w-full pl-4 pr-8 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="relevant">Relevant</option>
                                    <option value="lowhigh">Price: Low to High</option>
                                    <option value="highlow">Price: High to Low</option>
                                </select>
                                <ArrowUpDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filterProducts.map((item) => (
                                <ProductItem
                                    key={item._id}
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filterProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection