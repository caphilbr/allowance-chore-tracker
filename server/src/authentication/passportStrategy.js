import local from "passport-local";

import User from "../models/User.js";

const authHandler = (name, password, done) => {
  User.query()
    .findOne({ name })
    .then((user) => {
      if (user) {
        if (user.authenticate(password)) {
          return done(null, user);
        }

        return done({ invalid: "password credentials" }, false);
      }
      return done({ invalid: "name credentials" }, false);
    });
};

export default new local.Strategy({ usernameField: "name" }, authHandler);
