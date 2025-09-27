'use client'

import React from 'react'
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ErrorProps {
  title?: string
  message?: string
  showRetry?: boolean
  showHome?: boolean
  onRetry?: () => void
  onGoHome?: () => void
}

const Error: React.FC<ErrorProps> = ({
  title = "Oops! Something went wrong",
  message = "We encountered an unexpected error. Don't worry, our team has been notified and is working to fix it.",
  showRetry = true,
  showHome = true,
  onRetry,
  onGoHome
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome()
    } else {
      window.location.href = '/dashboard'
    }
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="text-center space-y-6">
            {/* Animated Error Icon */}
            <div className="relative">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 mx-auto w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-20 animate-ping"></div>
            </div>

            {/* Error Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {title}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              {message}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              {showRetry && (
                <Button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              )}
              
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>

              {showHome && (
                <Button
                  onClick={handleGoHome}
                  variant="outline"
                  className="border-2 border-blue-300 hover:border-blue-400 text-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              )}
            </div>

            {/* Additional Help */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If the problem persists, please contact our support team.
              </p>
              <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-400">
                <span>Error Code: 500</span>
                <span>•</span>
                <span>Timestamp: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
      </div>
    </div>
  )
}

export default Error