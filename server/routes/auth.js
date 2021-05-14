const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
  res.send('Login');
});

router.get('/register', (req, res) => {
  res.send('Register');
});

router.get('/user', (req, res) => {
  res.send('User');
});

module.exports = router;
