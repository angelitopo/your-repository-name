'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../lib/api'
import { Google, Microsoft, Dropbox } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  
  const handleOAuthLogin = (provider: 'google' | 'microsoft' | 'dropbox') => {
    switch(provider) {
      case 'google':
        auth.loginWithGoogle()
        break
      case 'microsoft':
        auth.loginWithMicrosoft()
        break
      case 'dropbox':
        auth.loginWithDropbox()
        break
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-medium">Welcome to KIMU</h1>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="btn w-full flex items-center justify-center gap-2"
          >
            <Google className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuthLogin('microsoft')}
            className="btn w-full flex items-center justify-center gap-2"
          >
            <Microsoft className="w-5 h-5" />
            Continue with Microsoft
          </button>
          <button
            onClick={() => handleOAuthLogin('dropbox')}
            className="btn w-full flex items-center justify-center gap-2"
          >
            <Dropbox className="w-5 h-5" />
            Continue with Dropbox
          </button>
        </div>
      </div>
    </div>
  )
} 