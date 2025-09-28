// In /server/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerAdmin, login, logout, getMe } = require('../controllers/auth');

router.post('/register-admin', registerAdmin);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', getMe);

module.exports = router;