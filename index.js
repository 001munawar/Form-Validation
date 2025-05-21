const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'database-1.cl4wouqcsn6c.ap-south-1.rds.amazonaws.com',
  user: 'Myapp',
  password: 'EfDPKdMMlEjxyM6kQul1',
  database: 'database-1'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to RDS');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) throw err;
      res.send({ message: 'User signed up' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) res.send({ message: 'Login successful' });
      else res.send({ message: 'Invalid credentials' });
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

