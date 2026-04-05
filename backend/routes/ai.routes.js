const express = require('express');
const router = express.Router();
const { recommendSize } = require('../controllers/ai.controller');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, recommendSize);

module.exports = router;
