const fs = require('fs');
const html = fs.readFileSync('gemini_share.html', 'utf-8');

const imMatch = html.match(/<script type="importmap"[^>]*>([\s\S]*?)<\/script>/);
if (imMatch) {
  const im = JSON.parse(imMatch[1]);
  console.log('Import map keys:', Object.keys(im.imports));
  for (const [k, v] of Object.entries(im.imports)) {
    if (k.toLowerCase().includes('share') || k.toLowerCase().includes('chat') || k.toLowerCase().includes('main') || k.toLowerCase().includes('app') || k.toLowerCase().includes('gallery') || k.toLowerCase().includes('document')) {
      console.log(k, '->', v);
    }
  }
}
