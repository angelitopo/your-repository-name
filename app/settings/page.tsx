'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import { User, Bell, Lock, Cloud } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Settings() {
  const { settings, updateSettings, connectCloud, fetchSettings } = useStore()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    updateSettings({
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCloudConnect = (service: 'googleDrive' | 'dropbox') => {
    connectCloud(service)
  }

  const handleDeleteAccount = () => {
    if (!isDeleting) {
      setIsDeleting(true)
      return
    }

    // TODO: Implement account deletion API
    alert('Account deletion simulated')
    setIsDeleting(false)
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-medium mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5" />
              <h2 className="text-lg font-medium">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="text-lg font-medium">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleInputChange}
                  className="checkbox"
                />
                <span>Email Notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={handleInputChange}
                  className="checkbox"
                />
                <span>Push Notifications</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5" />
              <h2 className="text-lg font-medium">Security</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="twoFactorEnabled"
                  checked={settings.twoFactorEnabled}
                  onChange={handleInputChange}
                  className="checkbox"
                />
                <span>Two-Factor Authentication</span>
              </label>
            </div>
          </div>

          {/* Cloud Integration */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-5 h-5" />
              <h2 className="text-lg font-medium">Cloud Integration</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => handleCloudConnect('googleDrive')}
                className={`btn w-full ${settings.connectedClouds.googleDrive ? 'btn-secondary' : 'btn-primary'}`}
              >
                {settings.connectedClouds.googleDrive ? 'Disconnect Google Drive' : 'Connect Google Drive'}
              </button>
              <button
                onClick={() => handleCloudConnect('dropbox')}
                className={`btn w-full ${settings.connectedClouds.dropbox ? 'btn-secondary' : 'btn-primary'}`}
              >
                {settings.connectedClouds.dropbox ? 'Disconnect Dropbox' : 'Connect Dropbox'}
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h2>
            <button
              onClick={handleDeleteAccount}
              className="btn btn-danger w-full"
            >
              {isDeleting ? 'Click again to confirm' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 