const fs = require('fs');
const path = 'D:/AI/P4/server.js';
let content = fs.readFileSync(path, 'utf8');

// Try multiple possible insertion points
const candidates = [
  '// Use PORT from env for cloud deployment',
  '// Use PORT for cloud deployment',
  'app.listen(PORT'
];

let insertPoint = null;
for (const c of candidates) {
  if (content.includes(c)) { insertPoint = c; break; }
}

if (!insertPoint) {
  console.error('Could not find insertion point');
  console.log('Looking for lines with PORT:');
  content.split('\n').forEach((l, i) => {
    if (l.includes('PORT') || l.includes('listen')) console.log(i + ': ' + l);
  });
  process.exit(1);
}

console.log('Found insertion point: ' + insertPoint);

const newApis = [
  '',
  '// Admin: Get all custom words',
  "app.get('/api/admin/words', authenticateToken, requireAdmin, (req, res) => {",
  '  try {',
  "    const words = db.prepare('SELECT * FROM custom_words ORDER BY created_at DESC').all();",
  '    res.json(words);',
  '  } catch (e) { res.json([]); }',
  '});',
  '',
  '// Admin: Delete a custom word',
  "app.delete('/api/admin/word/:id', authenticateToken, requireAdmin, (req, res) => {",
  '  try {',
  "    db.prepare('DELETE FROM custom_words WHERE id = ?').run(req.params.id);",
  "    res.json({ success: true, message: 'Word deleted' });",
  "  } catch (e) { res.status(500).json({ error: 'Failed to delete word' }); }",
  '});',
  '',
  '// Admin: Upload JSON file (bulk import)',
  "app.post('/api/admin/upload', authenticateToken, requireAdmin, (req, res) => {",
  '  const { type, data, category, subcategory } = req.body;',
  "  if (type === 'words' && Array.isArray(data)) {",
  '    try {',
  "      const stmt = db.prepare('INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');",
  '      let count = 0;',
  '      for (const item of data) {',
  "        stmt.run(category || 'general', subcategory || 'basic', item.en, item.zh, item.ms, item.example || '', item.example_zh || '', req.user.id);",
  '        count++;',
  '      }',
  "      res.json({ message: 'Successfully imported ' + count + ' words' });",
  "    } catch (e) { res.status(500).json({ error: 'Import failed: ' + e.message }); }",
  "  } else { res.status(400).json({ error: 'Invalid upload format' }); }",
  '});',
  '',
  '// Admin: Get all users',
  "app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {",
  '  try {',
  "    const users = db.prepare('SELECT id, username, department, role, created_at FROM users ORDER BY created_at DESC').all();",
  '    res.json(users);',
  "  } catch (e) { res.status(500).json({ error: 'Failed to fetch users' }); }",
  '});',
  ''
].join('\n');

content = content.replace(insertPoint, newApis + '\n' + insertPoint);
fs.writeFileSync(path, content, 'utf8');
console.log('Added 4 admin API endpoints to server.js');
