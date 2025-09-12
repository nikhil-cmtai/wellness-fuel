"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getUserFromCookie, logout } from '@/lib/auth'
import { LogOut, User, LayoutDashboard, Calendar, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button';

const Header = () => {
  const [user, setUser] = useState(getUserFromCookie())
  const [isClient, setIsClient] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
    setUser(getUserFromCookie())
  }, [])

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/our-doctors', label: 'Doctors' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const getDashboardLink = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'admin':
        return '/dashboard'
      case 'doctor':
        return '/doctors'
      case 'influencer':
        return '/influencers'
      case 'user':
        return '/profile'
      default:
        return '/profile'
    }
  }

  const getDashboardText = () => {
    if (!user) return 'Login'
    switch (user.role) {
      case 'admin':
        return 'Dashboard'
      case 'doctor':
        return 'Doctor Panel'
      case 'influencer':
        return 'Influencer Panel'
      case 'user':
        return 'Profile'
      default:
        return 'Profile'
    }
  }

  return (
    <header className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image 
                src="/logo.png" 
                alt="Wellness Fuel" 
                width={120} 
                height={40} 
                className="object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ${
                  isActive(item.href)
                    ? 'text-[#ea8f39] bg-[#bed16b]/10'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#ea8f39] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#ea8f39] rounded-full"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#bed16b]/20 to-[#ea8f39]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* CTA and User Actions */}
          <div className="flex items-center gap-2">
            {/* Book Appointment CTA */}
            <Button
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Button>

            {/* User Actions */}
            {isClient && user ? (
              <div className="flex items-center gap-2">
                {/* Dashboard/Profile Link */}
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-sm shadow-sm"
                >
                  {user.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <LayoutDashboard className="w-4 h-4" />
                  )}
                  <span className="hidden lg:inline">{getDashboardText()}</span>
                </Link>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  onClick={logout}
                  className="flex items-center gap-2 px-2 py-2 rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              /* Login Button for non-authenticated users */
              <Link
                href="/login"
                className="px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-sm shadow-sm"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-base font-semibold transition-all duration-300 rounded-lg ${
                    isActive(item.href)
                      ? 'text-[#ea8f39] bg-[#bed16b]/10 border-l-4 border-[#ea8f39]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#ea8f39] hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Book Appointment */}
              <div className="px-4 py-2">
                <Button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white font-semibold rounded-full shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header