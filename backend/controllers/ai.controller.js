const Feedback = require('../models/Feedback');

// @desc    Get AI Size Recommendation for a brand
// @route   GET /api/v1/recommend-size
// @access  Private
const recommendSize = async (req, res) => {
  try {
    const { brand } = req.query;

    if (!brand) {
      return res.status(400).json({ message: 'Brand query parameter is required' });
    }

    // AI Logic Mock: Look at user's past feedback for this brand
    const pastFeedbacks = await Feedback.find({ user: req.user._id, brand });

    if (pastFeedbacks.length > 0) {
      // Logic: Just use the most recent size they gave a good rating on, or average it.
      // For MVP: Find the average size purchased where Fit Accuracy >= 4
      const validFeedbacks = pastFeedbacks.filter(f => f.fitAccuracy >= 4 || f.trueToSize === 'Yes');
      
      if (validFeedbacks.length > 0) {
        let sum = 0;
        validFeedbacks.forEach(f => sum += f.sizePurchased);
        const recommendedSize = Math.round(sum / validFeedbacks.length);
        
        return res.json({
          recommendedSize,
          confidence: "high"
        });
      }

      // If they left bad feedback for everything in this brand
      const latestFeedback = pastFeedbacks[pastFeedbacks.length - 1];
      let adjustment = 0;
      if (latestFeedback.trueToSize === 'Slightly off') {
         // Assuming if they rated fit poorly, they might need a half size up/down. Mocking +0.5
         adjustment = 0.5;
      } else if (latestFeedback.trueToSize === 'No') {
         adjustment = 1;
      }

      return res.json({
         recommendedSize: latestFeedback.sizePurchased + adjustment,
         confidence: "medium"
      });
    }

    // No past feedback, no rec
    return res.json({
      recommendedSize: null,
      confidence: "none",
      message: "Not enough data to recommend a size for this brand."
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  recommendSize
};
