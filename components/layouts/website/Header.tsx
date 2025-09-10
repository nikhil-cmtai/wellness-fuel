import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HealthCare</span>
          <span className="hidden sm:inline text-base font-medium text-gray-500 dark:text-gray-300">Co.</span>
        </Link>
        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Home</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">About</Link>
          <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Products</Link>
          <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Contact</Link>
        </nav>
        {/* Call to Action */}
        <Link
          href="/login"
          className="ml-4 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm shadow"
        >
          Login
        </Link>
      </div>
    </header>
  )
}

export default Header