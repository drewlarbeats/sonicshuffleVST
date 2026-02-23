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
  'house':        'black metal',
  'deep house':   'thrash metal',
  'techno':       'bluegrass',
  'ambient':      'crunk',
  'shoegaze':     'drill',
  'indie rock':   'amapiano',
  'punk':         'bossa nova',
  'soul':         'noise',
  'reggae':       'death metal',
  'blues':        'hyperpop',
  'country':      'free jazz',
  'funk':         'black metal',
  'disco':        'doom metal',
  'gospel':       'industrial',
  'k-pop':        'delta blues',
  'lo-fi':        'thrash metal',
};

function getAntithesis(genre) {
  const key = genre.toLowerCase().trim();
  if (antithesisMap[key]) return antithesisMap[key];
  const fallbacks = ['afrobeat', 'cumbia', 'shoegaze', 'ethio-jazz', 'vaporwave',
                     'flamenco', 'bluegrass', 'noise rock', 'dembow', 'psytrance',
                     'black metal', 'bossa nova', 'drill', 'ambient', 'free jazz'];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

app.get('/api/soundcloud', async (req, res) => {
  const genre = (req.query.genre || '').trim();
  if (!genre) return res.status(400).json({ error: 'genre param required' });

  try {
    const antithesisGenre = getAntithesis(genre);

    // Random offset gives different results every call (Deezer indexes 1000+ tracks per query)
    const randomOffset = Math.floor(Math.random() * 100);

    const response = await axios.get('https://api.deezer.com/search', {
      params: {
        q:     antithesisGenre,
        limit: 10,
        index: randomOffset,
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
