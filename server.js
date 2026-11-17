const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'manufacturing-learning-2024';

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Jdspqar9n8Dj@ep-snowy-grass-arwl5sw6-pooler.c-4.us-west-2.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Initialize database tables
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    );
    await client.query(
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
    );
    await client.query(
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
    );
    console.log('? Database initialized');
  } catch (error) {
    console.error('? Database init error:', error);
  } finally {
    client.release();
  }
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    const result = await pool.query('SELECT * FROM users WHERE username = ', [username]);
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

app.post('/api/register', async (req, res) => {
  try {
    const { username, password, department } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (username, password, department, role) VALUES (, , , ) RETURNING id', [username, hashed, department || '', 'user']);
    const token = jwt.sign({ id: result.rows[0].id, username, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.rows[0].id, username, department: department || '', role: 'user' } });
  } catch (error) {
    if (error.code === '23505') return res.status(400).json({ error: 'Username already exists' });
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/progress/daily', authenticateToken, async (req, res) => {
  try {
    const { date, words_learned, dialogues_completed, listening_correct, malay_exercises, points } = req.body;
    const progressDate = date || new Date().toISOString().split('T')[0];
    await pool.query(
      INSERT INTO daily_activity (user_id, date, words_learned, dialogues_completed, listening_correct, malay_exercises, points)
      VALUES (, , , , , , )
      ON CONFLICT (user_id, date)
      DO UPDATE SET
        words_learned = daily_activity.words_learned + ,
        dialogues_completed = daily_activity.dialogues_completed + ,
        listening_correct = daily_activity.listening_correct + ,
        malay_exercises = daily_activity.malay_exercises + ,
        points = daily_activity.points + 
    , [req.user.id, progressDate, words_learned || 0, dialogues_completed || 0, listening_correct || 0, malay_exercises || 0, points || 0]);
    res.json({ success: true });
  } catch (error) {
    console.error('Progress error:', error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const result = await pool.query(
      SELECT u.username, u.department,
        SUM(d.points) as total_points,
        SUM(d.words_learned) as total_words,
        COUNT(DISTINCT d.date) as active_days
      FROM users u
      LEFT JOIN daily_activity d ON u.id = d.user_id
      GROUP BY u.id, u.username, u.department
      HAVING SUM(d.points) > 0
      ORDER BY total_points DESC
      LIMIT 50
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/admin/words', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT cw.*, u.username as created_by_name FROM custom_words cw LEFT JOIN users u ON cw.created_by = u.id ORDER BY cw.created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

app.post('/api/admin/words', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { category, subcategory, en, zh, ms, example, example_zh } = req.body;
    const result = await pool.query('INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (, , , , , , , ) RETURNING *', [category, subcategory || '', en, zh || '', ms || '', example || '', example_zh || '', req.user.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add word' });
  }
});

app.delete('/api/admin/words/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM custom_words WHERE id = ', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete word' });
  }
});

app.post('/api/admin/upload', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { words } = req.body;
    if (!Array.isArray(words)) return res.status(400).json({ error: 'Invalid format' });
    const client = await pool.connect();
    let inserted = 0;
    try {
      await client.query('BEGIN');
      for (const word of words) {
        if (word.category && word.en) {
          await client.query('INSERT INTO custom_words (category, subcategory, en, zh, ms, example, example_zh, created_by) VALUES (, , , , , , , )', [word.category, word.subcategory || '', word.en, word.zh || '', word.ms || '', word.example || '', word.example_zh || '', req.user.id]);
          inserted++;
        }
      }
      await client.query('COMMIT');
      res.json({ success: true, inserted });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload' });
  }
});

app.get('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, department, role, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, async () => {
  console.log(?? Server running on port );
  await initDB();
  const client = await pool.connect();
  try {
    for (const admin of [{ username: 'testuser', password: 'testuser123' }, { username: 'cal', password: '1234' }]) {
      const result = await client.query('SELECT id FROM users WHERE username = ', [admin.username]);
      if (result.rows.length === 0) {
        const hashed = await bcrypt.hash(admin.password, 10);
        await client.query('INSERT INTO users (username, password, department, role) VALUES (, , , )', [admin.username, hashed, 'Admin', 'admin']);
        console.log(? Created admin: );
      }
    }
  } finally {
    client.release();
  }
});
