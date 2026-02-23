const express = require('express');
const axios   = require('axios');
const app     = express();
const PORT    = process.env.PORT || 3000;

// ── Expanded antithesis map ───────────────────────────────────────────────────
const antithesisMap = {
  // Electronic
  'house':               ['black metal', 'delta blues', 'appalachian folk', 'byzantine choral'],
  'deep house':          ['thrash metal', 'bluegrass', 'free jazz', 'gregorian chant'],
  'tech house':          ['doom metal', 'country blues', 'afrobeat', 'raw punk'],
  'techno':              ['bluegrass', 'bossa nova', 'baroque classical', 'swamp blues'],
  'minimal techno':      ['death metal', 'gospel', 'cumbia', 'folk punk'],
  'acid techno':         ['chamber music', 'bossa nova', 'celtic folk', 'delta blues'],
  'trance':              ['delta blues', 'black metal', 'afrobeat', 'bluegrass'],
  'progressive trance':  ['sludge metal', 'appalachian folk', 'ethio-jazz', 'zydeco'],
  'psytrance':           ['classic country', 'doom metal', 'free jazz', 'roots reggae'],
  'drum & bass':         ['chamber music', 'flamenco', 'cool jazz', 'orchestral'],
  'liquid dnb':          ['death metal', 'outlaw country', 'gregorian chant', 'afrobeat'],
  'jungle':              ['baroque', 'bossa nova', 'smooth jazz', 'celtic'],
  'dubstep':             ['bossa nova', 'classic soul', 'bluegrass', 'chamber pop'],
  'riddim':              ['orchestral', 'folk', 'cool jazz', 'appalachian'],
  'grime':               ['baroque classical', 'bossa nova', 'flamenco', 'bluegrass'],
  'uk garage':           ['black metal', 'delta blues', 'free jazz', 'ethio-jazz'],
  '2-step':              ['doom metal', 'outlaw country', 'free jazz', 'afrobeat'],
  'breakbeat':           ['baroque', 'classic country', 'smooth jazz', 'orchestral'],
  'electro':             ['country gospel', 'free jazz', 'celtic folk', 'outlaw country'],
  'idm':                 ['classic soul', 'bluegrass', 'flamenco', 'cumbia'],
  'ambient':             ['crunk', 'thrash metal', 'drill', 'death metal'],
  'dark ambient':        ['bubblegum pop', 'bossa nova', 'bluegrass', 'cumbia'],
  'drone':               ['dancehall', 'classic soul', 'bluegrass', 'zydeco'],
  'noise':               ['smooth jazz', 'bossa nova', 'classic country', 'chamber music'],
  'industrial':          ['bossa nova', 'classic country', 'soft jazz', 'chamber pop'],
  'ebm':                 ['classic soul', 'bluegrass', 'flamenco', 'gospel'],
  'synthwave':           ['free jazz', 'delta blues', 'afrobeat', 'outlaw country'],
  'darkwave':            ['dancehall', 'classic soul', 'cumbia', 'afrobeat'],
  'new wave':            ['death metal', 'outlaw country', 'free jazz', 'afrobeat'],
  'chillwave':           ['black metal', 'death metal', 'bluegrass', 'grime'],
  'vaporwave':           ['thrash metal', 'bluegrass', 'afrobeat', 'delta blues'],
  'lo-fi hip hop':       ['thrash metal', 'death metal', 'doom metal', 'black metal'],
  'trip hop':            ['thrash metal', 'black metal', 'bluegrass', 'death metal'],
  'downtempo':           ['crunk', 'drill', 'thrash metal', 'death metal'],
  'big room':            ['delta blues', 'free jazz', 'chamber music', 'outlaw country'],
  'future bass':         ['delta blues', 'doom metal', 'free jazz', 'classic country'],
  'trap':                ['baroque', 'bossa nova', 'flamenco', 'bluegrass'],
  'melodic trap':        ['black metal', 'free jazz', 'delta blues', 'afrobeat'],
  'phonk':               ['bossa nova', 'baroque', 'chamber music', 'smooth jazz'],
  'jersey club':         ['black metal', 'doom metal', 'baroque', 'afrobeat'],
  'chicago footwork':    ['bossa nova', 'smooth jazz', 'chamber music', 'bluegrass'],
  'afrobeats':           ['black metal', 'doom metal', 'thrash metal', 'bluegrass'],
  'afro house':          ['black metal', 'doom metal', 'bluegrass', 'classic country'],
  'amapiano':            ['black metal', 'thrash metal', 'doom metal', 'bluegrass'],
  'baile funk':          ['black metal', 'death metal', 'bluegrass', 'chamber music'],
  'dembow':              ['doom metal', 'black metal', 'bluegrass', 'baroque'],
  // Hip-Hop
  'hip hop':             ['baroque', 'bluegrass', 'flamenco', 'bossa nova'],
  'boom bap':            ['baroque classical', 'flamenco', 'bossa nova', 'chamber music'],
  'cloud rap':           ['thrash metal', 'bluegrass', 'afrobeat', 'delta blues'],
  'conscious hip hop':   ['death metal', 'thrash metal', 'black metal', 'doom metal'],
  'g-funk':              ['black metal', 'baroque', 'chamber music', 'free jazz'],
  'crunk':               ['baroque', 'chamber music', 'bossa nova', 'smooth jazz'],
  'chopped & screwed':   ['bluegrass', 'black metal', 'baroque', 'afrobeat'],
  'drill':               ['baroque', 'bossa nova', 'classical', 'chamber music'],
  'uk drill':            ['bossa nova', 'baroque', 'classical', 'smooth jazz'],
  'brooklyn drill':      ['bossa nova', 'baroque', 'chamber music', 'smooth jazz'],
  'rage rap':            ['bossa nova', 'baroque', 'smooth jazz', 'chamber music'],
  // R&B / Soul
  'r&b':                 ['noise rock', 'black metal', 'death metal', 'thrash metal'],
  'neo soul':            ['death metal', 'black metal', 'thrash metal', 'doom metal'],
  'new jack swing':      ['death metal', 'black metal', 'doom metal', 'free jazz'],
  'funk':                ['black metal', 'death metal', 'doom metal', 'thrash metal'],
  'soul':                ['black metal', 'death metal', 'thrash metal', 'noise rock'],
  'gospel':              ['industrial', 'noise', 'black metal', 'death metal'],
  // Rock
  'rock':                ['amapiano', 'bossa nova', 'afrobeat', 'smooth jazz'],
  'indie rock':          ['amapiano', 'dembow', 'afrobeats', 'cumbia'],
  'alternative rock':    ['amapiano', 'afrobeats', 'bossa nova', 'cumbia'],
  'post rock':           ['crunk', 'dembow', 'jersey club', 'cumbia'],
  'math rock':           ['classic soul', 'dancehall', 'cumbia', 'smooth jazz'],
  'shoegaze':            ['drill', 'afrobeats', 'cumbia', 'dancehall'],
  'dream pop':           ['death metal', 'black metal', 'drill', 'thrash metal'],
  'noise rock':          ['smooth jazz', 'bossa nova', 'classic soul', 'chamber music'],
  'garage rock':         ['bossa nova', 'smooth jazz', 'afrobeat', 'chamber music'],
  'surf rock':           ['black metal', 'death metal', 'doom metal', 'free jazz'],
  'punk':                ['bossa nova', 'smooth jazz', 'chamber music', 'afrobeat'],
  'post punk':           ['bossa nova', 'smooth jazz', 'classic soul', 'dancehall'],
  'hardcore punk':       ['bossa nova', 'smooth jazz', 'chamber music', 'afrobeat'],
  'emo':                 ['dancehall', 'afrobeats', 'cumbia', 'dembow'],
  'pop punk':            ['afrobeats', 'dancehall', 'bossa nova', 'cumbia'],
  // Metal
  'metal':               ['bossa nova', 'smooth jazz', 'classic soul', 'chamber music'],
  'death metal':         ['bossa nova', 'smooth jazz', 'chamber music', 'classic soul'],
  'black metal':         ['house', 'bossa nova', 'smooth jazz', 'classic soul'],
  'doom metal':          ['dancehall', 'bossa nova', 'smooth jazz', 'classic soul'],
  'sludge metal':        ['bossa nova', 'smooth jazz', 'classic soul', 'dancehall'],
  'post metal':          ['bossa nova', 'dancehall', 'classic soul', 'smooth jazz'],
  'djent':               ['classic soul', 'bossa nova', 'smooth jazz', 'dancehall'],
  'thrash metal':        ['bossa nova', 'smooth jazz', 'classic soul', 'chamber music'],
  'nu metal':            ['bossa nova', 'classic soul', 'smooth jazz', 'chamber music'],
  'metalcore':           ['bossa nova', 'smooth jazz', 'classic soul', 'dancehall'],
  // Jazz
  'jazz':                ['death metal', 'black metal', 'thrash metal', 'doom metal'],
  'bebop':               ['death metal', 'thrash metal', 'black metal', 'doom metal'],
  'cool jazz':           ['death metal', 'thrash metal', 'doom metal', 'black metal'],
  'free jazz':           ['pop', 'smooth jazz', 'classic soul', 'dancehall'],
  'fusion':              ['doom metal', 'black metal', 'death metal', 'thrash metal'],
  'modal jazz':          ['death metal', 'thrash metal', 'black metal', 'doom metal'],
  'smooth jazz':         ['death metal', 'black metal', 'doom metal', 'thrash metal'],
  'latin jazz':          ['black metal', 'doom metal', 'death metal', 'thrash metal'],
  'afrobeat':            ['black metal', 'doom metal', 'death metal', 'thrash metal'],
  'ethio-jazz':          ['black metal', 'doom metal', 'death metal', 'thrash metal'],
  // Classical
  'classical':           ['drill', 'crunk', 'trap', 'phonk'],
  'baroque':             ['trap', 'drill', 'crunk', 'phonk'],
  'romantic':            ['drill', 'trap', 'crunk', 'phonk'],
  'minimalist':          ['drill', 'crunk', 'trap', 'phonk'],
  'orchestral':          ['drill', 'trap', 'crunk', 'phonk'],
  'chamber music':       ['drill', 'trap', 'crunk', 'phonk'],
  // Folk / World
  'folk':                ['industrial', 'noise', 'death metal', 'black metal'],
  'indie folk':          ['death metal', 'industrial', 'black metal', 'noise'],
  'bossa nova':          ['black metal', 'death metal', 'thrash metal', 'noise'],
  'flamenco':            ['black metal', 'death metal', 'thrash metal', 'industrial'],
  'cumbia':              ['black metal', 'death metal', 'doom metal', 'industrial'],
  'salsa':               ['black metal', 'death metal', 'doom metal', 'thrash metal'],
  'reggaeton':           ['black metal', 'death metal', 'doom metal', 'free jazz'],
  'dancehall':           ['black metal', 'death metal', 'doom metal', 'thrash metal'],
  'reggae':              ['death metal', 'black metal', 'thrash metal', 'doom metal'],
  'blues':               ['hyperpop', 'vaporwave', 'phonk', 'jersey club'],
  'delta blues':         ['hyperpop', 'vaporwave', 'phonk', 'jersey club'],
  'country':             ['free jazz', 'afrobeat', 'death metal', 'phonk'],
  'bluegrass':           ['techno', 'death metal', 'afrobeats', 'phonk'],
  // Pop
  'pop':                 ['free jazz', 'black metal', 'death metal', 'doom metal'],
  'synth pop':           ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
  'hyperpop':            ['delta blues', 'outlaw country', 'free jazz', 'bluegrass'],
  'k-pop':               ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
  'j-pop':               ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
  'city pop':            ['death metal', 'free jazz', 'doom metal', 'afrobeat'],
};

