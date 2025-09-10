import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} HealthCare Co. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm">
          <a
            href="/about"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer