const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.getUserByUsername(username, async function (err, user) {
        if (err) return done(err);

        if (!user) return done(null, false);

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    })
  );
  passport.serializeUser(function (user, done) {
    return done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
      return done(err, user);
    });
  });
};
