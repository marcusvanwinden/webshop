const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');

exports.index = function (req, res) {
  return res.render('forms');
};

exports.register = async function (req, res, next) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, hashedPassword);

    return res.status(201).json({
      _id: user.insertedId,
      username: username,
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async function (req, res, next) {
  passport.authenticate('local', function (error, user, info) {
    if (error) return next(error);

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.logIn(user, function (error) {
      if (error) return next(error);

      return res.json({
        _id: user._id,
        username: user.username,
      });
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();

  return res.status(204).end();
};

exports.user = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Must be signed in' });
  } else {
    return res.json({
      _id: req.user._id,
      username: req.user.username,
    });
  }
};
