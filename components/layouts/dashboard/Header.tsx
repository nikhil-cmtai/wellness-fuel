'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ChevronRight, 
  Home, 
  Sun, 
  Moon, 
  Bell, 
  Search,
  Settings,
  LucideIcon,
  Monitor
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Breadcrumb {
  name: string
  href: string
  icon?: LucideIcon
}

interface HeaderProps {
  isCollapsed: boolean
}

const Header: React.FC<HeaderProps> = ({ isCollapsed }) => {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="w-5 h-5" />
    if (theme === 'light') return <Sun className="w-5 h-5" />
    if (theme === 'dark') return <Moon className="w-5 h-5" />
    return <Monitor className="w-5 h-5" />
  }

  const getThemeTitle = () => {
    if (!mounted) return 'Loading...'
    if (theme === 'light') return 'Switch to dark mode'
    if (theme === 'dark') return 'Switch to system mode'
    return 'Switch to light mode'
  }

  const generateBreadcrumbs = (): Breadcrumb[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: Breadcrumb[] = [
      { name: 'Dashboard', href: '/dashboard', icon: Home }
    ]

    if (pathSegments.length > 1) {
      const currentPage = pathSegments[pathSegments.length - 1]
      const capitalizedPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1)
      breadcrumbs.push({
        name: capitalizedPage,
        href: `/${pathSegments.join('/')}`
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className={`
      fixed top-0 right-0 h-16 bg-background border-b border-border 
      transition-all duration-300 ease-in-out z-30 shadow-sm
      ${isCollapsed ? 'left-16' : 'left-64'}
    `}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.href}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              <Link
                href={breadcrumb.href}
                className={`
                  flex items-center space-x-1 px-2 py-1 rounded-md transition-colors
                  ${index === breadcrumbs.length - 1
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {breadcrumb.icon && <breadcrumb.icon className="w-4 h-4" />}
                <span>{breadcrumb.name}</span>
              </Link>
            </React.Fragment>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-muted border border-input rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200"
            title={mounted ? `${getThemeTitle()} (Current: ${resolvedTheme})` : getThemeTitle()}
          >
            {getThemeIcon()}
            <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              theme === 'light' ? 'bg-primary' : 
              theme === 'dark' ? 'bg-primary' : 
              'bg-primary'
            } animate-pulse`}></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@wellnessfuel.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header