import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { Strategy as DropboxStrategy } from 'passport-dropbox-oauth2';
import { User } from '../models/User';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.readonly']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails?.[0]?.value });
    
    if (!user) {
      user = new User({
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        googleToken: accessToken,
        googleRefreshToken: refreshToken
      });
    } else {
      user.googleToken = accessToken;
      user.googleRefreshToken = refreshToken;
    }
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error as Error, undefined);
  }
}));

// Microsoft Strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID || '',
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
  callbackURL: `${process.env.BACKEND_URL}/api/auth/microsoft/callback`,
  scope: ['user.read', 'files.read'],
  tenant: 'common'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails?.[0]?.value });
    
    if (!user) {
      user = new User({
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        microsoftToken: accessToken,
        microsoftRefreshToken: refreshToken
      });
    } else {
      user.microsoftToken = accessToken;
      user.microsoftRefreshToken = refreshToken;
    }
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error as Error, undefined);
  }
}));

// Dropbox Strategy
passport.use(new DropboxStrategy({
  clientID: process.env.DROPBOX_CLIENT_ID || '',
  clientSecret: process.env.DROPBOX_CLIENT_SECRET || '',
  callbackURL: `${process.env.BACKEND_URL}/api/auth/dropbox/callback`,
  scope: ['files.content.read']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails?.[0]?.value });
    
    if (!user) {
      user = new User({
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        dropboxToken: accessToken,
        dropboxRefreshToken: refreshToken
      });
    } else {
      user.dropboxToken = accessToken;
      user.dropboxRefreshToken = refreshToken;
    }
    
    await user.save();
    return done(null, user);
  } catch (error) {
    return done(error as Error, undefined);
  }
})); 