if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const authRoutes = require('./routes/auth');
const initializeDatabase = require('./database');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { sessionSettings, sessionStoreSettings } = require('./utils/session');

const app = express();
const store = new MongoDBStore(sessionStoreSettings);
app.use(
  session(
    {
      ...sessionSettings,
      store: store,
    },
    (error) => {
      console.error(error);
    }
  )
);

app.use('/auth', authRoutes);

(async () => {
  await initializeDatabase();
  app.listen(8080, () => {
    console.log('Server has started');
  });
})();
