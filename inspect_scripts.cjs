const fs = require('fs');
const html = fs.readFileSync('gemini_share.html', 'utf-8');

// Find all JSON-like structures or string literals with interesting content
const regex = /"(https:\/\/[^"]+)"/g;
const links = [];
let m;
while ((m = regex.exec(html)) !== null) {
  links.push(m[1]);
}
console.log('Total links found:', links.length);
const imgLinks = links.filter(l => l.includes('googleusercontent.com') || l.includes('drive.google.com') || l.includes('images'));
console.log('Image/content links:', [...new Set(imgLinks)]);

// Let's also look for script tags that contain jsondata or window.data or cX67Wd
const scriptMatches = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts:', scriptMatches.length);
scriptMatches.forEach((s, idx) => {
  if (s.length > 500) {
    console.log(`Script ${idx} length: ${s.length}, preview: ${s.slice(0, 150)}...`);
  }
});
