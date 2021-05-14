const express = require('express');
const { index, register, login, logout, user } = require('../controllers/auth');

const router = express.Router();

router.route('/').get(index);

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/user').get(user);

module.exports = router;
