const { Pool } = require('pg');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'manufacturing-learning-2024';
const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Jdspqar9n8Dj@ep-snowy-grass-arwl5sw6-pooler.c-4.us-west-2.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Admin middleware
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
}

// ========== Database Init ==========
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS learning_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        word_id TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        review_count INTEGER DEFAULT 0,
        last_reviewed TIMESTAMP,
        UNIQUE(user_id, word_id)
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS daily_activity (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        words_learned INTEGER DEFAULT 0,
        dialogues_completed INTEGER DEFAULT 0,
        listening_correct INTEGER DEFAULT 0,
        malay_exercises INTEGER DEFAULT 0,
        points INTEGER DEFAULT 0,
        UNIQUE(user_id, date)
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_words (
        id SERIAL PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100),
        en VARCHAR(255) NOT NULL,
        zh VARCHAR(255),
        ms VARCHAR(255),
        example TEXT,
        example_zh TEXT,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('\u2705 Database tables initialized');
  } catch (error) {
    console.error('Database init error:', error);
  } finally {
    client.release();
  }
}

// Ensure admin accounts exist
async function ensureAdminAccounts() {
  const admins = [
    { username: 'testuser', password: 'testuser123' },
    { username: 'cal', password: '1234' }
  ];
  const client = await pool.connect();
  try {
    for (const admin of admins) {
      const result = await client.query('SELECT id, role FROM users WHERE username = $1', [admin.username]);
      if (result.rows.length === 0) {
        const hashed = await bcrypt.hash(admin.password, 10);
        await client.query('INSERT INTO users (username, password, department, role) VALUES ($1, $2, $3, $4)', [admin.username, hashed, 'Admin', 'admin']);
        console.log('Admin account created: ' + admin.username);
      } else if (result.rows[0].role !== 'admin') {
        await client.query('UPDATE users SET role = $1 WHERE username = $2', ['admin', admin.username]);
        console.log('Admin role set for: ' + admin.username);
      }
    }
  } finally {
    client.release();
  }
}

