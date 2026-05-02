import React from 'react';

const NewsLetterBox = () => {
    return (
        <div className="text-center px-4 py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Subscribe now & get 20% off
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full sm:w-3/4 md:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto mt-6 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
            >
                <input
                    className="w-full flex-1 px-4 py-3 text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black text-sm px-6 py-3 transition-colors duration-300 hover:opacity-90"
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
