"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  ShoppingCart,
  Pill,
  Shield,
  Zap,
  Stethoscope,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const ProductSection = () => {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Enhanced data with 6 products and rupee pricing
  const products = [
    {
      title: "Wellness Supplements",
      description:
        "Premium quality vitamins, minerals, and health supplements to support your wellness journey.",
      features: [
        "Natural & Organic Ingredients",
        "Third-Party Lab Tested",
        "Customized Recommendations",
      ],
      price: "From ₹1,999",
      originalPrice: "₹3,199",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center",
      icon: Heart,
      rating: 4.9,
      reviews: 456,
    },
    {
      title: "Prescription Medications",
      description:
        "Get your prescribed medications delivered directly to your doorstep with our secure pharmacy service.",
      features: [
        "FDA Approved Medications",
        "Free & Discreet Home Delivery",
        "Easy Prescription Upload",
      ],
      price: "From ₹1,199",
      originalPrice: "₹1,999",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop&crop=center",
      icon: Pill,
      rating: 4.8,
      reviews: 234,
    },
    {
      title: "Health Monitors",
      description:
        "Advanced health monitoring devices to track your vital signs and wellness metrics.",
      features: [
        "Real-Time Vital Monitoring",
        "Seamless Mobile App Sync",
        "Professional Grade Accuracy",
      ],
      price: "From ₹7,199",
      originalPrice: "₹9,599",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
      icon: Zap,
      rating: 4.6,
      reviews: 123,
    },
    {
      title: "First Aid & Care",
      description:
        "Comprehensive first aid supplies for home, office, and travel emergency situations.",
      features: [
        "Complete Medical Supplies",
        "Portable & Durable Design",
        "Emergency Guide Included",
      ],
      price: "From ₹2,799",
      originalPrice: "₹3,999",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1603398938796-e867ee8b0b1d?w=600&h=400&fit=crop&crop=center",
      icon: Shield,
      rating: 4.7,
      reviews: 189,
    },
    {
      title: "Medical Equipment",
      description:
        "Professional-grade medical equipment for home healthcare and monitoring needs.",
      features: [
        "Hospital Grade Quality",
        "Easy to Use Interface",
        "Comprehensive Warranty",
      ],
      price: "From ₹4,999",
      originalPrice: "₹6,999",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
      icon: Stethoscope,
      rating: 4.8,
      reviews: 156,
    },
    {
      title: "Fitness Trackers",
      description:
        "Smart fitness trackers to monitor your daily activity, sleep, and health metrics.",
      features: [
        "24/7 Health Monitoring",
        "Water Resistant Design",
        "Long Battery Life",
      ],
      price: "From ₹3,499",
      originalPrice: "₹4,999",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&h=400&fit=crop&crop=center",
      icon: Activity,
      rating: 4.5,
      reviews: 278,
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Green Blob - Top Right */}
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-[#bed16b]/8 to-[#a8c55a]/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary Orange Blob - Bottom Left */}
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-[#ea8f39]/8 to-[#d67d2a]/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Accent Green Blob - Top Left */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-[#a8c55a]/6 to-[#bed16b]/6 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Primary Orange Blob - Bottom Right */}
        <motion.div
          className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-[#d67d2a]/6 to-[#ea8f39]/6 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Center Accent Blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#bed16b]/4 to-[#ea8f39]/4 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Small Floating Particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#bed16b] rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#ea8f39] rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#a8c55a] rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold mb-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ShoppingCart className="w-4 h-4 text-[#ea8f39]" />
            <span>Premium Healthcare Products</span>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-slate-900 dark:text-white">Our Curated </span>
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent">
              Products
            </span>
          </motion.h2>

          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="h-1 w-24 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full shadow-lg"></div>
          </motion.div>

          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Discover our premium pharmacy products and health essentials
            designed to support your wellness journey with quality and
            convenience.
          </motion.p>
        </motion.div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={`group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl ${
                product.popular
                  ? "ring-2 ring-[#ea8f39] shadow-[#ea8f39]/20"
                  : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              {/* Enhanced Popular Badge */}
              {product.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                </motion.div>
              )}

              {/* Discount Badge */}
              <motion.div 
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
              >
                Save{" "}
                {Math.round(
                  ((parseFloat(product.originalPrice.replace("₹", "").replace(",", "")) -
                    parseFloat(product.price.replace("From ₹", "").replace(",", ""))) /
                    parseFloat(product.originalPrice.replace("₹", "").replace(",", ""))) *
                    100
                )}
                %
              </motion.div>

              {/* Enhanced Product Image with Fallback */}
              <div className="relative w-full h-64 overflow-hidden">
                {!imageErrors[index] ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => handleImageError(index)}
                      loading="lazy"
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                    <product.icon className="w-20 h-20 text-[#ea8f39]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                )}

                {/* Title overlay */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-white drop-shadow-lg mb-2">
                    {product.title}
                  </h3>
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, delay: 1.8 + index * 0.1 + i * 0.05 }}
                        >
                          <Star
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-400"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-xs text-white/90 font-medium">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </motion.div>

                {/* Heart icon for favorites */}
                <motion.div 
                  className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </motion.div>
              </div>

              <div className="p-4 flex flex-col">
                {/* Description */}
                <motion.p 
                  className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm line-clamp-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                >
                  {product.description}
                </motion.p>

                {/* Enhanced Features */}
                <ul className="space-y-2 mb-4">
                  {product.features.slice(0, 2).map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 2.2 + index * 0.1 + featureIndex * 0.1 }}
                    >
                      <motion.div 
                        className="w-5 h-5 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full flex items-center justify-center flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 2.4 + index * 0.1 + featureIndex * 0.1 }}
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Enhanced Price Section */}
                <motion.div 
                  className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.6 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-left">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Starting from
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className="text-xl font-black"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 2.8 + index * 0.1 }}
                        >
                          <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent">
                            {product.price}
                          </span>
                        </motion.span>
                        <span className="text-xs text-slate-500 line-through">
                          {product.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 3 + index * 0.1 }}
                  >
                    <Button
                      className="w-full py-3 font-bold rounded-xl transition-all duration-300 relative overflow-hidden bg-white text-black border-2 border-transparent bg-clip-padding hover:scale-105 hover:border-gradient-to-r hover:from-[#bed16b] hover:to-[#ea8f39] hover:bg-white focus:outline-none"
                      style={{
                        borderImage: 'linear-gradient(to right, #bed16b, #ea8f39) 1',
                        borderImageSlice: 1,
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex justify-center">    
          <Button className="px-10 py-4 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            Explore All Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductSection;
