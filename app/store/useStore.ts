import { create } from 'zustand'
import { auth, documents, ai } from '../lib/api'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
}

interface Settings {
  email: string
  emailNotifications: boolean
  pushNotifications: boolean
  twoFactorEnabled: boolean
  connectedClouds: {
    googleDrive: boolean
    dropbox: boolean
  }
}

interface Store {
  // Chat state
  messages: Message[]
  addMessage: (content: string, sender: 'user' | 'ai') => void
  sendMessage: (content: string) => Promise<void>
  
  // Documents state
  documents: Document[]
  fetchDocuments: () => Promise<void>
  addDocument: (file: File) => Promise<void>
  deleteDocument: (id: string) => Promise<void>
  searchDocuments: (query: string) => Document[]
  
  // Settings state
  settings: Settings
  fetchSettings: () => Promise<void>
  updateSettings: (settings: Partial<Settings>) => Promise<void>
  connectCloud: (service: 'googleDrive' | 'dropbox') => void
}

export const useStore = create<Store>((set, get) => ({
  // Chat state
  messages: [],
  addMessage: (content, sender) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      sender,
      timestamp: new Date()
    }
    set(state => ({
      messages: [...state.messages, newMessage]
    }))
  },
  sendMessage: async (content) => {
    get().addMessage(content, 'user')
    try {
      const response = await ai.query(content)
      get().addMessage(response.data.response, 'ai')
    } catch (error) {
      get().addMessage('Sorry, there was an error processing your request.', 'ai')
    }
  },

  // Documents state
  documents: [],
  fetchDocuments: async () => {
    try {
      const response = await documents.list()
      set({ documents: response.data })
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  },
  addDocument: async (file) => {
    try {
      const response = await documents.upload(file)
      set(state => ({
        documents: [...state.documents, response.data]
      }))
    } catch (error) {
      console.error('Error uploading document:', error)
    }
  },
  deleteDocument: async (id) => {
    try {
      await documents.delete(id)
      set(state => ({
        documents: state.documents.filter(doc => doc.id !== id)
      }))
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  },
  searchDocuments: (query) => {
    const { documents } = get()
    return documents.filter(doc => 
      doc.name.toLowerCase().includes(query.toLowerCase())
    )
  },

  // Settings state
  settings: {
    email: '',
    emailNotifications: false,
    pushNotifications: false,
    twoFactorEnabled: false,
    connectedClouds: {
      googleDrive: false,
      dropbox: false
    }
  },
  fetchSettings: async () => {
    try {
      const response = await auth.getConnectedServices()
      set(state => ({
        settings: {
          ...state.settings,
          connectedClouds: {
            googleDrive: response.data.google,
            dropbox: response.data.dropbox
          }
        }
      }))
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  },
  updateSettings: async (newSettings) => {
    try {
      // TODO: Implement settings update API
      set(state => ({
        settings: { ...state.settings, ...newSettings }
      }))
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  },
  connectCloud: (service) => {
    if (service === 'googleDrive') {
      auth.loginWithGoogle()
    } else if (service === 'dropbox') {
      auth.loginWithDropbox()
    }
  }
})) 