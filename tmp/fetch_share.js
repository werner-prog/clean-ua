const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetchUrl('https://gemini.google.com/share/caa5caf74945');
  fs.writeFileSync('/tmp/gemini_share.html', html);
  console.log('Saved html length:', html.length);
  
  // Look for text fragments, images, etc.
  const regex = /https:\/\/[^"'\s<>\\]+/g;
  const urls = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    if (m[0].includes('googleusercontent') || m[0].includes('gstatic') || m[0].includes('blob') || m[0].includes('.jpg') || m[0].includes('.png') || m[0].includes('.webp')) {
      urls.push(m[0]);
    }
  }
  console.log('URLs:', [...new Set(urls)].slice(0, 40));
}

run().catch(console.error);
