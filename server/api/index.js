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

  app.post('/lists', async (req, res) => {
    try {
      const { id, email, password } = req.body;
  
      // Validation: Check for required fields
      if (!id || !email || !password) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
  
      // Check if the user exists
      const user = await queryDB(
        'SELECT id FROM `User` WHERE id = ? AND email = ? AND password = ?',
        [id, email, password]
      );
  
      if (user.length === 0) {
        res.status(400).json({ error: 'User not found' });
        return;
      }
  
      // Get the lists for the user, including the number of items and date information
      const lists = await queryDB(
        `
        SELECT 
          l.id,
          l.name,
          l.created_at,
          l.updated_at,
          COUNT(i.id) AS item_count
        FROM 
          List l
        LEFT JOIN 
          Item i ON l.id = i.list_id
        WHERE 
          l.user_id = ?
        GROUP BY 
          l.id
        ORDER BY 
          l.created_at DESC
        `,
        [id]
      );
  
      // Format the output
      const formattedLists = lists.map((list) => {
        const createdDate = new Date(list.created_at);
        const updatedDate = new Date(list.updated_at);
  
        // Determine subtitle based on date comparison
        const isUpdated = createdDate.getTime() !== updatedDate.getTime();
        const relativeDate = isUpdated ? `Updated ${formatRelativeDate(updatedDate)}` : `Created ${formatRelativeDate(createdDate)}`;
  
        return {
          id: list.id,
          title: list.name,
          subtitle: `${list.item_count} items • ${relativeDate}`,
        };
      });
  
      res.json({ lists: formattedLists });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Utility function to format relative dates
  function formatRelativeDate(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    // Format as a readable date if older than a week
    return date.toLocaleDateString();
  }
  


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

// Create a new user
app.post('/users/create', async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
  
      // Validation: Check for required fields
      if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
  
      // Validation: Ensure password is more than 4 characters
      if (password.length <= 4) {
        res.status(400).json({ error: 'Password must be more than 4 characters' });
        return;
      }
  
      // Validation: Check if passwords match
      if (password !== confirmPassword) {
        res.status(400).json({ error: 'Passwords do not match' });
        return;
      }
  
      // Validation: Check if the email is in a valid format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email address' });
        return;
      }
  
      // Check if the email already exists
      const emailExists = await queryDB('SELECT id FROM `User` WHERE email = ?', [email]);
      if (emailExists.length > 0) {
        res.status(400).json({ error: 'Email already exists' });
        return;
      }
  
      // SQL query to insert the new user
      const result = await queryDB(
        'INSERT INTO `User` (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
  
      res.json({ message: 'User created successfully', userId: result.insertId });
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
