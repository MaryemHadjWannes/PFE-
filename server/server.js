const express = require('express');
const app = express();
const port = 3000; // Choose a port number for your server

// Middleware to parse JSON request bodies
app.use(express.json());

// Define your API endpoints below
app.post('/disclose', (req, res) => {
  // Handle selective disclosure request
});

app.get('/credentials', (req, res) => {
  // Retrieve verifiable credentials from the database
});


//////////////////////////////
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database instance
const db = new sqlite3.Database(':memory:'); // You can also specify a file path for a persistent database

// Check if the connection was successful
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS credentials (id INTEGER PRIMARY KEY AUTOINCREMENT, credential TEXT)');
  console.log('Connected to the SQLite database');
});

// Close the database connection when the server is shut down
process.on('SIGINT', () => {
  db.close();
  console.log('Disconnected from the SQLite database');
  process.exit(0);
});
