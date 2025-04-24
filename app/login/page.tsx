'use client'

import { useRouter } from 'next/navigation'
import { auth } from '../lib/api'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function Login() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-medium">Welcome to KIMU</h1>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => auth.loginWithGoogle()}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Mail className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            onClick={() => auth.loginWithMicrosoft()}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Lock className="w-5 h-5" />
            Continue with Microsoft
          </button>
          <button
            onClick={() => auth.loginWithDropbox()}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <LogIn className="w-5 h-5" />
            Continue with Dropbox
          </button>
        </div>
      </div>
    </div>
  )
}