// Extra search modifiers for variety
const searchModifiers = [
  '', '', '', '', '',  // weighted empty so most searches are clean
  'underground', 'experimental', 'obscure', 'rare', 'classic',
  'essential', 'overlooked', 'deep cut', 'cult', 'independent',
  'best', 'legendary', 'raw', 'lo-fi', 'live', 'early',
  'debut', 'unreleased', 'extended', 'original',
];

function getAntithesis(genre) {
  // Handle comma-separated input — pick the last token as the anchor
  const parts = genre.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const key   = parts[parts.length - 1];

  // Direct match
  if (antithesisMap[key]) {
    const options = antithesisMap[key];
    return options[Math.floor(Math.random() * options.length)];
  }

  // Partial match
  for (const [mapKey, options] of Object.entries(antithesisMap)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return options[Math.floor(Math.random() * options.length)];
    }
  }

  // Large random fallback pool
  const fallbacks = [
    'afrobeat', 'cumbia', 'shoegaze', 'ethio-jazz', 'vaporwave', 'flamenco',
    'bluegrass', 'noise rock', 'dembow', 'psytrance', 'black metal', 'bossa nova',
    'drill', 'free jazz', 'delta blues', 'doom metal', 'baroque', 'dancehall',
    'amapiano', 'hyperpop', 'outlaw country', 'modal jazz', 'zydeco', 'cumbia',
    'celtic folk', 'gregorian chant', 'crunk', 'phonk', 'uk garage', 'sludge metal',
    'smooth jazz', 'classic soul', 'thrash metal', 'afrobeats', 'chamber music',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

app.get('/api/soundcloud', async (req, res) => {
  const genre = (req.query.genre || '').trim();
  if (!genre) return res.status(400).json({ error: 'genre param required' });

  try {
    const antithesisGenre = getAntithesis(genre);

    // Random offset up to 200 + random modifier = genuinely different every call
    const randomOffset = Math.floor(Math.random() * 200);
    const modifier     = searchModifiers[Math.floor(Math.random() * searchModifiers.length)];
    const searchQuery  = modifier ? `${antithesisGenre} ${modifier}` : antithesisGenre;

    const response = await axios.get('https://api.deezer.com/search', {
      params: {
        q:     searchQuery,
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

