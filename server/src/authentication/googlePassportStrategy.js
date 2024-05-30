import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User, Family } from "../models/index.js"
import config from "../config.js"

const authHandler = (accessToken, refreshToken, profile, done) => {
  User.query()
    .findOne({ googleId: profile.id })
    .then((user) => {
      if (user) {
        return done(null, user)
      } else {
        
        Family.query()
          .insert({ name: "default Family name" })
          .then((newFamily) => {
            const newUser = {
              googleId: profile.id,
              username: profile.displayName,
              nickname: profile.displayName,
              email: profile.emails[0].value,
              imageUrl: profile.photos[0].value,
              familyId: newFamily.id,
              isParent: true
            }
            console.log('trying to insert this user ->', newUser)
            User.query()
              .insert(newUser)
              .then((insertedUser) => {
                return done(null, insertedUser)
              })
              .catch((error) => {
                return done(error, false)
              })
          })
      }
    })
    .catch((error) => {
      return done(error, false)
    })
}

export default new GoogleStrategy(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "/api/v1/user-sessions/auth/google/callback",
  },
  authHandler,
)
