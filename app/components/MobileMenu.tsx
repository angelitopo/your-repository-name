'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Settings, FileText, MessageSquare, X } from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-secondary transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 relative">
          <div
            className={`absolute w-6 h-0.5 bg-primary transition-all duration-300 ${
              isOpen ? 'top-3 rotate-45' : 'top-1'
            }`}
          />
          <div
            className={`absolute w-6 h-0.5 bg-primary transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'top-3'
            }`}
          />
          <div
            className={`absolute w-6 h-0.5 bg-primary transition-all duration-300 ${
              isOpen ? 'top-3 -rotate-45' : 'top-5'
            }`}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-background transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-8 border-b">
            <h1 className="text-xl font-medium">AI App</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'sidebar-link',
                    pathname === item.href && 'active'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
} 