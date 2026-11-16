const fs = require('fs');
let content = fs.readFileSync('D:\\AI\\P4\\public\\js\\writing.js', 'utf8');
const searchStr = 'CAPA Report';
const firstIdx = content.indexOf(searchStr);
const secondIdx = content.indexOf(searchStr, firstIdx + 1);

if (secondIdx === -1) {
    console.log('No duplicate found');
    process.exit(0);
}

console.log('Found duplicate at index:', secondIdx);
const startDup = content.lastIndexOf('    ,', secondIdx);
const endDup = content.indexOf('];\n\nconst WRITING_KNOWLEDGE');

console.log('Removing duplicate from', startDup, 'to', endDup);
const cleaned = content.slice(0, startDup) + '\n' + content.slice(endDup);

fs.writeFileSync('D:\\AI\\P4\\public\\js\\writing.js', cleaned, 'utf8');
console.log('Removed duplicate templates. New size:', cleaned.length);
