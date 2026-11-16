const fs = require('fs');
const c = fs.readFileSync('public/js/app.js', 'utf8');
const lines = c.split('\n');
console.log('Total lines:', lines.length);
// Find the line with 'adminBulk' and 'placeholder'
lines.forEach((line, i) => {
  if (line.includes('adminBulk') && line.includes('placeholder')) {
    console.log('Found at line', i+1, ':');
    console.log(line);
  }
});
