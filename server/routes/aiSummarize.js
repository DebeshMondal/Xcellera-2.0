const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Mock summary response for development/demo purposes
    res.json({ summary: "This is a mock summary. The AI feature will be available when an API key is added. stay tuned for updates." });
    // --- To re-enable OpenAI, restore the code below ---
    /*
    const tableText = tableToText(headers, data);
    const prompt = `You are an expert data analyst. Summarize the following table in clear, concise English. Highlight key trends, outliers, and any interesting insights.\n\nTable:\n${tableText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for data analysis.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content.trim();
    res.json({ summary });
    */
  } catch (err) {
    console.error('OpenAI summarization error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate summary.' });
  }
});

module.exports = router; 