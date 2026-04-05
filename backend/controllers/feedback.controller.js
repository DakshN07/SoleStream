const Feedback = require('../models/Feedback');

// @desc    Add new feedback
// @route   POST /api/v1/feedback
// @access  Private
const addFeedback = async (req, res) => {
  try {
    const { orderId, brand, sizePurchased, fitAccuracy, comfortLevel, trueToSize, comment } = req.body;

    const feedback = new Feedback({
      orderId,
      user: req.user._id,
      brand,
      sizePurchased,
      fitAccuracy,
      comfortLevel,
      trueToSize,
      comment
    });

    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/v1/feedback
// @access  Private/Admin
const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).populate('user', 'id name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addFeedback,
  getFeedback,
};
