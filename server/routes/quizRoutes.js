import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { QuizResult } from '../models/QuizResult.js';

const router = express.Router();

router.post('/save', authenticate, async (req, res) => {
  const { quizType, score } = req.body;

  try {
    const result = new QuizResult({
      user: req.user._id,
      quizType,
      score,
    });

    await result.save();
    res.status(201).json({ message: 'Quiz result saved successfully', result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz result' });
  }
});

router.get('/history', authenticate, async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .select('quizType score createdAt'); // ✅ explicitly include createdAt

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz history' });
  }
});

export default router;
