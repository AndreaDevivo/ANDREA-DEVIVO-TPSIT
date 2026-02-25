// Importiamo il modulo Express
const express = require('express');

// Creiamo l'applicazione Express
const app = express();

// Definiamo la porta su cui il server ascolterà
const PORT = 3000;

/* ============================
   MIDDLEWARE
============================ */

// Middleware per leggere dati JSON dal body delle richieste
app.use(express.json());

// Middleware per leggere dati da form HTML
app.use(express.urlencoded({ extended: true }));

// Middleware per servire file statici (HTML, CSS)
// La cartella "public" sarà accessibile dal browser
app.use(express.static('public'));

/* ============================
   DATI (simuliamo un database)
============================ */

// Array che contiene le attività (salvate in memoria)
let tasks = [];

/* ============================
   ROUTES
============================ */

// GET - restituisce tutte le attività in formato JSON
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST - aggiunge una nuova attività
app.post('/api/tasks', (req, res) => {

    // Recuperiamo il testo dal body della richiesta
    const newTask = req.body.task;

    // Controllo semplice
    if (!newTask) {
        return res.status(400).json({ error: "Task vuota!" });
    }

    // Creiamo oggetto task
    const taskObject = {
        id: tasks.length + 1,
        text: newTask
    };

    // Inseriamo nell'array
    tasks.push(taskObject);

    // Rispondiamo con il task creato
    res.status(201).json(taskObject);
});

/* ============================
   AVVIO SERVER
============================ */

// Avviamo il server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
