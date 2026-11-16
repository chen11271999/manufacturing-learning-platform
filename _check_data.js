const fs = require('fs');
const c = fs.readFileSync('public/js/vocabulary.js', 'utf8');

// Count vocabulary items
const wordMatches = c.match(/\{ en:/g);
console.log('Total vocabulary items:', wordMatches ? wordMatches.length : 0);

// Find main categories
const lines = c.split('\n');
const categories = [];
let inMainCat = false;
let catName = '';
lines.forEach((l, i) => {
  if (l.match(/^\s{4}[a-z]+:\s*\{$/)) {
    inMainCat = true;
    catName = l.trim().split(':')[0];
  }
  if (inMainCat && l.includes('name:') && !l.includes('subcategories')) {
    const name = l.split(':')[1].trim().replace(/['",]/g, '');
    categories.push({ key: catName, name: name });
    inMainCat = false;
  }
});

console.log('\nMain categories:', categories.length);
categories.forEach(c => console.log(' -', c.key + ':', c.name));

// Check dialogues
const d = fs.readFileSync('public/js/dialogues.js', 'utf8');
const dlgCount = (d.match(/title:/g) || []).length;
console.log('\nTotal dialogues:', dlgCount);

// Check writing templates
const w = fs.readFileSync('public/js/writing.js', 'utf8');
const tmplCount = (w.match(/title:/g) || []).length;
console.log('Total writing templates:', tmplCount);
