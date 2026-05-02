import { createContext, useEffect, useState } from "react"
// import { products } from '../assets/assets';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState("")
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate()


    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems)

        if (!size) {
            toast.error("Select Product Size")
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }

        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
        //--------------Update the data in the server--------------
        if (token) {
            try {
                const res = await axios.post(backendUrl + "/api/cart/add", { itemId, size }, { headers: { token } })
                console.log("res: ", res.data);
                toast.success("Added to cart")
            } catch (error) {
                console.log("error: ", error);
                toast.error(error.message)

            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) totalCount += quantity;
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)
        // ------------------Update the data in the server-------------------
        if (token) {
            try {
                await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log("error: ", error);
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const size in cartItems[items]) {
                try {
                    if (cartItems[items][size] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][size]
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if (res.data.success) {
                setProducts(res.data.product)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("error: ", error);
            toast.error(error.message);
        }
    }

    //---------- Get cart data from server -----------------
    const getUserCart = async (token) => {
        try {
            const res = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } })
            if (res.data.success) {
                setCartItems(res.data.cartData)
            }
        } catch (error) {
            console.log("error: ", error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    }, [])

    const value = {
        products, delivery_fee, currency,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount,
        navigate, backendUrl, setToken, token

    }


    return (
        <ShopContext.Provider value={value} >
            {children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;