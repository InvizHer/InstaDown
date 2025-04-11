const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.post('/api/fetch', async (req, res) => {
  try {
    const { url } = req.body;
    const api = `https://instagram-downloader-api.p.rapidapi.com/index`;
    const response = await axios.get(api, {
      params: { url },
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPID_API_KEY',
        'X-RapidAPI-Host': 'instagram-downloader-api.p.rapidapi.com'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Handle other routes - fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
