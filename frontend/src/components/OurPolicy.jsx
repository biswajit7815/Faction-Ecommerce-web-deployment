// src/components/OurPolicy.jsx
import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='bg-white dark:bg-gray-900 flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300'>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5 dark:filter dark:invert' alt='Exchange Policy' />
        <p className='font-semibold dark:text-gray-100'>Easy Exchange Policy</p>
        <p className='text-gray-400 dark:text-gray-500'>We offer hassle free exchange Policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5 dark:filter dark:invert' alt='Return Policy' />
        <p className='font-semibold dark:text-gray-100'>7-Day Return Policy</p>
        <p className='text-gray-400 dark:text-gray-500'>We provide 7-day free return policy</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5 dark:filter dark:invert' alt='Customer Support' />
        <p className='font-semibold dark:text-gray-100'>Best Customer Support</p>
        <p className='text-gray-400 dark:text-gray-500'>We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;