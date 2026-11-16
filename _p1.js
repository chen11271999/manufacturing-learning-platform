const fs = require('fs');
const f = 'D:/AI/P4/public/index.html';
let lines = fs.readFileSync(f, 'utf8').split('\n');
let s = -1, e = -1;
for (let i=0; i<lines.length; i++) {
  if (lines[i].includes('<!-- Listening Section -->')) s = i;
  if (s >= 0 && lines[i].includes('</section>') && i> s) { e = i; break; }
}
console.log('start',s,'end',e);
