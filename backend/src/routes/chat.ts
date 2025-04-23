import express from 'express'
import { verifyToken } from '../middleware/security'
import { Document } from '../models/Document'
import axios from 'axios'

export const chatRoutes = express.Router()

chatRoutes.post('/query', verifyToken, async (req, res) => {
  try {
    const { query } = req.body
    if (!query) {
      return res.status(400).json({ error: 'No query provided' })
    }

    // Get user's documents
    const documents = await Document.find({ owner: (req.user as any)._id })
      .select('content embedding')
      .limit(5)

    if (documents.length === 0) {
      return res.status(400).json({ error: 'No documents available for querying' })
    }

    // Call AI service
    const response = await axios.post('http://localhost:8000/api/query', {
      query,
      documents: documents.map(doc => ({
        content: doc.content,
        embedding: doc.embedding
      }))
    }, {
      headers: {
        'Authorization': `Bearer ${req.headers.authorization?.split(' ')[1]}`
      }
    })

    res.json(response.data)
  } catch (error) {
    console.error('Error processing query:', error)
    res.status(500).json({ error: 'Error processing query' })
  }
}) 