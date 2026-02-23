const express = require('express');
const axios   = require('axios');
const cors    = require('cors'); // Added for VST/Browser security
const app     = express();

// Railway provides the PORT variable automatically
const PORT    = process.env.PORT || 8000; 

// Enable CORS so your VST can talk to this server without being blocked
app.use(cors());

const antithesisMap = {
  'house':        'black metal',
  'techno':       'bluegrass',
  'hip hop':      'baroque',
  'jazz':         'death metal',
  'classical':    'drill',
  'metal':        'bossa nova',
  'pop':          'free jazz',
  'ambient':      'crunk',
  'folk':         'industrial',
  'r&b':          'noise rock',
  'drum & bass':  'chamber music',
  'trance':       'delta blues',
};

function getAntithesis(genre) {
  const key = genre.toLowerCase().trim();
  if (antithesisMap[key]) return antithesisMap[key];
  const fallbacks = ['afrobeat', 'cumbia', 'shoegaze', 'ethio-jazz', 'vaporwave', 'flamenco'];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Keep the route as /api/soundcloud to match your JUCE code
app.get('/api/soundcloud', async (req, res) => {
  const genre = (req.query.genre || '').trim();
  if (!genre) return res.status(400).json({ error: 'genre param required' });

  try {
    const antithesisGenre = getAntithesis(genre);

    // Calling Deezer's public API (No Key Required)
    const response = await axios.get('https://api.deezer.com/search', {
      params: {
        q:     antithesisGenre,
        limit: 10,
      },
      timeout: 8000,
    });

    // Map the Deezer data to the format your VST expects
    const results = (response.data.data || []).map(track => ({
      title:    track.title,
      channel:  track.artist.name,
      trackUrl: track.link, // This is used by your C++ to extract the Track ID
    }));

    res.json({ antithesisGenre, results });

  } catch (err) {
    console.error('Deezer error:', err.message);
    res.status(500).json({ error: 'Failed to fetch from Deezer' });
  }
});

// Health check route for your "Open Full UI" button
app.get('/', (req, res) => {
    res.send('<h1>Sonic Shuffle Backend</h1><p>Status: Online</p>');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sonic Shuffle live at port ${PORT}`);
});
