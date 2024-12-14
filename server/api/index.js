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
  


  
  app.post('/lists/detail', async (req, res) => {
    try {
      const { id, email, password, listId } = req.body;
  
      // Validation: Check for required fields
      if (!id || !email || !password || !listId) {
        res.status(400).json({ error: 'Missing required fields (id, email, password, listId)' });
        return;
      }
  
      // Verify the user
      const user = await queryDB(
        'SELECT id FROM `User` WHERE id = ? AND email = ? AND password = ?',
        [id, email, password]
      );
  
      if (user.length === 0) {
        res.status(400).json({ error: 'User not found or invalid credentials' });
        return;
      }
  
      // Get the list details and items
      const listDetails = await queryDB(
        `SELECT 
           L.id AS listId,
           L.name AS headerTitle, 
           DATE_FORMAT(L.created_at, '%M %d, %Y') AS created, 
           DATE_FORMAT(L.updated_at, '%M %d, %Y') AS lastUpdated,
           COUNT(I.id) AS totalItems,
           SUM(I.is_checked) AS itemsCompleted
         FROM List L
         LEFT JOIN Item I ON L.id = I.list_id
         WHERE L.id = ? AND L.user_id = ?
         GROUP BY L.id`,
        [listId, id]
      );
  
      if (listDetails.length === 0) {
        res.status(404).json({ error: 'List not found or does not belong to the user' });
        return;
      }
  
      const items = await queryDB(
        `SELECT 
           I.id AS itemId,
           I.name,
           I.quantity,
           FORMAT(I.price, 2) AS price,
           I.is_checked AS isChecked
         FROM Item I
         WHERE I.list_id = ?`,
        [listId]
      );
  
      const response = {
        id: id,  // User ID
        headerTitle: listDetails[0].headerTitle,
        items: items.map(item => ({
          id: item.itemId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          isChecked: item.isChecked
        })),
        details: {
          id: listDetails[0].listId,  // List ID
          created: listDetails[0].created,
          lastUpdated: listDetails[0].lastUpdated,
          itemsCompleted: listDetails[0].itemsCompleted || 0
        }
      };
  
      res.json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  app.put('/lists/update', async (req, res) => {
    try {
      const { id, email, password, details, headerTitle, items } = req.body;
      
      // Extract listId from details
      const listId = details?.id;
  
      // Validation: Check for required fields
      if (!id || !email || !password || !listId || !headerTitle || !Array.isArray(items)) {
        res.status(400).json({ error: 'Missing required fields or invalid data format' });
        return;
      }
  
      // Verify the user
      const user = await queryDB(
        'SELECT id FROM `User` WHERE id = ? AND email = ? AND password = ?',
        [id, email, password]
      );
  
      if (user.length === 0) {
        res.status(400).json({ error: 'User not found or invalid credentials' });
        return;
      }
  
      // Check if the list exists and belongs to the user
      const listExists = await queryDB(
        'SELECT id FROM List WHERE id = ? AND user_id = ?',
        [listId, id]
      );
  
      if (listExists.length === 0) {
        res.status(404).json({ error: 'List not found or does not belong to the user' });
        return;
      }
  
      // Update the list name and updated_at timestamp
      await queryDB(
        'UPDATE List SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
        [headerTitle, listId, id]
      );
  
      // Update or insert items
      for (const item of items) {
        const { id: itemId, name, quantity, price, isChecked } = item;
  
        if (!itemId) {
          // Insert new item
          await queryDB(
            'INSERT INTO Item (list_id, name, quantity, price, is_checked, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
            [listId, name, quantity, price, isChecked ? 1 : 0]
          );
        } else {
          // Update existing item
          await queryDB(
            'UPDATE Item SET name = ?, quantity = ?, price = ?, is_checked = ? WHERE id = ? AND list_id = ?',
            [name, quantity, price, isChecked ? 1 : 0, itemId, listId]
          );
        }
      }
  
      // Get the updated list details and items to return
      const listDetails = await queryDB(
        `SELECT 
           L.id AS listId,
           L.name AS headerTitle, 
           DATE_FORMAT(L.created_at, '%M %d, %Y') AS created, 
           DATE_FORMAT(L.updated_at, '%M %d, %Y') AS lastUpdated,
           COUNT(I.id) AS totalItems,
           SUM(I.is_checked) AS itemsCompleted
         FROM List L
         LEFT JOIN Item I ON L.id = I.list_id
         WHERE L.id = ? AND L.user_id = ?
         GROUP BY L.id`,
        [listId, id]
      );
  
      const itemsData = await queryDB(
        `SELECT 
           I.id AS itemId,
           I.name,
           I.quantity,
           FORMAT(I.price, 2) AS price,
           I.is_checked AS isChecked
         FROM Item I
         WHERE I.list_id = ?`,
        [listId]
      );
  
      const response = {
        id: id,  // User ID
        headerTitle: listDetails[0].headerTitle,
        items: itemsData.map(item => ({
          id: item.itemId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          isChecked: item.isChecked
        })),
        details: {
          id: listDetails[0].listId,  // List ID
          created: listDetails[0].created,
          lastUpdated: listDetails[0].lastUpdated,
          itemsCompleted: listDetails[0].itemsCompleted || 0
        }
      };
  
      res.status(201).json({ message: 'List updated successfully', response });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  
  // POST request to add multiple items to a user's list
app.post('/items/add', async (req, res) => {
    const { user_id, email, password, list_id, items } = req.body;
  
    // Validate required fields
    if (!user_id || !email || !password || !list_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields or invalid items list' });
    }
  
    try {
      // Step 1: Validate user credentials (fetch user by email)
      const results = await queryDB('SELECT * FROM User WHERE email = ?', [email]);
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = results[0];
  
      // Step 2: Compare password (without hashing)
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Step 3: Check if the user is authorized to add items to the list
      if (user.id !== user_id) {
        return res.status(403).json({ error: 'Unauthorized action' });
      }
  
      // Step 4: Prepare multiple items to insert into the database
      const query = 'INSERT INTO Item (list_id, name, quantity, price, is_checked) VALUES ?';
      const values = items.map(item => [list_id, item.name, item.quantity, item.price, item.is_checked]);
  
      // Step 5: Insert items into the database
      const result = await queryDB(query, [values]);
  
      return res.status(201).json({ message: 'Items added successfully', insertedCount: result.affectedRows });
    } catch (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
  });
  

// DELETE request to remove multiple items from a user's list
app.delete('/items/delete', async (req, res) => {
    const { user_id, email, password, item_ids } = req.body;
 

    // Validate required fields
    if (!user_id || !email || !password || !item_ids || !Array.isArray(item_ids) || item_ids.length === 0) {
      return res.status(400).json({ error: 'Missing required fields or invalid item_ids' });
    }
  
    try {
      // Step 1: Validate user credentials (fetch user by email)
      const results = await queryDB('SELECT * FROM User WHERE email = ?', [email]);
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = results[0];
  
      // Step 2: Compare password (without hashing)
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Step 3: Check if the user is authorized to delete the items
      if (user.id !== user_id) {
        return res.status(403).json({ error: 'Unauthorized action' });
      }
  
      // Step 4: Delete items (Use IN clause to delete multiple items)
      const deleteQuery = 'DELETE FROM Item WHERE id IN (?) AND list_id IN (SELECT id FROM List WHERE user_id = ?)';
      const deleteResult = await queryDB(deleteQuery, [item_ids, user_id]);
  
      // Step 5: Check if the items were deleted
      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ error: 'Items not found or user not authorized to delete' });
      }
  
      return res.status(200).json({ message: 'Items deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
  });


  app.delete('/lists/delete', async (req, res) => {
    const { user_id, email, password, list_id } = req.body;
  
    // Validate required fields
    if (!user_id || !email || !password || !list_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Step 1: Validate user credentials
      const userResults = await queryDB('SELECT * FROM User WHERE email = ?', [email]);
  
      if (userResults.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = userResults[0];
  
      // Step 2: Compare password
      if (user.id !== user_id) {
        return res.status(403).json({ error: 'Unauthorized user' });
      }
  
      // Step 3: Check if the list belongs to the user
      const listResults = await queryDB('SELECT * FROM List WHERE id = ? AND user_id = ?', [list_id, user_id]);
  
      if (listResults.length === 0) {
        return res.status(404).json({ error: 'List not found or does not belong to user' });
      }
  
      // Step 4: Delete items associated with the list
      await queryDB('DELETE FROM Item WHERE list_id = ?', [list_id]);
  
      // Step 5: Delete the list
      await queryDB('DELETE FROM List WHERE id = ?', [list_id]);
  
      return res.status(200).json({ message: 'List and associated items deleted successfully' });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Database error' });
    }
  });

  
  

  app.post('/lists/create', async (req, res) => {
    const { user_id, email, password, list_name, items } = req.body;
  
    // Validate required fields
    if (!user_id || !email || !password || !list_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Step 1: Validate user credentials
      const userResults = await queryDB('SELECT * FROM User WHERE email = ?', [email]);
  
      if (userResults.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = userResults[0];
  
      // Step 2: Compare password
      if (user.id !== user_id) {
        return res.status(403).json({ error: 'Unauthorized user' });
      }
  
      // Step 3: Create the list
      const listQuery = 'INSERT INTO List (user_id, name) VALUES (?, ?)';
      const listValues = [user_id, list_name];
      const listResult = await queryDB(listQuery, listValues);
  
      // Get the newly created list id
      const listId = listResult.insertId;
  
      // Step 4: Insert items if provided
      if (items && Array.isArray(items) && items.length > 0) {
        const itemQuery = 'INSERT INTO Item (list_id, name, quantity, price, is_checked) VALUES ?';
        const itemValues = items.map(item => [
          listId, 
          item.name, 
          item.quantity || 1, // Default to 1 if quantity is not provided
          item.price || 0.0,  // Default to 0.0 if price is not provided
          item.is_checked || false  // Default to false if is_checked is not provided
        ]);
  
        await queryDB(itemQuery, [itemValues]);
      }
  
      return res.status(201).json({ message: 'List created successfully', listId: listId });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Database error' });
    }
  });
  



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
