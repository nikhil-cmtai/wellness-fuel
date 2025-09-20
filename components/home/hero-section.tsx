"use client";
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Star, Sparkles, Heart, Users } from "lucide-react";
import { getUserFromCookie } from "@/lib/auth";

const HeroSection = () => {
  const user = getUserFromCookie();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced background elements with animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-wellness-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-wellness-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#bed16b]/3 to-[#ea8f39]/3 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#bed16b] rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#ea8f39] rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#bed16b] rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Enhanced badge with glow effect */}
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-bold mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:bg-white dark:hover:bg-slate-800">
            <Star className="w-5 h-5 text-[#ea8f39] fill-current animate-pulse" />
            <span className="relative">
              Trusted by 10,000+ customers worldwide
              <div className="absolute inset-0 bg-gradient-to-r from-[#bed16b]/20 to-[#ea8f39]/20 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </span>
            <Sparkles className="w-4 h-4 text-[#bed16b] animate-pulse delay-300" />
          </div>

          {/* Enhanced main heading with better typography */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tight">
              <span className="inline-block bg-gradient-to-r from-[#bed16b] via-[#a8c55a] to-[#ea8f39] bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                Transform Your
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-[#ea8f39] via-[#d67d2a] to-[#bed16b] bg-clip-text text-transparent drop-shadow-2xl animate-pulse delay-200">
                Health Journey
              </span>
            </h1>

            {/* Decorative underline */}
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Enhanced subheading */}
          <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-sm">
            Discover personalized wellness solutions, connect with expert
            doctors, and join a community dedicated to your health and
            happiness.
          </p>

          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-8 mb-12 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <span className="text-sm font-semibold">24/7 Care</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold">Expert Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">4.9/5 Rating</span>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
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
                  className="group relative bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-12 py-5 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Go to Dashboard
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-12 py-5 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              size="lg"
              className="group relative border-3 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 px-12 py-5 text-lg font-bold rounded-full transition-all duration-500 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm bg-white/50 dark:bg-slate-800/50"
            >
              <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#bed16b]/10 to-[#ea8f39]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Social proof section */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] border-2 border-white dark:border-slate-800"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ea8f39] to-[#bed16b] border-2 border-white dark:border-slate-800"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] border-2 border-white dark:border-slate-800"></div>
              </div>
              <span className="font-medium">Join 10k+ happy users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator with glow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="relative w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm shadow-lg">
          <div className="w-1 h-3 bg-gradient-to-b from-[#bed16b] to-[#ea8f39] rounded-full mt-2 animate-pulse shadow-lg"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#bed16b]/20 to-[#ea8f39]/20 blur-md animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection