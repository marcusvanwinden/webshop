const sessionSettings = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'webshop.sid',
  unset: 'destroy',
  cookie: {
    maxAge: 1000 * 60 * 60,
    // secure: true // In production
  },
};

const sessionStoreSettings = {
  uri: process.env.DB_URI,
  databaseName: process.env.DB_NAME,
  collection: 'sessions',
};

module.exports = {
  sessionSettings,
  sessionStoreSettings,
};
