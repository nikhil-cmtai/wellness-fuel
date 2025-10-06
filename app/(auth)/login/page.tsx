"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Eye, EyeOff, Lock, UserPlus, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginUser, selectAuthError, selectAuthLoading, setUser } from "@/lib/redux/features/authSlice";
import { storeAuthData, isAuthenticated, fetchUserDetails, updateUserRole, getDashboardForRole } from "@/lib/utils/auth";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectAuthError )
  const loading = useAppSelector(selectAuthLoading)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      // User is already logged in, redirect to appropriate dashboard based on role
      const userCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='))
      
      if (userCookie) {
        try {
          const user = JSON.parse(decodeURIComponent(userCookie.split('=')[1]))
          const dashboardUrl = getDashboardForRole(user.role)
          router.push(dashboardUrl)
        } catch (error) {
          console.error('Error parsing user cookie:', error)
          router.push('/profile') // Default fallback
        }
      } else {
        router.push('/profile') // Default fallback
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch login action
      const result = await dispatch(loginUser(email, password));
      console.log('Login result:', result);
      
      // Check if login was successful
      if (result && result.message === "login successfully" && result.session) {
        const { session } = result;
        console.log('Login successful, session:', session);
        
        // Store authentication data using utility function
        storeAuthData(session);
        
        // Fetch user details to get the actual role
        try {
          const userDetails = await fetchUserDetails(session.user, session.token);
          console.log('User details:', userDetails);
          
          if (userDetails && userDetails.role) {
            // Set user in Redux store
            dispatch(setUser(userDetails));
            
            // Update user role in cookies and localStorage
            updateUserRole(userDetails.role);
            console.log('Updated user role to:', userDetails.role);
            
            // Redirect based on user role
            const dashboardUrl = getDashboardForRole(userDetails.role);
            console.log('Redirecting to:', dashboardUrl);
            
            // Use replace instead of push to prevent back button issues
            router.replace(dashboardUrl);
          } else {
            // If API call fails or no role found, use default role
            console.log('Using default role: user');
            updateUserRole('user');
            router.replace('/profile');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          // Use default role if API call fails
          console.log('Using default role due to API error: user');
          updateUserRole('user');
          router.replace('/profile');
        }
      } else {
        console.log('Login failed or invalid response:', result);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                    disabled={loading}
                    className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className="pl-10 pr-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  <KeyRound className="w-4 h-4 inline mr-1" />
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?
                </span>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              variant="outline"
              className="w-full h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              onClick={() => router.push('/signup')}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create New Account
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;