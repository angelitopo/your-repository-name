import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Minimalist AI App',
  description: 'A minimalist black-and-white AI-powered web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-primary min-h-screen`}>
        {children}
      </body>
    </html>
  )
} 