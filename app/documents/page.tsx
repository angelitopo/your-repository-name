'use client'

import { useState, useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import { useStore } from '../store/useStore'
import { Upload, Search, Trash2 } from 'lucide-react'

export default function Documents() {
  const { documents, fetchDocuments, addDocument, deleteDocument, searchDocuments } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await addDocument(file)
    } finally {
      setIsUploading(false)
    }
  }

  const filteredDocuments = searchQuery ? searchDocuments(searchQuery) : documents

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Documents</h1>
          <label className="btn btn-primary cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            Upload Document
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
          </label>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="input pl-10 w-full"
          />
        </div>

        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium">{doc.name}</h3>
                <p className="text-sm text-gray-500">
                  {doc.type} • {Math.round(doc.size / 1024)} KB •{' '}
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 