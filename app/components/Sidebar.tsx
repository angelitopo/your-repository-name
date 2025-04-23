'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Settings, FileText, MessageSquare } from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen border-r bg-background fixed left-0 top-0">
      <div className="px-6 py-8">
        <h1 className="text-xl font-medium">AI App</h1>
      </div>
      <nav className="px-2 space-y-1">
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
    </aside>
  )
} 