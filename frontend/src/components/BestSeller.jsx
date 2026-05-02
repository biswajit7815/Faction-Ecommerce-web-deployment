// src/components/BestSeller.jsx
// Step-by-step enhancements:
// 1. Wrap section in dark-mode compatible container with padding for whitespace.
// 2. Animate title and subtitle entry with Framer Motion.
// 3. Use responsive grid (2–5 cols) with consistent gaps.
// 4. Stagger product items’ fade-in and add hover scale.
// 5. Dark-mode text adjustments for readability.

import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const best = products.filter((p) => p.bestSeller).slice(0, 5);
    setBestSeller(best);
  }, [products]);

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <motion.div
          className="text-center mb-8 space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title text1="BEST" text2=" SELLERS" />
          <p className="mx-auto w-3/4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Explore our top-rated styles chosen by our customers.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {bestSeller.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BestSeller;
