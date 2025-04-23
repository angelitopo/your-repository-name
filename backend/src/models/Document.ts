import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  embedding: {
    type: [Number],
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  source: {
    type: String,
    enum: ['upload', 'google', 'microsoft', 'dropbox'],
    required: true
  },
  fileId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
documentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Document = mongoose.model('Document', documentSchema); 