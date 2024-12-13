const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'helloworldx',
  database: 'GROCERYLIST',
  
});

// Helper function for querying the database
const queryDB = (query, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// Routes

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await queryDB(
      'INSERT INTO `User` (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.json({ message: 'User created', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// edit existing user using request body
app.put('/users/update', async (req, res) => {
    try {
      const { newName, newEmail, newPassword, oldName, oldEmail, oldPassword, id } = req.body;
  
      // Validation: Check for required fields
      if (!newName || !newEmail || !newPassword || !oldName || !oldEmail || !oldPassword || !id) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
  
      // Validation: Ensure password is more than 4 characters
      if (newPassword.length <= 4) {
        res.status(400).json({ error: 'Password must be more than 4 characters' });
        return;
      }
  
      // Validation: Check if the email is in a valid format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(newEmail)) {
        res.status(400).json({ error: 'Invalid email address' });
        return;
      }
  
      // SQL query to update the user
      const result = await queryDB(
        'UPDATE `User` SET name = ?, email = ?, password = ? WHERE name = ? AND email = ? AND password = ? AND id = ?',
        [newName, newEmail, newPassword, oldName, oldEmail, oldPassword, id]
      );
  
      // Check if any row was affected
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'User not found or no changes made' });
        return;
      }
  
      res.json({ message: 'User updated successfully', userId: id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

app.post('/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;  // Get email and password from the request body
  
      console.log(email, password);  // Log to verify incoming data
  
      // Check if email exists
      const emailExists = await queryDB('SELECT id FROM `User` WHERE email = ?', [email]);
  
      if (emailExists.length === 0) {
        res.status(400).json({ error: 'Email does not exist' });
        return;
      }
  
      // Check if password is correct and get the id and name
      const user = await queryDB('SELECT id, name FROM `User` WHERE email = ? AND password = ?', [
        email, password
      ]);
  
      if (user.length === 0) {
        res.status(400).json({ error: 'Password is incorrect' });
        return;
      }
  
      // Respond with user data including id and name
      res.json(user[0]);  // Return the first user from the array (as queryDB will return an array of results)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
