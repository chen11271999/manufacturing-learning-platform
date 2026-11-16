const fs = require('fs');
const { execSync } = require('child_process');

const filePath = 'D:\\AI\\P4\\public\\js\\writing.js';
const jsonPath = 'D:\\AI\\P4\\_templates.json';

let content = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let insert = '';
for (const t of data) {
    insert += '    ,\n';
    insert += '    {\n';
    insert += '        title: ' + JSON.stringify(t.title) + ', titleEn: ' + JSON.stringify(t.titleEn) + ',\n';
    insert += '        template: [\n';
    for (let i = 0; i < t.template.length; i++) {
        const p = t.template[i];
        insert += '            { en: ' + JSON.stringify(p.en) + ', zh: ' + JSON.stringify(p.zh) + ' }';
        if (i < t.template.length - 1) insert += ',';
        insert += '\n';
    }
    insert += '        ]\n';
    insert += '    }\n';
}

const closingPattern = /\n\];\n\nconst WRITING_KNOWLEDGE/;
const match = content.match(closingPattern);

if (!match) {
    console.error('Could not find closing bracket pattern');
    process.exit(1);
}

const insertPoint = content.indexOf(match[0]);
const newContent = content.slice(0, insertPoint) + insert + '\n' + content.slice(insertPoint);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Inserted ' + data.length + ' templates. File size: ' + newContent.length + ' bytes');

try {
    execSync('node -c "' + filePath + '"', { stdio: 'pipe' });
    console.log('Syntax check passed!');
} catch (e) {
    console.error('Syntax error:', e.stderr ? e.stderr.toString() : e.message);
    process.exit(1);
}
