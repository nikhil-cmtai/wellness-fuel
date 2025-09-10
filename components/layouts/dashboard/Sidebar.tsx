'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  UserPlus, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  Tags,
  Settings,
  Star,
  FileText,
  } from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Doctors', href: '/dashboard/doctors', icon: UserCheck },
    { name: 'Influencers', href: '/dashboard/influencers', icon: UserPlus },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Blogs', href: '/dashboard/blogs', icon: FileText },
    { name: 'Categories', href: '/dashboard/categories', icon: Tags  },
    { name: 'Products', href: '/dashboard/products', icon: Package },
    { name: 'Leads', href: '/dashboard/leads', icon: TrendingUp },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-background border-r border-border 
        transition-all duration-300 ease-in-out z-50 shadow-lg
        ${isCollapsed ? 'w-21' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-foreground">
              Wellness Fuel
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            ) : (
              <ChevronLeft className="w-6 h-6 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-1 py-2 rounded-lg transition-all duration-200 group
                  ${active 
                    ? 'bg-accent text-accent-foreground border-r-2 border-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full px-1 py-2 text-destructive 
              hover:bg-destructive/10 rounded-lg transition-colors group
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 bg-background border border-border rounded-lg lg:hidden shadow-lg"
      >
        <Menu className="w-6 h-6 text-muted-foreground" />
      </button>
    </>
  )
}

export default Sidebar