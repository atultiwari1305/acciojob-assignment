const express = require('express');
const axios = require('axios');
const auth = require('../utils/auth');
const router = express.Router();

router.post('/generate', auth, async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const result = response.data.choices[0].message.content;
    res.json({ code: result });
  } catch (error) {
    res.status(500).json({ msg: 'AI generation failed' });
  }
});

module.exports = router;
