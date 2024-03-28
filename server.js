const express = require('express');
const cds = require('@sap/cds');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors'); // Add this line

// Body parsing middleware
app.use(express.json());
app.use(cors()); // And this line

// Connect to SQLite database
//const db = new sqlite3.Database('./ath/to/your/databasep.db', (err) => {
const db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) {
        if (err) {
            console.error(err.message);
        }
    console.log('Connected to the SQLite database.');
    }
});
        
cds.serve('all').in(app);

// Custom endpoint to get all books
app.get('/books', async (req, res) => {
    db.all('SELECT * FROM myfioriapp_Books', [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
});

// Custom endpoint to add a book
app.post('/books', async (req, res) => {
    const { title, author } = req.body;
    db.run(`INSERT INTO myfioriapp_Books (title, author) VALUES (?, ?)`, [title, author], function(err) {
      if (err) {
        return console.log(err.message);
      }
      res.json({ message: 'Book added successfully' });
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});