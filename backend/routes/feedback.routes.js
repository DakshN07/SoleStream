const express = require('express');
const router = express.Router();
const { addFeedback, getFeedback } = require('../controllers/feedback.controller');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addFeedback).get(protect, admin, getFeedback);

module.exports = router;
