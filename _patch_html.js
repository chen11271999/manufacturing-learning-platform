const fs = require('fs');  
let html = fs.readFileSync('D:/AI/P4/public/index.html', 'utf8');  
let lines = html.split('\n');  
let s = -1, e = -1;  
for (let i = 0; i < lines.length; i++) {  
  if (lines[i].includes('Listening Section')) s = i;  
  if (s >= 0 && lines[i].includes('</section>') && i > s) { e = i; break; }  
}  
console.log('Found:', s, e);  
