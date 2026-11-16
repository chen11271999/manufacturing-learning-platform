const fs = require('fs');
let c = fs.readFileSync('public/js/app.js', 'utf8');
const lines = c.split('\n');
// Fix line 541 (index 540)
const oldLine = lines[540];
console.log('OLD:', oldLine.trim());
// Replace the placeholder with broken quotes using escaped quotes
const newLine = oldLine.replace(
  "placeholder='[{\"en\":\"...\",\"zh\":\"...\",\"ms\":\"...\",\"ex\":\"...\",\"ex_zh\":\"...\"}]'",
  "placeholder=\"[{en:..., zh:..., ms:...}]\""
);
console.log('NEW:', newLine.trim());
lines[540] = newLine;
fs.writeFileSync('public/js/app.js', lines.join('\n'), 'utf8');
console.log('Done');
