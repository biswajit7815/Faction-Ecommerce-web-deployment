import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { motion } from 'framer-motion'
import { Award, ShoppingCart, Headphones } from 'lucide-react'

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }
    
    const staggerChildren = {
        visible: { transition: { staggerChildren: 0.2 } },
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
                <motion.div 
                    variants={fadeIn}
                    className="text-center mb-16"
                >
                    <Title text1="ABOUT" text2="US" />
                </motion.div>

                {/* Main Content */}
                <motion.div 
                    variants={fadeIn}
                    className="flex flex-col lg:flex-row gap-12 items-center mb-24"
                >
                    <motion.img 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:max-w-[600px] rounded-xl shadow-lg dark:shadow-gray-800/50"
                        src={assets.about_img} 
                        alt="About us" 
                    />

                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-6 dark:text-gray-300"
                    >
                        <p className="text-lg leading-relaxed">
                            At the heart of our brand lies a passion for redefining fashion. We believe clothing 
                            should empower confidence while maintaining ultimate comfort.
                        </p>
                        
                        <p className="text-lg leading-relaxed">
                            Founded in 2023, we've curated collections that blend timeless elegance with 
                            contemporary trends, ensuring every piece tells a story.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-playfair font-semibold dark:text-white">
                                Our Mission
                            </h3>
                            <p className="text-lg leading-relaxed">
                                To revolutionize your wardrobe with sustainable, ethically-produced apparel 
                                that doesn't compromise on style or quality. We're committed to creating 
                                fashion that feels good and does good.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Why Choose Us */}
                <motion.div 
                    variants={fadeIn}
                    className="mb-24"
                >
                    <div className="text-center mb-16">
                        <Title text1="WHY" text2="CHOOSE US" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Quality Card */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800/30 transition-all duration-300"
                        >
                            <Award className="w-12 h-12 mb-6 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="text-xl font-semibold mb-4 dark:text-white">
                                Quality Assurance
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Every garment undergoes rigorous quality checks. We partner with certified 
                                manufacturers to ensure premium craftsmanship in every stitch.
                            </p>
                        </motion.div>

                        {/* Convenience Card */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800/30 transition-all duration-300"
                        >
                            <ShoppingCart className="w-12 h-12 mb-6 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="text-xl font-semibold mb-4 dark:text-white">
                                Seamless Experience
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Enjoy hassle-free shopping with our intuitive platform, fast shipping, 
                                and flexible returns. Your convenience is our priority.
                            </p>
                        </motion.div>

                        {/* Service Card */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-800/30 transition-all duration-300"
                        >
                            <Headphones className="w-12 h-12 mb-6 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="text-xl font-semibold mb-4 dark:text-white">
                                Dedicated Support
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                24/7 customer care with fashion experts. Virtual styling consultations 
                                and personalized recommendations available.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Newsletter */}
                <motion.div 
                    variants={fadeIn}
                    className="mb-16"
                >
                    <NewsLetterBox />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default About