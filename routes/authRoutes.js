const express = require('express');
const { register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // 토큰 검증 미들웨어

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;