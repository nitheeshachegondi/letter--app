const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("googleapis");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Google OAuth2 for user authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// ✅ Google Service Account for Google Drive API
const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(__dirname, "../service-account.json"), // Ensure correct path
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

module.exports = { passport, auth };
