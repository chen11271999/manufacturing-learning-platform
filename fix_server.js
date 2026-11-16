const fs = require('fs');
const server = fs.readFileSync('D:/AI/P4/server.js', 'utf8');
const lines = server.split('\n');

// Find the spot before "// SPA fallback" to insert new code
let insertAt = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// SPA fallback')) { insertAt = i; break; }
}
console.log('Inserting before line', insertAt+1);

const newCode = [
  '',
  '// === Admin account initialization ===',
  '(function ensureAdminAccount() {',
  '    try {',
  '        const existing = db.prepare(\'SELECT id FROM users WHERE username = ?\').get(\'testuser\');',
  '        if (!existing) {',
  '            const bcrypt = require(\'bcryptjs\');',
  '            const hashedPassword = bcrypt.hashSync(\'testuser123\', 10);',
  '            db.prepare(\'INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)\')',
  '                .run(\'testuser\', hashedPassword, \'Admin\', \'admin\');',
  '            console.log(\'[Init] Admin account created: testuser / testuser123\');',
  '        } else {',
  '            // Ensure the account has admin role',
  '            db.prepare(\'UPDATE users SET role = ? WHERE username = ? AND role != ?\').run(\'admin\', \'testuser\', \'admin\');',
  '        }',
  '    } catch (e) { console.error(\'[Init] Admin account error:\', e.message); }',
  '})();',
  '',
  '// === Admin: Delete custom word ===',
  'app.delete(\'/api/admin/word/:id\', authenticateToken, requireAdmin, (req, res) => {',
  '    const { id } = req.params;',
  '    try {',
  '        db.prepare(\'DELETE FROM custom_words WHERE id = ?\').run(id);',
  '        res.json({ success: true, message: \'Word deleted\' });',
  '    } catch (e) { res.status(500).json({ error: \'Delete failed\' }); }',
  '});',
  '',
  '// === Admin: Get all custom words for management ===',
  'app.get(\'/api/admin/words\', authenticateToken, requireAdmin, (req, res) => {',
  '    try {',
  '        const words = db.prepare(\'SELECT * FROM custom_words ORDER BY created_at DESC\').all();',
  '        res.json(words);',
  '    } catch (e) { res.json([]); }',
  '});',
  '',
  '// === Admin: Upload JSON file for bulk import ===',
  'app.post(\'/api/admin/upload\', authenticateToken, requireAdmin, (req, res) => {',
  '    const { type, category, subcategory, data } = req.body;',
  '    if (!data || !Array.isArray(data)) return res.status(400).json({ error: \'Invalid data\' });',
  '    ',
  '    try {',
  '        if (type === \'words\') {',
  '            db.exec(\'CREATE TABLE IF NOT EXISTS custom_words (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT NOT NULL, subcategory TEXT NOT NULL, en TEXT NOT NULL, zh TEXT NOT NULL, ms TEXT NOT NULL, example TEXT DEFAULT \'\', example_zh TEXT DEFAULT \'\', created_by INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)\');',
  '            const stmt = db.prepare(\'INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)\');',
  '            const insertMany = db.transaction((items) => {',
  '                for (const w of items) {',
  '                    stmt.run(category || \'quality\', subcategory || \'basic\', w.en || \'\', w.zh || \'\', w.ms || \'\', w.ex || \'\', w.ex_zh || \'\', req.user.id);',
  '                }',
  '            });',
  '            insertMany(data);',
  '            res.json({ success: true, message: \'Successfully imported \' + data.length + \' words\' });',
  '        } else {',
  '            res.status(400).json({ error: \'Unsupported type: \' + type });',
  '        }',
  '    } catch (e) {',
  '        res.status(500).json({ error: \'Import failed: \' + e.message });',
  '    }',
  '});',
  '',
  '// === Admin: Get all users ===',
  'app.get(\'/api/admin/users\', authenticateToken, requireAdmin, (req, res) => {',
  '    try {',
  '        const users = db.prepare(\'SELECT id, username, department, role, created_at FROM users ORDER BY created_at DESC\').all();',
  '        res.json(users);',
  '    } catch (e) { res.json([]); }',
  '});',
  '',
];

const newLines = lines.slice(0, insertAt).concat(newCode).concat(lines.slice(insertAt));
fs.writeFileSync('D:/AI/P4/server.js', newLines.join('\n'), 'utf8');
console.log('✅ server.js updated with admin APIs');