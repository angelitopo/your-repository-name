'use client'

import Sidebar from './Sidebar'
import MobileMenu from './MobileMenu'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
} 