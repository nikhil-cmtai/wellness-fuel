"use client";

import React from "react";
import { Users, Award, Clock, Heart } from "lucide-react";
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Patients",
      description: "Trusted by a thriving community worldwide.",
    },
    {
      icon: Award,
      number: "500+",
      label: "Expert Doctors",
      description: "Board-certified and experienced professionals.",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available",
      description: "Round-the-clock assistance for all your needs.",
    },
    {
      icon: Heart,
      number: "99.9%",
      label: "Patient Satisfaction",
      description: "Consistently high ratings from our patients.",
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-[#bed16b] via-[#a8c55a] to-[#ea8f39] bg-clip-text text-transparent">
              Trusted by Thousands Worldwide
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our platform has transformed healthcare delivery, connecting
            patients with world-class medical professionals and delivering
            exceptional outcomes.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <motion.div 
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-transparent rounded-xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-xl p-0.5">
                    <div className="w-full h-full bg-white dark:bg-slate-800 rounded-xl"></div>
                  </div>
                  <stat.icon className="w-8 h-8 text-black relative z-10" />
                </motion.div>

                <motion.div 
                  className="text-3xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                </motion.div>

                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {stat.label}
                </div>

                <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {stat.description}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Simple bottom section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-900 dark:text-slate-100 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>Join thousands of satisfied patients</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
