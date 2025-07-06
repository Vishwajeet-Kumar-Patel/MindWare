import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices?.[0]?.message?.content || 'Sorry, I could not understand.';
    res.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error.message);
    res.status(500).json({ reply: '⚠️ There was an error processing your request.' });
  }
});

export default router;
