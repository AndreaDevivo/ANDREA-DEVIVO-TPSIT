// Importa il framework Express
const express = require('express');

// Crea l'applicazione server
const app = express();

// Permette al server di leggere dati JSON inviati dal client
app.use(express.json());

// Serve file statici dalla cartella "public" (HTML, CSS, JS del frontend)
app.use(express.static('public')); 

// Array che contiene le tasks salvate in memoria
let tasks = [];

// ROTTA GET
// Restituisce tutte le tasks salvate
app.get('/api/tasks', (req, res) => {
    res.json(tasks); // invia l'array tasks come risposta JSON
});

// ROTTA POST
// Serve per aggiungere una nuova task
app.post('/api/tasks', (req, res) => {

    // Crea un oggetto task con:
    // - id unico (timestamp)
    // - testo ricevuto dal body della richiesta
    const taskObject = { 
        id: Date.now(), 
        text: req.body.task 
    };

    // Aggiunge la task all'array
    tasks.push(taskObject);

    // Restituisce la task creata con status HTTP 201 (creato)
    res.status(201).json(taskObject);
});

// ROTTA DELETE
// Cancella tutte le tasks presenti nell'array
app.delete('/api/tasks', (req, res) => {

    // Svuota completamente l'array
    tasks = [];

    // Risponde con status 204 (No Content = operazione riuscita senza contenuto)
    res.status(204).send();
});

// Avvia il server sulla porta 3000
// e stampa l'indirizzo nel terminale
app.listen(3000, () => console.log("http://localhost:3000"));
