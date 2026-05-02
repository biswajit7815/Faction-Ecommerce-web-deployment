import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 text-gray-800 dark:text-gray-200 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <span className="block w-10 h-[2px] bg-gray-800 dark:bg-gray-200"></span>
            <span className="uppercase text-sm tracking-wide font-medium">Our Best Seller</span>
          </div>

          <motion.h1
            className="font-lora text-4xl sm:text-5xl lg:text-6xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Latest Arrivals
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md transition-transform transform hover:scale-105">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1683121271931-669e09a55414?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero"
            className="w-full h-auto rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
