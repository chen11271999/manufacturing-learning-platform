const fs = require('fs');

const L = [];
L.push('// Extra vocabulary - 280 additional words');
L.push('(function() {');

function addCat(cat, sub, words) {
  L.push('    // ' + cat + '/' + sub + ' - ' + words.length + ' new words');
  L.push('    if (VOCABULARY.' + cat + ' && VOCABULARY.' + cat + '.subcategories.' + sub + ') {');
  L.push('        VOCABULARY.' + cat + '.subcategories.' + sub + '.words.push(');
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const comma = i < words.length - 1 ? ',' : '';
    L.push('            { en: "' + w[0] + '", zh: "' + w[1] + '", ms: "' + w[2] + '", ex: "' + w[3] + '", ex_zh: "' + w[4] + '" }' + comma);
  }
  L.push('        );');
  L.push('    }');
  L.push('');
}

const data = require('./vocab-data.json');
for (const item of data) {
  addCat(item.cat, item.sub, item.words);
}

L.push('})();');

fs.writeFileSync('D:/AI/P4/public/js/vocabulary-extra.js', L.join('\n'), 'utf8');
console.log('Written ' + L.length + ' lines to vocabulary-extra.js');
