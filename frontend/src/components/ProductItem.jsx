// src/components/ProductItem.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="block cursor-pointer text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <div className="overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-auto hover:scale-105 transition-transform ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium dark:text-gray-100">
        {name}
      </p>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {currency}{price}
      </p>
    </Link>
  );
};

export default ProductItem;
