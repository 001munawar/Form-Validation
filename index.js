const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'database-1.cl4wouqcsn6c.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admn123456789',
  database: 'users'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to RDS');
});

app.post('/signup', (req, res) => {
  const { name, username, password, email, mobile } = req.body;
  const sql = "INSERT INTO users (name, username, password, email, mobile) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, username, password, email, mobile], (err, result) => {
    if (err) return res.status(500).send({ message: "Database error", err });
    res.send({ message: "Signup successful" });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).send({ message: "Database error" });
    if (result.length > 0) {
      res.send({ message: "Login success" });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
