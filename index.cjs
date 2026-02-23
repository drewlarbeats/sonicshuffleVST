const express = require('express');
const axios   = require('axios');
const app     = express();
const PORT    = process.env.PORT || 3000;

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

app.get('/api/soundcloud', async (req, res) => {
  const genre = (req.query.genre || '').trim();
  if (!genre) return res.status(400).json({ error: 'genre param required' });

  try {
    const antithesisGenre = getAntithesis(genre);

    const response = await axios.get('https://api.deezer.com/search', {
      params: {
        q:     antithesisGenre,
        limit: 10,
      },
      timeout: 8000,
    });

    const results = response.data.data.map(track => ({
      title:    track.title,
      channel:  track.artist.name,
      trackUrl: track.link,
    }));

    res.json({ antithesisGenre, results });

  } catch (err) {
    console.error('Deezer error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('Sonic Shuffle backend running'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));