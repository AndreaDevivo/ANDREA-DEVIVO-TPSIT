const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); 

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const taskObject = { id: Date.now(), text: req.body.task };
    tasks.push(taskObject);
    res.status(201).json(taskObject);
});

// NUOVO: Comando per svuotare tutto l'array sul server
app.delete('/api/tasks', (req, res) => {
    tasks = [];
    res.status(204).send();
});

app.listen(3000, () => console.log("Server attivo su porta 3000"));