// ========== Auth Routes ==========

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, department } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, department, role) VALUES ($1, $2, $3, $4) RETURNING id, username, department, role',
      [username, hashed, department || '', 'user']
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, department: user.department, role: user.role } });
  } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: 'Username already exists' });
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, department: user.department, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token
app.get('/api/verify', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, department, role FROM users WHERE id = $1', [req.user.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
    const user = result.rows[0];
    res.json({ valid: true, user: { id: user.id, username: user.username, department: user.department, role: user.role } });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// ========== Activity & Points Routes ==========

// Record activity (THIS FIXES THE SCORING BUG!)
app.post('/api/activity', authenticateToken, async (req, res) => {
  try {
    const { words_learned, dialogues_completed, listening_correct, malay_exercises } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const points = (words_learned || 0) * 1 + (listening_correct || 0) * 2;
    await pool.query(`
      INSERT INTO daily_activity (user_id, date, words_learned, dialogues_completed, listening_correct, malay_exercises, points)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (user_id, date)
      DO UPDATE SET
        words_learned = daily_activity.words_learned + $3,
        dialogues_completed = daily_activity.dialogues_completed + $4,
        listening_correct = daily_activity.listening_correct + $5,
        malay_exercises = daily_activity.malay_exercises + $6,
        points = daily_activity.points + $7
    `, [req.user.id, today, words_learned || 0, dialogues_completed || 0, listening_correct || 0, malay_exercises || 0, points]);
    res.json({ success: true, points_earned: points });
  } catch (error) {
    console.error('Activity error:', error);
    res.status(500).json({ error: 'Failed to save activity' });
  }
});

// User stats
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(SUM(words_learned), 0) as total_words,
        COALESCE(SUM(dialogues_completed), 0) as total_dialogues,
        COALESCE(SUM(listening_correct), 0) as total_listening,
        COALESCE(SUM(malay_exercises), 0) as total_malay,
        COALESCE(SUM(points), 0) as total_points,
        COUNT(DISTINCT date) as active_days
      FROM daily_activity
      WHERE user_id = $1
    `, [req.user.id]);
    const stats = result.rows[0] || { total_words: 0, total_dialogues: 0, total_listening: 0, total_malay: 0, total_points: 0, active_days: 0 };
    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Leaderboard
app.get('/api/leaderboard/:period', authenticateToken, async (req, res) => {
  try {
    const { period } = req.params;
    let dateFilter = '';
    if (period === 'daily') {
      dateFilter = "AND date = CURRENT_DATE";
    } else if (period === 'weekly') {
      dateFilter = "AND date >= CURRENT_DATE - INTERVAL '7 days'";
    }
    const query = `
      SELECT u.username, u.department,
        COALESCE(SUM(da.points), 0) as total_points,
        COALESCE(SUM(da.words_learned), 0) as words_learned,
        COALESCE(SUM(da.listening_correct), 0) as listening_correct,
        COUNT(DISTINCT da.date) as active_days
      FROM users u
      LEFT JOIN daily_activity da ON u.id = da.user_id
      WHERE 1=1 ${dateFilter}
      GROUP BY u.id, u.username, u.department
      HAVING SUM(da.points) > 0
      ORDER BY total_points DESC
      LIMIT 50
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Progress daily
app.post('/api/progress/daily', authenticateToken, async (req, res) => {
  try {
    const { date, words_learned, dialogues_completed, listening_correct, malay_exercises, points } = req.body;
    const progressDate = date || new Date().toISOString().split('T')[0];
    await pool.query(`
      INSERT INTO daily_activity (user_id, date, words_learned, dialogues_completed, listening_correct, malay_exercises, points)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (user_id, date)
      DO UPDATE SET
        words_learned = daily_activity.words_learned + $3,
        dialogues_completed = daily_activity.dialogues_completed + $4,
        listening_correct = daily_activity.listening_correct + $5,
        malay_exercises = daily_activity.malay_exercises + $6,
        points = daily_activity.points + $7
    `, [req.user.id, progressDate, words_learned || 0, dialogues_completed || 0, listening_correct || 0, malay_exercises || 0, points || 0]);
    res.json({ success: true });
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

// ========== Admin Routes ==========

// Admin: List custom words
app.get('/api/admin/words', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cw.*, u.username as created_by_name
      FROM custom_words cw
      LEFT JOIN users u ON cw.created_by = u.id
      ORDER BY cw.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Admin words error:', error);
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

// Admin: Add single word
app.post('/api/admin/word', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, subcategory, word } = req.body;
    const en = word ? word.en : req.body.en;
    const zh = word ? word.zh : req.body.zh;
    const ms = word ? word.ms : req.body.ms;
    const example = word ? (word.example || word.ex || '') : (req.body.example || '');
    const example_zh = word ? (word.example_zh || word.ex_zh || '') : (req.body.example_zh || '');
    if (!en || !zh || !ms) return res.status(400).json({ error: 'Missing required fields' });
    const result = await pool.query(
      'INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [category, subcategory || 'basic', en, zh, ms, example, example_zh, req.user.id]
    );
    res.json({ success: true, id: result.rows[0].id, message: '\u8bcd\u6c47\u5df2\u6dfb\u52a0: ' + en });
  } catch (error) {
    console.error('Admin add word error:', error);
    res.status(500).json({ error: 'Failed to add word' });
  }
});

// Admin: Delete word
app.delete('/api/admin/word/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM custom_words WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Word deleted' });
  } catch (error) {
    console.error('Admin delete word error:', error);
    res.status(500).json({ error: 'Failed to delete word' });
  }
});

// Admin: Bulk add words
app.post('/api/admin/bulk', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, subcategory, words } = req.body;
    if (!Array.isArray(words) || words.length === 0) return res.status(400).json({ error: 'No words provided' });
    const client = await pool.connect();
    let inserted = 0;
    try {
      await client.query('BEGIN');
      for (const w of words) {
        await client.query(
          'INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [category, subcategory || 'basic', w.en, w.zh || '', w.ms || '', w.ex || w.example || '', w.ex_zh || w.example_zh || '', req.user.id]
        );
        inserted++;
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
    res.json({ success: true, message: '\u6210\u529f\u6dfb\u52a0 ' + inserted + ' \u4e2a\u8bcd\u6c47' });
  } catch (error) {
    console.error('Admin bulk error:', error);
    res.status(500).json({ error: 'Failed to bulk add words' });
  }
});

// Admin: Upload JSON (bulk import)
app.post('/api/admin/upload', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { type, data, category, subcategory, words } = req.body;
    const items = data || words;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid format' });
    const client = await pool.connect();
    let inserted = 0;
    try {
      await client.query('BEGIN');
      for (const item of items) {
        if (item.en) {
          await client.query(
            'INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [category || item.category || 'general', subcategory || item.subcategory || 'basic', item.en, item.zh || '', item.ms || '', item.example || '', item.example_zh || '', req.user.id]
          );
          inserted++;
        }
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
    res.json({ success: true, message: 'Successfully imported ' + inserted + ' words' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload' });
  }
});

// Admin: List users
app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, department, role, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get custom words (for all users)
app.get('/api/words', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_words ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.json([]);
  }
});

// ========== Start Server ==========
app.listen(PORT, async () => {
  console.log('Server running on port ' + PORT);
  await initDB();
  await ensureAdminAccounts();
  console.log('\u2705 Server fully initialized');
});