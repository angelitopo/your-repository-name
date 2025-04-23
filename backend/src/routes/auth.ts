import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authRoutes = express.Router();

// Google OAuth
authRoutes.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.readonly'] })
);

authRoutes.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: (req.user as any)._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Microsoft OAuth
authRoutes.get('/microsoft',
  passport.authenticate('microsoft', { scope: ['user.read', 'files.read'] })
);

authRoutes.get('/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: (req.user as any)._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Dropbox OAuth
authRoutes.get('/dropbox',
  passport.authenticate('dropbox', { scope: ['files.content.read'] })
);

authRoutes.get('/dropbox/callback',
  passport.authenticate('dropbox', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: (req.user as any)._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// Get connected services
authRoutes.get('/services', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const user = await User.findById(decoded.userId);
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      google: !!user.googleToken,
      microsoft: !!user.microsoftToken,
      dropbox: !!user.dropboxToken
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching connected services' });
  }
}); 