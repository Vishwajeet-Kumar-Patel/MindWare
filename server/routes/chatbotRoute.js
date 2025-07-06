import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res.status(400).json({ reply: '⚠️ No message received.' });

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 🧠 Log the full OpenRouter response
    console.log('🔁 OpenRouter response:', JSON.stringify(response.data, null, 2));

    // ✅ Robust check for valid reply
    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0 &&
      response.data.choices[0].message &&
      response.data.choices[0].message.content
    ) {
      return res.json({ reply: response.data.choices[0].message.content });
    }

    // If no valid reply was returned
    return res.status(500).json({
      reply: '⚠️ Received an unexpected response from MindBot. Try again later.',
    });
  } catch (error) {
    console.error('🧠 MindBot error:', error.response?.data || error.message);
    return res.status(500).json({
      reply: '⚠️ MindBot is facing issues reaching OpenRouter. Try again later.',
    });
  }
});

export default router;
