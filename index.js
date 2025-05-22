const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Fix: Only one declaration of mysql
const connection = mysql.createConnection({
  host: 'database-1.cl4wouqcsn6c.ap-south-1.rds.amazonaws.com',  // ✅ Correct host (not IP)
  user: 'admin',
  password: 'admin123456789',
  database: 'user'  // ❗ Replace this with the actual DB name
});

// ✅ Fix: Use correct variable name 'connection', not 'db'
connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to RDS');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Signup failed' });
        return;
      }
      res.send({ message: 'User signed up' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Login failed' });
        return;
      }
      if (results.length > 0) {
        res.send({ message: 'Login successful' });
      } else {
        res.send({ message: 'Invalid credentials' });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
