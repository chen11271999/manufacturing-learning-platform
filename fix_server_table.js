const fs = require('fs');
let code = fs.readFileSync('D:/AI/P4/server.js', 'utf8');

// Find and fix the broken CREATE TABLE statement
const lines = code.split('\n');
let fixedLines = [];
let skipUntilClosing = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is the broken line
    if (line.includes('db.exec(CREATE TABLE IF NOT EXISTS custom_words')) {
        // Replace with correct template literal
        fixedLines.push('    db.exec(\CREATE TABLE IF NOT EXISTS custom_words (');
        fixedLines.push('        id INTEGER PRIMARY KEY AUTOINCREMENT,');
        fixedLines.push('        category TEXT NOT NULL,');
        fixedLines.push('        subcategory TEXT NOT NULL,');
        fixedLines.push('        en TEXT NOT NULL,');
        fixedLines.push('        zh TEXT NOT NULL,');
        fixedLines.push('        ms TEXT NOT NULL,');
        fixedLines.push("        example TEXT DEFAULT '',");
        fixedLines.push("        example_zh TEXT DEFAULT '',");
        fixedLines.push('        created_by INTEGER,');
        fixedLines.push('        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,');
        fixedLines.push('        FOREIGN KEY (created_by) REFERENCES users(id)');
        fixedLines.push('    )\);');
        
        // Skip the next lines until we find the closing ));
        skipUntilClosing = true;
        continue;
    }
    
    // Skip lines until we find the closing
    if (skipUntilClosing) {
        if (line.includes('));')) {
            skipUntilClosing = false;
            continue;
        }
        continue;
    }
    
    fixedLines.push(line);
}

fs.writeFileSync('D:/AI/P4/server.js', fixedLines.join('\n'), 'utf8');
console.log('Fixed CREATE TABLE statement');
