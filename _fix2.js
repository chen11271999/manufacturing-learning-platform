const fs = require('fs');
let c = fs.readFileSync('public/js/app.js', 'utf8');

// Fix: replace the problematic placeholder with an escaped version
c = c.replace(
  /placeholder='\[\{"en":"\.\.\.","zh":"\.\.\.","ms":"\.\.\.","ex":"\.\.\.","ex_zh":"\.\.\."\}\]'/g,
  'placeholder=\\"[{en:...; zh:...; ms:...}]\\"'
);

fs.writeFileSync('public/js/app.js', c, 'utf8');
console.log('Fixed placeholder syntax');
