const fs = require('fs');
let code = fs.readFileSync('D:/AI/P4/server.js', 'utf8');

// Find the broken section and replace it completely
const lines = code.split('\n');
let fixedLines = [];
let i = 0;

while (i < lines.length) {
    const line = lines[i];
    
    // Check if this is the start of the broken section
    if (line.includes("if (!word.en || !word.zh || !word.ms)")) {
        fixedLines.push(line);
        
        // Add the correct CREATE TABLE with backticks
        fixedLines.push('    ');
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
        fixedLines.push('    ');
        fixedLines.push("    const stmt = db.prepare('INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');");
        fixedLines.push('    const result = stmt.run(category, subcategory, word.en, word.zh, word.ms, word.example || \x27\x27, word.example_zh || \x27\x27, req.user.id);');
        fixedLines.push('    res.json({ id: result.lastInsertRowid, message: \x27Word added successfully\x27 });');
        fixedLines.push('});');
        
        // Skip all the duplicate CREATE TABLE blocks
        i++;
        while (i < lines.length) {
            if (lines[i].includes('db.exec(CREATE TABLE') || 
                lines[i].trim().startsWith('id INTEGER') ||
                lines[i].trim().startsWith('category TEXT') ||
                lines[i].trim().startsWith('subcategory TEXT') ||
                lines[i].trim().startsWith('en TEXT') ||
                lines[i].trim().startsWith('zh TEXT') ||
                lines[i].trim().startsWith('ms TEXT') ||
                lines[i].trim().startsWith('example TEXT') ||
                lines[i].trim().startsWith('example_zh TEXT') ||
                lines[i].trim().startsWith('created_by INTEGER') ||
                lines[i].trim().startsWith('created_at DATETIME') ||
                lines[i].trim().startsWith('FOREIGN KEY') ||
                (lines[i].trim() === '));') ||
                (lines[i].trim() === '')) {
                i++;
                continue;
            }
            // Stop when we hit the next route or closing brace
            break;
        }
        continue;
    }
    
    fixedLines.push(line);
    i++;
}

fs.writeFileSync('D:/AI/P4/server.js', fixedLines.join('\n'), 'utf8');
console.log('Fixed server.js - removed duplicates and added backticks');
