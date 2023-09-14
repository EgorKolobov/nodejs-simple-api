const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Storage
const generatedResults = {};

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}

app.use(express.json());

// POST method to generate and store a random number
app.post('/generate', (req, res) => {
    const id = Date.now().toString(); // time based id
    const randomNumber = generateRandomNumber();
    console.log(`Generated random number: ${randomNumber}`)
    generatedResults[id] = randomNumber;
    res.status(201).json({ id, number: randomNumber });
});

// GET method to retrieve back the result, based on its id
app.get('/retrieve/:id', (req, res) => {
    const id = req.params.id;
    const randomNumber = generatedResults[id];

    if (randomNumber !== undefined) {
        res.json({ id, number: randomNumber });
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

// GET method to retrieve all numbers
app.get('/all', (req, res) => {
    const allNumbers = Object.entries(generatedResults).map(([id, number]) => ([id, number]));
    res.json(allNumbers);
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
});
