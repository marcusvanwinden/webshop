if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const authRoutes = require('./routes/auth');
const initializeDatabase = require('./database');
const session = require('express-session');

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'webshop.sid',
    unset: 'destroy',
    cookie: {
      maxAge: 1000 * 60 * 10,
      // secure: true // In production
    },
    // store: ''
  })
);

app.use('/auth', authRoutes);

(async () => {
  await initializeDatabase();
  app.listen(8080, () => {
    console.log('Server has started');
  });
})();
