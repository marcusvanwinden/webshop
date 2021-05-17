if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const initializeDatabase = require('./utils/mongodb-config');
const {
  sessionOptions,
  sessionStoreOptions,
} = require('./utils/session-config');
const passport = require('passport');
const cors = require('cors');

const app = express();
const store = new MongoDBStore(sessionStoreOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(
  session(
    {
      ...sessionOptions,
      store: store,
    },
    function (error) {
      console.error(error);
    }
  )
);
require('./utils/passport-config')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, 'views'));

app.use('/api/auth', require('./routes/auth'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke' });
});

(async function () {
  await initializeDatabase();
  app.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}`);
  });
})();
