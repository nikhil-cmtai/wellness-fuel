import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['admin'],
  '/doctors': ['doctor'],
  '/influencers': ['influencer'],
  '/profile': ['user', 'admin', 'doctor', 'influencer'],
}

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/', '/about', '/contact', '/privacy-policy', '/terms', 'cookie-policy', '/products', '/doctors', 'book-appointment']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get user data from cookies
  const userCookie = request.cookies.get('user')
  let user = null
  
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value)
    } catch (error) {
      console.error('Error parsing user cookie:', error)
    }
  }

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  // If user is not authenticated and trying to access protected route
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is authenticated
  if (user) {
    // If trying to access login/signup while already logged in, redirect to appropriate dashboard
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.redirect(new URL(getDashboardForRole(user.role), request.url))
    }

    // Check if user has access to the current route
    const routeAccess = Object.entries(protectedRoutes).find(([route]) => 
      pathname.startsWith(route)
    )

    if (routeAccess) {
      const [route, allowedRoles] = routeAccess
      
      if (!allowedRoles.includes(user.role)) {
        // User doesn't have access to this route, redirect to their dashboard
        return NextResponse.redirect(new URL(getDashboardForRole(user.role), request.url))
      }
    }
  }

  return NextResponse.next()
}

function getDashboardForRole(role: string): string {
  switch (role) {
    case 'admin':
      return '/dashboard'
    case 'doctor':
      return '/doctors'
    case 'influencer':
      return '/influencers'
    case 'user':
      return '/profile'
    default:
      return '/login'
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
