import local from "passport-local"

import User from "../models/User.js"

const authHandler = (username, password, done) => {
  User.query()
    .findOne({ username })
    .then((user) => {
      if (user) {
        if (user.authenticate(password)) {
          return done(null, user)
        }

        return done({ invalid: "password credentials" }, false)
      }
      return done({ invalid: "username credentials" }, false)
    })
}

export default new local.Strategy({ usernameField: "username" }, authHandler)
