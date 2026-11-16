const fs = require('fs');
let code = fs.readFileSync('D:/AI/P4/server.js', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('CREATE TABLE IF NOT EXISTS custom_words')) {
        lines[i] = '            db.exec(\CREATE TABLE IF NOT EXISTS custom_words (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, subcategory TEXT NOT NULL, en TEXT NOT NULL, zh TEXT NOT NULL, ms TEXT NOT NULL, example TEXT DEFAULT \'\', example_zh TEXT DEFAULT \'\', created_by INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)\);';
    }
}

fs.writeFileSync('D:/AI/P4/server.js', lines.join('\n'), 'utf8');
console.log('Fixed server.js line 358');
