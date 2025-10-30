"use client";
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Star, Sparkles, Heart, Users, CheckCircle, TrendingUp, Shield } from "lucide-react";
import { getUserFromCookie } from "@/lib/auth";
import { motion } from 'framer-motion';
import Image from 'next/image';
import HERO_IMAGE from '../../public/hero.jpg';

const HeroSection = () => {
  const user = getUserFromCookie();

  return (

    <section className="relative py-6 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Right Gradient Orb */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 via-indigo-400/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Bottom Left Gradient Orb */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/20 via-blue-400/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-blue-500/20 rounded-lg"
          animate={{
            rotate: [0, 180, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-indigo-500/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
          <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium"
              initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>#1 Wellness Platform</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="block text-slate-900 dark:text-white">
                  Your Health,
              </span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  Our Priority
              </span>
            </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Experience personalized healthcare with expert doctors, premium wellness products, and 24/7 support — all in one platform.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-2">
              {[
                { icon: CheckCircle, text: "Verified Healthcare Professionals" },
                { icon: TrendingUp, text: "Track Your Health Progress" },
                { icon: Shield, text: "Secure & Private Consultations" }
              ].map((feature, index) => (
          <motion.div
                  key={index}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
            </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
          <motion.div
              className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-5 text-base font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-5 text-base font-semibold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              size="lg"
                className="border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-5 text-base font-semibold rounded-xl transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { value: "10K+", label: "Happy Patients" },
                { value: "500+", label: "Expert Doctors" },
                { value: "4.9/5", label: "User Rating" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            className="relative lg:block hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-[500px] max-w-lg mx-auto">
              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-indigo-600/20 z-10"></div>
                
                {/* Main Hero Image */}
                <div className="w-full h-full">
                  <Image
                    src={HERO_IMAGE}
                    alt="Hero"
                    fill
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating Stats Badge */}
              <motion.div
                className="absolute top-8 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-slate-700 backdrop-blur-sm bg-white/90 dark:bg-slate-800/90"
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">98%</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Success Rate</p>
              </motion.div>

              {/* Floating Security Badge */}
              <motion.div
                className="absolute bottom-8 -left-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-4"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="flex items-center gap-3 text-white">
                  <Shield className="w-6 h-6" />
                  <div>
                    <p className="font-bold text-sm">100% Secure</p>
                    <p className="text-xs opacity-90">HIPAA Compliant</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Rating Badge */}
              <motion.div
                className="absolute top-1/2 -left-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-3 border border-slate-200 dark:border-slate-700"
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">4.9</p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400">Rating</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection