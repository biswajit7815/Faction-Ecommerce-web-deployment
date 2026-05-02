import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title';
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const { products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];

        if (products.length > 0) {
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size]) {
                        tempData.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItems[itemId][size]
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className="border-t pt-14 px-4 sm:px-10 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
                <Title text1={"YOUR"} text2={" CART"} />
            </div>

            <div className="space-y-6">
                {
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div key={index} className="animate-fadeIn border-t border-b py-6 px-2 sm:px-4 rounded-lg dark:border-gray-700 grid grid-cols-[4fr_1fr_auto] sm:grid-cols-[4fr_1fr_auto] items-center gap-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                                <div className="flex items-start gap-4 sm:gap-6">
                                    <img
                                        className="w-16 sm:w-20 rounded-lg transition-transform duration-300 hover:scale-105"
                                        src={productData.image[0]}
                                        alt={productData.name}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm sm:text-lg font-medium text-gray-800 dark:text-white">
                                            {productData.name}
                                        </p>
                                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                            <p className="text-sm sm:text-base">
                                                {currency}{productData.price}
                                            </p>
                                            <span className="px-2 sm:px-3 py-1 border rounded-md bg-gray-100 dark:bg-gray-700 text-xs sm:text-sm">
                                                {item.size}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <input
                                    onChange={(e) =>
                                        e.target.value === '' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(item._id, item.size, Number(e.target.value))
                                    }
                                    className="border rounded-md w-full max-w-14 sm:max-w-20 text-center px-2 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />

                                <img
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform duration-300"
                                    src={assets.bin_icon}
                                    alt="Delete"
                                />
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex justify-end mt-20 mb-10">
                <div className="w-full sm:w-[450px] space-y-4 dark:text-white" >
                    <CartTotal />
                    <div className="text-end">
                        <button
                            onClick={() => navigate('/placeOrder')}
                            className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 text-sm font-medium rounded-lg border border-transparent hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white hover:border-black transition-all duration-300"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
