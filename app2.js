const express = require('express');
const sqlite3 = require('sqlite3');

// Making a new db
const db = new sqlite3.Database('results.db')
// Creating a new table if it doesn't exist
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS results (id TEXT PRIMARY KEY, number INTEGER)');
});


const app = express();
const port = process.env.PORT || 3000;

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

app.use(express.json());

// POST method to generate and store a random number
app.post('/generate', (req, res) => {
    const id = Date.now().toString(); // time based id
    const randomNumber = generateRandomNumber();
    // console.log(`Generated random number: ${randomNumber}`)
    db.run('INSERT INTO results (id, number) VALUES (?, ?)', [id, randomNumber], (err) => {
        if (err) {
            return res.status(500).json({error: 'Failed to insert random number into db'});
        }
    });
    res.status(201).json({id, number: randomNumber});
});

// GET method to retrieve back the result, based on its id
app.get('/retrieve/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM results WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({error: 'Failed to run SQL'});
        }
        if (row) {
            res.json({id: row.id, number: row.number});
        } else {
            res.status(404).json({error: `Cant find number with id = ${id}`})
        }
    });
});

// GET method to retrieve all numbers
app.get('/all', (req, res) => {
    db.get('SELECT * FROM results', (err, rows) => {
        if (err) {
            return res.status(500).json({error: 'Failed to run SQL'});
        }
        res.json(rows);
    });
});

app.delete('/clear', (req, res) =>{
   db.run('DELETE FROM results', (err) => {
      if (err) {
          return res.status(500).json({error: 'Failed to clear db'});
      }
      res.json({message: 'db successfully cleared!'})
   });
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
});
