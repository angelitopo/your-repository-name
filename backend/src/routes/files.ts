import express from 'express'
import multer from 'multer'
import { verifyToken } from '../middleware/security'
import { Document } from '../models/Document'
import crypto from 'crypto'

export const fileRoutes = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

fileRoutes.post('/upload', 
  verifyToken, 
  upload.single('file'), 
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' })
      }

      const fileId = crypto.randomBytes(16).toString('hex')
      const document = new Document({
        title: req.file.originalname,
        content: req.file.buffer.toString('base64'),
        embedding: [], // Will be updated by AI service
        owner: (req.user as any)._id,
        source: 'upload',
        fileId
      })

      await document.save()
      res.json(document)
    } catch (error) {
      console.error('Error uploading file:', error)
      res.status(500).json({ error: 'Error uploading file' })
    }
  }
)

fileRoutes.get('/list', verifyToken, async (req, res) => {
  try {
    const documents = await Document.find({ owner: (req.user as any)._id })
      .select('-content -embedding')
      .sort({ createdAt: -1 })
    res.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    res.status(500).json({ error: 'Error fetching documents' })
  }
})

fileRoutes.get('/:id', verifyToken, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: (req.user as any)._id
    }).select('-content -embedding')

    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json(document)
  } catch (error) {
    console.error('Error fetching document:', error)
    res.status(500).json({ error: 'Error fetching document' })
  }
})

fileRoutes.delete('/:id', verifyToken, async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({
      _id: req.params.id,
      owner: (req.user as any)._id
    })

    if (!document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json({ message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Error deleting document:', error)
    res.status(500).json({ error: 'Error deleting document' })
  }
}) 