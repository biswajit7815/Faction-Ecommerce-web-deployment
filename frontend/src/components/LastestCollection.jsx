import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title and Description */}
        <motion.div
          className="text-center mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title text1="LATEST" text2=" COLLECTIONS" />
          <p className="mx-auto w-3/4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Discover our latest handpicked arrivals with premium fabrics and craftsmanship.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {latestProduct.map((item, index) => (
            <motion.div key={item._id} variants={itemVariants} whileHover={{ scale: 1.03 }}>
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

export default LatestCollection;
