const express = require('express');
const axios   = require('axios');
const app     = express();
const PORT    = process.env.PORT || 3000;

const antithesisMap = {
 module.exports = {
  // Electronic / Dance
  'house':                ['black metal', 'delta blues', 'bluegrass', 'free jazz'],
  'deep house':           ['thrash metal', 'bluegrass', 'free jazz', 'flamenco'],
  'tech house':           ['doom metal', 'blues', 'afrobeat', 'punk'],
  'techno':               ['bluegrass', 'bossa nova', 'baroque', 'blues'],
  'minimal techno':       ['death metal', 'gospel', 'cumbia', 'folk'],
  'acid techno':          ['chamber music', 'bossa nova', 'folk', 'blues'],
  'trance':               ['delta blues', 'black metal', 'afrobeat', 'bluegrass'],
  'progressive trance':   ['sludge metal', 'folk', 'ethio jazz', 'blues'],
  'psytrance':            ['country', 'doom metal', 'free jazz', 'reggae'],
  'drum and bass':        ['chamber music', 'flamenco', 'cool jazz', 'orchestral'],
  'dubstep':              ['bossa nova', 'soul', 'bluegrass', 'jazz'],
  'grime':                ['classical', 'bossa nova', 'flamenco', 'bluegrass'],
  'uk garage':            ['black metal', 'blues', 'free jazz', 'jazz'],
  'breakbeat':            ['baroque', 'country', 'smooth jazz', 'classical'],
  'electro':              ['country', 'jazz', 'folk', 'blues'],
  'hardstyle':            ['chamber music', 'cool jazz', 'folk', 'minimalism'],
  'gabber':               ['ambient', 'dub', 'cool jazz', 'bossa nova'],
  'breakcore':            ['minimalism', 'cool jazz', 'ambient', 'dub'],
  'eurodance':            ['delta blues', 'post rock', 'dark ambient', 'folk'],

  // Experimental / Abstract
  'idm':                  ['soul', 'bluegrass', 'flamenco', 'cumbia'],
  'ambient':              ['rap', 'thrash metal', 'drill', 'death metal'],
  'dark ambient':         ['pop', 'bossa nova', 'bluegrass', 'cumbia'],
  'drone':                ['dancehall', 'soul', 'bluegrass', 'cumbia'],
  'noise':                ['smooth jazz', 'bossa nova', 'country', 'jazz'],
  'industrial':           ['bossa nova', 'country', 'jazz', 'pop'],
  'power electronics':    ['bossa nova', 'yacht rock', 'doo-wop', 'ambient'],
  'glitch':               ['folk', 'chamber music', 'delta blues', 'baroque'],

  // Vapor / Wave
  'synthwave':            ['free jazz', 'blues', 'afrobeat', 'country'],
  'darkwave':             ['dancehall', 'soul', 'cumbia', 'afrobeat'],
  'new wave':             ['death metal', 'country', 'free jazz', 'afrobeat'],
  'vaporwave':            ['thrash metal', 'bluegrass', 'afrobeat', 'blues'],
  'city pop':             ['death metal', 'free jazz', 'doom metal', 'afrobeat'],

  // Hip-Hop / Urban
  'hip hop':              ['baroque', 'bluegrass', 'flamenco', 'bossa nova'],
  'lo-fi hip hop':        ['thrash metal', 'death metal', 'doom metal', 'black metal'],
  'trip hop':             ['thrash metal', 'black metal', 'bluegrass', 'death metal'],
  'downtempo':            ['rap', 'drill', 'thrash metal', 'death metal'],
  'future bass':          ['blues', 'doom metal', 'free jazz', 'country'],
  'trap':                 ['baroque', 'bossa nova', 'flamenco', 'bluegrass'],
  'drill':                ['baroque', 'bossa nova', 'classical', 'jazz'],
  'phonk':                ['bossa nova', 'baroque', 'jazz', 'smooth jazz'],
  'cloud rap':            ['thrash metal', 'bluegrass', 'afrobeat', 'blues'],
  'conscious hip hop':    ['death metal', 'thrash metal', 'black metal', 'doom metal'],
  'g-funk':               ['black metal', 'baroque', 'jazz', 'free jazz'],
  'crunk':                ['baroque', 'jazz', 'bossa nova', 'smooth jazz'],
  'horrorcore':           ['gospel', 'bossa nova', 'yacht rock', 'city pop'],

  // R&B / Soul / Funk
  'r&b':                  ['black metal', 'death metal', 'thrash metal', 'doom metal'],
  'neo soul':             ['death metal', 'black metal', 'thrash metal', 'doom metal'],
  'soul':                 ['black metal', 'death metal', 'thrash metal', 'metal'],
  'funk':                 ['black metal', 'death metal', 'doom metal', 'thrash metal'],
  'gospel':               ['industrial', 'black metal', 'death metal', 'metal'],
  'disco':                ['doom metal', 'black metal', 'death metal', 'thrash metal'],

  // Rock / Punk
  'rock':                 ['afrobeat', 'bossa nova', 'smooth jazz', 'cumbia'],
  'indie rock':           ['afrobeats', 'bossa nova', 'cumbia', 'dancehall'],
  'alternative rock':     ['afrobeats', 'bossa nova', 'cumbia', 'reggae'],
  'post rock':            ['rap', 'dancehall', 'cumbia', 'afrobeat'],
  'shoegaze':             ['drill', 'afrobeats', 'cumbia', 'dancehall'],
  'noise rock':           ['smooth jazz', 'bossa nova', 'soul', 'jazz'],
  'garage rock':          ['bossa nova', 'smooth jazz', 'afrobeat', 'jazz'],
  'punk':                 ['bossa nova', 'smooth jazz', 'jazz', 'afrobeat'],
  'post punk':            ['bossa nova', 'smooth jazz', 'soul', 'dancehall'],
  'hardcore punk':        ['bossa nova', 'smooth jazz', 'jazz', 'afrobeat'],
  'pop punk':             ['afrobeats', 'dancehall', 'bossa nova', 'cumbia'],
  'emo':                  ['dancehall', 'afrobeats', 'cumbia', 'reggaeton'],
  'math rock':            ['drone', 'vaporwave', 'punk', 'disco'],
  'skate punk':           ['baroque', 'chamber music', 'dark ambient', 'cool jazz'],

  // Metal
  'metal':                ['bossa nova', 'smooth jazz', 'soul', 'jazz'],
  'death metal':          ['bossa nova', 'smooth jazz', 'jazz', 'soul'],
  'black metal':          ['house', 'bossa nova', 'smooth jazz', 'soul'],
  'doom metal':           ['dancehall', 'bossa nova', 'smooth jazz', 'soul'],
  'thrash metal':         ['bossa nova', 'smooth jazz', 'soul', 'jazz'],
  'metalcore':            ['bossa nova', 'smooth jazz', 'soul', 'dancehall'],
  'grindcore':            ['ambient', 'smooth jazz', 'new age', 'classical'],
  'sludge metal':         ['hyperpop', 'eurodance', 'j-pop', 'synth pop'],
  'crust punk':           ['city pop', 'baroque', 'smooth jazz', 'k-pop'],

  // Jazz
  'jazz':                 ['death metal', 'black metal', 'thrash metal', 'doom metal'],
  'bebop':                ['death metal', 'thrash metal', 'black metal', 'doom metal'],
  'cool jazz':            ['death metal', 'thrash metal', 'doom metal', 'rap'],
  'free jazz':            ['pop', 'smooth jazz', 'soul', 'dancehall'],
  'smooth jazz':          ['death metal', 'black metal', 'doom metal', 'thrash metal'],
  'afrobeat':             ['black metal', 'doom metal', 'death metal', 'thrash metal'],

  // Classical / Formal
  'classical':            ['drill', 'rap', 'trap', 'phonk'],
  'baroque':              ['trap', 'drill', 'rap', 'phonk'],
  'orchestral':           ['drill', 'trap', 'rap', 'phonk'],
  'opera':                ['rap', 'trap', 'drill', 'metal'],
  'chamber music':        ['grindcore', 'acid techno', 'dubstep', 'hardcore punk'],

  // Folk / Global / World
  'folk':                 ['death metal', 'black metal', 'industrial', 'metal'],
  'indie folk':           ['death metal', 'black metal', 'metal', 'industrial'],
  'bossa nova':           ['black metal', 'death metal', 'thrash metal', 'metal'],
  'flamenco':             ['black metal', 'death metal', 'thrash metal', 'industrial'],
  'cumbia':               ['black metal', 'death metal', 'doom metal', 'metal'],
  'salsa':                ['black metal', 'death metal', 'doom metal', 'thrash metal'],
  'reggaeton':            ['black metal', 'death metal', 'doom metal', 'free jazz'],
  'dancehall':            ['black metal', 'death metal', 'doom metal', 'thrash metal'],
  'reggae':               ['death metal', 'black metal', 'thrash metal', 'doom metal'],
  'highlife':             ['black metal', 'doom metal', 'shoegaze', 'industrial'],
  'tango':                ['drum and bass', 'breakcore', 'acid techno', 'noise'],

  // Roots / Traditional
  'blues':                ['pop', 'rap', 'phonk', 'trap'],
  'delta blues':          ['pop', 'rap', 'phonk', 'trap'],
  'country':              ['free jazz', 'afrobeat', 'death metal', 'phonk'],
  'bluegrass':            ['techno', 'death metal', 'afrobeats', 'trap'],

  // Pop
  'pop':                  ['free jazz', 'black metal', 'death metal', 'doom metal'],
  'synth pop':            ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
  'hyperpop':             ['blues', 'country', 'free jazz', 'bluegrass'],
  'k-pop':                ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
  'j-pop':                ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
  'bubblegum pop':        ['black metal', 'noise', 'doom metal', 'industrial'],
  'yacht rock':           ['crust punk', 'death metal', 'grime', 'industrial'],
  'boy band':             ['power electronics', 'sludge metal', 'free jazz', 'noise'],
  'new age':              ['grindcore', 'drill', 'industrial', 'death metal']
};
const searchModifiers = [
  '', '', '', '', '',
  'underground', 'experimental', 'classic', 'essential',
  'best', 'legendary', 'raw', 'live', 'original',
];

function getAntithesis(genre) {
  const parts = genre.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const key   = parts[parts.length - 1];

  if (antithesisMap[key]) {
    const options = antithesisMap[key];
    return options[Math.floor(Math.random() * options.length)];
  }

  for (const [mapKey, options] of Object.entries(antithesisMap)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return options[Math.floor(Math.random() * options.length)];
    }
  }

  const fallbacks = [
    'afrobeat', 'cumbia', 'flamenco', 'jazz', 'blues',
    'bluegrass', 'bossa nova', 'black metal', 'death metal',
    'free jazz', 'soul', 'dancehall', 'reggae', 'country',
    'classical', 'thrash metal', 'doom metal', 'afrobeats',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

app.get('/api/soundcloud', async (req, res) => {
  const genre = (req.query.genre || '').trim();
  if (!genre) return res.status(400).json({ error: 'genre param required' });

  try {
    const antithesisGenre = getAntithesis(genre);
    const randomOffset    = Math.floor(Math.random() * 200);
    const modifier        = searchModifiers[Math.floor(Math.random() * searchModifiers.length)];
    const searchQuery     = modifier ? `${antithesisGenre} ${modifier}` : antithesisGenre;

    const response = await axios.get('https://api.deezer.com/search', {
      params: { q: searchQuery, limit: 10, index: randomOffset },
      timeout: 8000,
    });

    const results = (response.data.data || []).map(track => ({
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


