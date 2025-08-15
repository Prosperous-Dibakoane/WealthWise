const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models'); // Sequelize models

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},

async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    const [user] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        username: profile.displayName,
        email: email,
        password: 'google-oauth'
      }
    });
