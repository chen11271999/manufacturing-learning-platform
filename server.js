const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();
// PORT from env or default

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database setup
// Ensure data directory exists
const fs = require('fs');
if (!fs.existsSync('data')) fs.mkdirSync('data', { recursive: true });
const db = new Database('data/learning.db');
db.pragma('journal_mode = WAL');

// Database migration: ensure role column exists
try {
  const columns = db.prepare("PRAGMA table_info(users)").all();
  const hasRole = columns.some(c => c.name === 'role');
  if (!hasRole) {
    console.log('[Migration] Adding role column...');
    db.exec("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
  }
} catch (e) {
  console.error('[Migration] Error:', e.message);
}

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    department TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS learning_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    word_id TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    review_count INTEGER DEFAULT 0,
    last_reviewed DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS daily_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    words_learned INTEGER DEFAULT 0,
    dialogues_completed INTEGER DEFAULT 0,
    listening_correct INTEGER DEFAULT 0,
    malay_exercises INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    UNIQUE(user_id, date),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'manufacturing-learning-2024';

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, department } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // First registered user becomes admin
    const userCount = db.prepare('SELECT COUNT(*) as cnt FROM users').get();
    const role = userCount.cnt === 0 ? 'admin' : 'user';
    const stmt = db.prepare('INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)');
    const result = stmt.run(username, hashedPassword, department || '', role);
    
    const userId = Number(result.lastInsertRowid);
    const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: userId, username, department, role } });
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed: ' + error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: Number(user.id), username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user.id, username: user.username, department: user.department, role: user.role || 'user' } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token
app.get('/api/verify', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, username, department, role FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ valid: true, user: { id: user.id, username: user.username, department: user.department, role: user.role || 'user' } });
  } catch (e) {
    console.error('Verify error:', e);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Update daily activity
app.post('/api/activity', authenticateToken, (req, res) => {
  const { words_learned, dialogues_completed, listening_correct, malay_exercises } = req.body;
  const today = new Date().toISOString().split('T')[0];
  
  // Scoring rules: vocab +1, listening first-correct +2, others +0
    const points = (words_learned || 0) * 1 + 
                 (listening_correct || 0) * 2;
  
  const stmt = db.prepare(`
    INSERT INTO daily_activity (user_id, date, words_learned, dialogues_completed, listening_correct, malay_exercises, points)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, date) DO UPDATE SET
      words_learned = words_learned + ?,
      dialogues_completed = dialogues_completed + ?,
      listening_correct = listening_correct + ?,
      malay_exercises = malay_exercises + ?,
      points = points + ?
  `);
  
  stmt.run(req.user.id, today, words_learned || 0, dialogues_completed || 0, 
           listening_correct || 0, malay_exercises || 0, points,
           words_learned || 0, dialogues_completed || 0, 
           listening_correct || 0, malay_exercises || 0, points);
  
  res.json({ success: true, points_earned: points });
});

// Leaderboard
app.get('/api/leaderboard/:period', authenticateToken, (req, res) => {
  const { period } = req.params;
  let dateFilter = '';
  
  if (period === 'daily') {
    dateFilter = "AND date = date('now')";
  } else if (period === 'weekly') {
    dateFilter = "AND date >= date('now', '-7 days')";
  }
  
  const leaderboard = db.prepare(`
    SELECT u.username, u.department, 
           SUM(da.points) as total_points,
           SUM(da.words_learned) as words_learned,
           SUM(da.listening_correct) * 2 as listening_correct,
           COUNT(DISTINCT da.date) as active_days
    FROM users u
    LEFT JOIN daily_activity da ON u.id = da.user_id ${dateFilter ? 'WHERE 1=1 ' + dateFilter : ''}
    GROUP BY u.id
    HAVING total_points > 0
    ORDER BY total_points DESC
    LIMIT 50
  `).all();
  
  res.json(leaderboard);
});

// User stats
app.get('/api/stats', authenticateToken, (req, res) => {
  const stats = db.prepare(`
    SELECT 
      SUM(words_learned) as total_words,
      SUM(dialogues_completed) as total_dialogues,
      SUM(listening_correct) as total_listening,
      SUM(malay_exercises) as total_malay,
      SUM(points) as total_points,
      COUNT(DISTINCT date) as active_days
    FROM daily_activity
    WHERE user_id = ?
  `).get(req.user.id);
  
  res.json(stats || { total_words: 0, total_dialogues: 0, total_listening: 0, total_malay: 0, total_points: 0, active_days: 0 });
});



// Admin middleware
function requireAdmin(req, res, next) {
    const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.user.id);
    if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
}

// Admin: Add word (stores in DB, served via API)
app.post('/api/admin/word', authenticateToken, requireAdmin, (req, res) => {
    const { category, subcategory, word } = req.body;
    if (!word.en || !word.zh || !word.ms) return res.status(400).json({ error: 'Missing required fields' });
    
    db.exec(`CREATE TABLE IF NOT EXISTS custom_words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        subcategory TEXT NOT NULL,
        en TEXT NOT NULL,
        zh TEXT NOT NULL,
        ms TEXT NOT NULL,
        example TEXT DEFAULT '',
        example_zh TEXT DEFAULT '',
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
    )`);
    
    const stmt = db.prepare('INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(category, subcategory, word.en, word.zh, word.ms, word.example || '', word.example_zh || '', req.user.id);
    res.json({ id: result.lastInsertRowid, message: 'Word added successfully' });
});


// Admin: Get all custom words
app.get('/api/admin/words', authenticateToken, requireAdmin, (req, res) => {
  try {
    const words = db.prepare('SELECT * FROM custom_words ORDER BY created_at DESC').all();
    res.json(words);
  } catch (e) { res.json([]); }
});

// Admin: Delete a custom word
app.delete('/api/admin/word/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM custom_words WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Word deleted' });
  } catch (e) { res.status(500).json({ error: 'Failed to delete word' }); }
});

// Admin: Upload JSON file (bulk import)
app.post('/api/admin/upload', authenticateToken, requireAdmin, (req, res) => {
  const { type, data, category, subcategory } = req.body;
  if (type === 'words' && Array.isArray(data)) {
    try {
      const stmt = db.prepare('INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
      let count = 0;
      for (const item of data) {
        stmt.run(category || 'general', subcategory || 'basic', item.en, item.zh, item.ms, item.example || '', item.example_zh || '', req.user.id);
        count++;
      }
      res.json({ message: 'Successfully imported ' + count + ' words' });
    } catch (e) { res.status(500).json({ error: 'Import failed: ' + e.message }); }
  } else { res.status(400).json({ error: 'Invalid upload format' }); }
});

// Admin: Get all users
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const users = db.prepare('SELECT id, username, department, role, created_at FROM users ORDER BY created_at DESC').all();
    res.json(users);
  } catch (e) { res.status(500).json({ error: 'Failed to fetch users' }); }
});

// Use PORT from env for cloud deployment
const PORT = process.env.PORT || 3000;

// === Admin account initialization ===
(function ensureAdminAccount() {
  try {
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get('cal');
    if (!existing) {
      const hashed = bcrypt.hashSync('1234', 10);
      db.prepare('INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)')
        .run('cal', hashed, 'Admin', 'admin');
      console.log('[Init] Admin account created: cal / 1234');
    } else {
      db.prepare('UPDATE users SET role = ? WHERE username = ? AND role != ?').run('admin', 'cal', 'admin');
    }
  } catch (e) { console.error('[Init] Admin account error:', e.message); }
})();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 学习平台已启动: http://localhost:${PORT}`);
  console.log(`📱 手机访问: http://你的IP:${PORT}`);
});
