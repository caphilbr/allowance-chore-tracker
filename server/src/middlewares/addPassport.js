import passport from "passport"
import localStrategy from "../authentication/localPassportStrategy.js"
import googleStrategy from "../authentication/googlePassportStrategy.js"
import deserializeUser from "../authentication/deserializeUser.js"

const addPassport = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}

passport.use(localStrategy)
passport.use(googleStrategy)
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(deserializeUser)
export default addPassport
