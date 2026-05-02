import React from 'react'
import { motion } from 'framer-motion'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-12 border-t border-gray-200 dark:border-gray-700"
      >
        <Title text1="CONTACT" text2="US" />
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">We’d love to hear from you</p>
      </motion.div>

      {/* Contact Details */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Image */}
          <motion.img
            src={assets.contact_img}
            alt="Contact"
            className="w-full md:max-w-[480px] rounded-lg shadow-lg object-cover"
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col gap-6"
          >
            <div>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">Our Store</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                54709 Willms Station <br />
                Suite 350, Washington, USA
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">Contact Info</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tel: (415) 555-0132 <br />
                Email: admin@forever.com
              </p>
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">Careers at Forever</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Learn more about our team and current job openings.
              </p>
              <button className="mt-4 px-6 py-3 text-sm border rounded-full border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300">
                Explore Jobs
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <NewsLetterBox />
      </motion.div>
    </div>
  )
}

export default Contact
