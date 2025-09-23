"use client";
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Star, Sparkles, Heart, Users } from "lucide-react";
import { getUserFromCookie } from "@/lib/auth";
import { motion } from 'framer-motion';

const HeroSection = () => {
  const user = getUserFromCookie();

  return (

    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* Enhanced background elements */}
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

      <div className="relative min-h-screen z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Simple badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium mb-6 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-3 h-3 text-[#ea8f39] fill-current" />
            <span>Trusted by 10,000+ customers worldwide</span>
            <Sparkles className="w-3 h-3 text-[#bed16b]" />
          </motion.div>

          {/* Simple main heading */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="inline-block bg-gradient-to-r from-[#bed16b] via-[#a8c55a] to-[#ea8f39] bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-[#ea8f39] via-[#d67d2a] to-[#bed16b] bg-clip-text text-transparent">
                Health Journey
              </span>
            </h1>

            {/* Simple decorative underline */}
            <div className="mt-3 flex justify-center">
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full" />
            </div>
          </motion.div>

          {/* Simple subheading */}
          <motion.p
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 max-w-3xl mx-auto leading-relaxed font-normal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover personalized wellness solutions, connect with expert
            doctors, and join a community dedicated to your health and
            happiness.
          </motion.p>

          {/* Simple trust indicators */}
          <motion.div
            className="flex justify-center items-center gap-6 mb-8 text-slate-500 dark:text-slate-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-xs font-normal">24/7 Care</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-normal">Expert Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-xs font-normal">4.9/5 Rating</span>
            </div>
          </motion.div>

          {/* Simple CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {user ? (
              <Link
                href={
                  user.role === "user"
                    ? "/profile"
                    : user.role === "admin"
                      ? "/dashboard"
                      : user.role === "doctor"
                        ? "/doctors"
                        : "/influencers"
                }
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-6 py-3 text-base font-medium rounded-full shadow-sm"
                >
                  <span className="flex items-center">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-6 py-3 text-base font-medium rounded-full shadow-sm"
                >
                  <span className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              size="lg"
              className="border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 px-6 py-3 text-base font-medium rounded-full shadow-sm bg-white/50 dark:bg-slate-800/50"
            >
              <Play className="mr-2 w-4 h-4" />
              <span>Watch Demo</span>
            </Button>
          </motion.div>

          {/* Simple social proof section */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-slate-500 dark:text-slate-400 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] border-2 border-white dark:border-slate-800" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ea8f39] to-[#bed16b] border-2 border-white dark:border-slate-800" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] border-2 border-white dark:border-slate-800" />
              </div>
              <span className="font-medium">Join 10k+ happy users</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div
        className="absolute bottom-26 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm shadow-lg"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1 h-3 bg-gradient-to-b from-[#bed16b] to-[#ea8f39] rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection