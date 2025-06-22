const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// Helper to format table data as a string for the prompt
function tableToText(headers, rows) {
  let text = headers.join(' | ') + '\n';
  text += rows.map(row => row.join(' | ')).join('\n');
  return text;
}

router.post('/summarize', async (req, res) => {
  try {
    const { headers, data } = req.body;
    if (!headers || !data) {
      return res.status(400).json({ error: 'Missing headers or data' });
    }

    const tableText = tableToText(headers, data);
    const prompt = `You are an expert data analyst. Summarize the following table in clear, concise English. Highlight key trends, outliers, and any interesting insights.\n\nTable:\n${tableText}`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for data analysis.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const summary = completion.data.choices[0].message.content.trim();
    res.json({ summary });
  } catch (err) {
    console.error('OpenAI summarization error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate summary.' });
  }
});

module.exports = router; 