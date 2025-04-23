'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      localStorage.setItem('token', token)
      router.push('/')
    } else {
      router.push('/login')
    }
  }, [router, searchParams])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-medium">Authenticating...</h2>
        <p className="mt-2 text-gray-600">Please wait while we complete your sign in.</p>
      </div>
    </div>
  )
} 