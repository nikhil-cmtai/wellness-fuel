"use client";
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Star } from 'lucide-react'
import { getUserFromCookie } from '@/lib/auth'

const HeroSection = () => {
  const user = getUserFromCookie()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-green-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-wellness-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-wellness-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 backdrop-blur-sm border-2 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 text-sm font-semibold mb-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <Star className="w-4 h-4 text-[#ea8f39] fill-current" />
            <span>Trusted by 10,000+ customers worldwide</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent drop-shadow-lg">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#ea8f39] to-[#bed16b] bg-clip-text text-transparent drop-shadow-lg">
              Health Journey
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-slate-800 dark:text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-sm">
            Discover personalized wellness solutions, connect with expert doctors, and join a community dedicated to your health and happiness.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {user ? (
              <Link href={user.role === 'user' ? '/profile' : user.role === 'admin' ? '/dashboard' : user.role === 'doctor' ? '/doctors' : '/influencers'}>
                <Button size="lg" className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-slate-600 dark:border-slate-400 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 px-10 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 dark:border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-600 dark:bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection