const fs = require('fs');

// ===== 1. Fix server.js: CREATE TABLE syntax + admin account =====
let server = fs.readFileSync('D:/AI/P4/server.js', 'utf8');

// Fix CREATE TABLE broken single quotes
server = server.replace(
  "example TEXT DEFAULT ',\n        example_zh TEXT DEFAULT ',",
  "example TEXT DEFAULT '',\n        example_zh TEXT DEFAULT '',"
);

// Fix admin account init: change testuser -> cal, testuser123 -> 1234
server = server.replace(/'testuser'/g, "'cal'");
server = server.replace(/'testuser123'/g, "'1234'");
server = server.replace('testuser / testuser123', 'cal / 1234');
server = server.replace('[Init] Admin account created: cal / 1234', '[Init] Admin account created: cal / 1234');

fs.writeFileSync('D:/AI/P4/server.js', server, 'utf8');
console.log('1. server.js fixed (CREATE TABLE + admin cal/1234)');

// ===== 2. Fix app.js: remove phonetic/initial hints from listening =====
let app = fs.readFileSync('D:/AI/P4/public/js/app.js', 'utf8');
const appLines = app.split('\n');

// Find nextListeningWord and replace it
let nlwStart = -1, nlwEnd = -1;
for (let i = 0; i < appLines.length; i++) {
  if (appLines[i].includes('function nextListeningWord')) {
    nlwStart = i;
    let braces = 0;
    for (let j = i; j < appLines.length; j++) {
      braces += (appLines[j].match(/\{/g) || []).length;
      braces -= (appLines[j].match(/\}/g) || []).length;
      if (braces === 0 && j > i) { nlwEnd = j + 1; break; }
    }
    break;
  }
}

const newNextListeningWord = [
  'function nextListeningWord() {',
  '    if (listeningWords.length === 0) return;',
  '    listeningIndex = (listeningIndex + 1) % listeningWords.length;',
  '    currentWord = listeningWords[listeningIndex];',
  '    listeningAttempts = 0;',
  '',
  "    var display = document.getElementById('listeningWord');",
  "    display.innerHTML = '<div style=\"font-size:22px;margin-bottom:10px\">\uD83C\uDFA7 听发音，拼写单词</div>';",
  '',
  "    document.getElementById('listeningMeaning').textContent = '\u4E2D\u6587\uFF1A' + currentWord.zh;",
  '',
  "    var inp = document.getElementById('listeningAnswer');",
  "    inp.value = ''; inp.disabled = false; inp.focus();",
  "    inp.style.borderColor = '#e9ecef';",
  '',
  "    document.getElementById('listeningFeedback').innerHTML = '';",
  "    document.getElementById('listeningAttempt').textContent = '\u7B2C 1 \u6B21\u673A\u4F1A\uFF08\u51712\u6B21\uFF09';",
  '',
  '    speak(currentWord.en);',
  '}'
];

appLines.splice(nlwStart, nlwEnd - nlwStart, ...newNextListeningWord);
app = appLines.join('\n');

// Also remove getInitials from display in the word display area
// Update index.html word-display to remove initials display
let html = fs.readFileSync('D:/AI/P4/public/index.html', 'utf8');

// Simplify word-display: no more initials/phonetic hints, just a clean area
html = html.replace(
  '<div class="word-display" id="listeningWord" style="font-size:48px;margin:30px 0;letter-spacing:8px;font-family:monospace">\u70B9\u51FB\u201C\u5F00\u59CB\u8BAD\u7EC3\u201D\u6309\u94AE</div>',
  '<div class="word-display" id="listeningWord" style="margin:20px 0;min-height:60px">\u70B9\u51FB\u201C\u5F00\u59CB\u8BAD\u7EC3\u201D\u6309\u94AE</div>'
);

fs.writeFileSync('D:/AI/P4/public/js/app.js', app, 'utf8');
console.log('2. app.js fixed (removed phonetic/initial hints from listening)');

fs.writeFileSync('D:/AI/P4/public/index.html', html, 'utf8');
console.log('3. index.html fixed (simplified word display area)');

// ===== 4. Update database: set cal as admin with password 1234 =====
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const db = new Database('D:/AI/P4/data/learning.db');

// Set cal as admin with password 1234
const calUser = db.prepare('SELECT id FROM users WHERE username = ?').get('cal');
if (calUser) {
  const hashed = bcrypt.hashSync('1234', 10);
  db.prepare('UPDATE users SET password = ?, role = ? WHERE username = ?').run(hashed, 'admin', 'cal');
  console.log('4. Database: cal set as admin with password 1234');
} else {
  const hashed = bcrypt.hashSync('1234', 10);
  db.prepare('INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)').run('cal', hashed, 'Admin', 'admin');
  console.log('4. Database: cal created as admin with password 1234');
}

// ===== 5. Fix custom_words table if it has broken schema =====
try {
  db.exec("CREATE TABLE IF NOT EXISTS custom_words (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, subcategory TEXT NOT NULL, en TEXT NOT NULL, zh TEXT NOT NULL, ms TEXT NOT NULL, example TEXT DEFAULT '', example_zh TEXT DEFAULT '', created_by INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (created_by) REFERENCES users(id))");
  console.log('5. custom_words table ensured');
} catch(e) {
  console.log('5. custom_words table error:', e.message);
}

db.close();
console.log('\nAll 5 fixes applied successfully!');
