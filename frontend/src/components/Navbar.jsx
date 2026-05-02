import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(
        () =>
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const { setShowSearch, getCartCount, setToken, navigate, setCartItems, token } = useContext(ShopContext);

    useEffect(() => {
        const root = document.documentElement;
        dark ? root.classList.add('dark') : root.classList.remove('dark');
        localStorage.theme = dark ? 'dark' : 'light';
    }, [dark]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
        setCartItems({});
        setProfileOpen(false);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md px-6 md:px-12 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-baseline gap-1">
                    <h1 className="text-3xl md:text-4xl font-bold font-lora text-gray-900 dark:text-white">
                        Fashion
                    </h1>
                    <span className="text-3xl md:text-4xl font-bold font-montserrat text-orange-500">
                        .
                    </span>
                </Link>

                <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300">
                    {['Home', 'Collection', 'About', 'Contact'].map((label, idx) => (
                        <NavLink
                            key={label}
                            to={['/', '/collection', '/about', '/contact'][idx]}
                            className="relative group px-2 py-1 hover:text-gray-900 dark:hover:text-white transition"
                            activeClassName="text-gray-900 dark:text-white"
                        >
                            {label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                        </NavLink>
                    ))}
                </ul>

                <div className="flex items-center gap-1">
                    <button onClick={() => { setShowSearch(true), navigate("/collection") }} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>

                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle Dark Mode"
                    >
                        {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                    </button>

                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => (token ? setProfileOpen((prev) => !prev) : navigate('/login'))}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </button>

                        {token && profileOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 dark:text-white rounded shadow-lg py-2 z-50">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/orders');
                                        setProfileOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    Orders
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="absolute -right-1 -bottom-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {getCartCount()}
                        </span>
                    </Link>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        {menuOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-700 dark:text-gray-300">
                        {['Home', 'Collection', 'About', 'Contact'].map((label, idx) => (
                            <NavLink
                                key={label}
                                to={['/', '/collection', '/about', '/contact'][idx]}
                                onClick={() => setMenuOpen(false)}
                                className="block text-lg hover:text-gray-900 dark:hover:text-white transition"
                            >
                                {label}
                            </NavLink>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;