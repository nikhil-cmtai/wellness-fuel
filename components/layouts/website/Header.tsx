"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getUserFromCookie, logout } from '@/lib/auth'
import {
  LogOut,
  User,
  LayoutDashboard,
  Calendar,
  Menu,
  X,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [user, setUser] = useState(getUserFromCookie());
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    setUser(getUserFromCookie());
  }, []);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/our-doctors", label: "Doctors" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin": return "/dashboard";
      case "doctor": return "/doctors";
      case "influencer": return "/influencers";
      case "user": return "/profile";
      default: return "/profile";
    }
  };

  const getDashboardText = () => {
    if (!user) return "Login";
    switch (user.role) {
      case "admin": return "Dashboard";
      case "doctor": return "Doctor Panel";
      case "influencer": return "Influencer Panel";
      case "user": return "Profile";
      default: return "Profile";
    }
  };
  
  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <header className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section with Fallback */}
          <Link href="/" className="flex items-center group">
              {!logoError ? (
                <Image
                  src="/logo.png"
                  alt="Wellness Fuel"
                  width={120}
                  height={40}
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={handleLogoError}
                />
              ) : (
                <div className="text-2xl font-bold bg-gradient-to-r from-[#bed16b] to-[#ea8f39] bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
                  Wellness Fuel
                </div>
              )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 rounded-lg group ${
                  isActive(item.href)
                    ? "text-[#ea8f39] bg-[#bed16b]/10"
                    : "text-slate-700 dark:text-slate-300 hover:text-[#ea8f39] hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[#ea8f39] text-2xl font-light leading-none">∞</span>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA and User Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Book Appointment CTA */}
            <Button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#bed16b] to-[#ea8f39] hover:from-[#a8c55a] hover:to-[#d67d2a] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Button>

            {/* --- ICONS ADDED HERE --- */}
            <div className="hidden sm:flex items-center gap-1">
                <Link href="/wishlist" aria-label="Wishlist">
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Heart className="w-5 h-5" />
                    </Button>
                </Link>
                <Link href="/cart" aria-label="Shopping Cart">
                    <Button variant="ghost" size="icon" className="rounded-full relative text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ea8f39] text-white text-[10px] font-bold">2</span>
                    </Button>
                </Link>
            </div>
             {/* --- END OF ADDED ICONS --- */}

            {/* User Actions */}
            <div className="flex items-center gap-2">
              {isClient && user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href={getDashboardLink()}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 text-sm shadow-sm"
                  >
                    {user.role === "user" ? <User className="w-4 h-4" /> : <LayoutDashboard className="w-4 h-4" />}
                    <span className="hidden lg:inline">{getDashboardText()}</span>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-600 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                   <Button className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors rounded-full shadow-sm">Login</Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-base font-semibold transition-colors rounded-lg ${
                    isActive(item.href)
                      ? "text-[#ea8f39] bg-[#bed16b]/10"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2 space-y-2">
                 <Link href="/wishlist" className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart className="w-5 h-5"/> Wishlist
                 </Link>
                 <Link href="/cart" className="flex items-center gap-3 px-4 py-2 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart className="w-5 h-5"/> My Cart
                 </Link>
              </div>

              <div className="px-2 pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-[#bed16b] to-[#ea8f39] text-white font-semibold rounded-full shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;